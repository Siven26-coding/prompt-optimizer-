import "dotenv/config";
import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";

const app = express();
const PORT = 3000;

app.use(express.json({ limit: "2mb" }));

// Lazy Gemini client
let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is not configured on the server. Please check environment variables.");
  }
  if (!aiClient) {
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

// Health check
app.get("/api/health", (_req, res) => {
  res.json({
    status: "ok",
    hasApiKey: Boolean(process.env.GEMINI_API_KEY),
    timestamp: new Date().toISOString(),
  });
});

// Prompt Optimization endpoint
app.post("/api/optimize", async (req, res) => {
  try {
    const { prompt, mode = "professional" } = req.body;

    if (!prompt || typeof prompt !== "string" || !prompt.trim()) {
      res.status(400).json({
        error: "Prompt text is required and cannot be empty.",
      });
      return;
    }

    if (prompt.trim().length > 10000) {
      res.status(400).json({
        error: "Prompt length exceeds the 10,000 character limit.",
      });
      return;
    }

    const ai = getGeminiClient();

    const modeInstructions: Record<string, string> = {
      quick: `Mode: QUICK.
Focus on minimal, clean improvements. Elevate vague phrases into crisp intent, add essential missing constraints, but keep the overall length concise and straightforward without heavy structural boilerplate.`,
      professional: `Mode: PROFESSIONAL.
Transform into an executive-grade production prompt. Include:
- ROLE: Clear persona/expertise
- OBJECTIVE: Specific goal and intended outcome
- CONTEXT: Background and domain details (use bracketed placeholders [LIKE_THIS] if unknown)
- TASK: Clear imperative instructions
- INPUTS: Source data, schemas, or variables needed
- CONSTRAINTS: Style, length, tone, technical boundaries, negative constraints (what NOT to do)
- PROCESS: Step-by-step reasoning steps
- OUTPUT FORMAT: Strict expected structure (Markdown, JSON, code, tables)
- QUALITY CRITERIA: Acceptance benchmarks`,
      expert: `Mode: EXPERT.
Apply elite prompt engineering techniques:
- Precision persona calibration with cognitive depth
- Few-shot structure hints or framing patterns
- Explicit chain-of-thought instructions ("Think step-by-step before producing output")
- Exhaustive negative constraints and failure-mode mitigations
- Edge-case handling protocols
- Bracketed dynamic placeholders [USER_SPECIFIC_ITEM] for all project-specific variables
- Rigorous verification and self-critique rubric`,
      agent: `Mode: AGENT.
Optimize specifically for Autonomous AI Agents (e.g. LangChain, AutoGPT, Claude Computer Use, ReAct agent loops):
- PRIMARY MISSION & HIGH-LEVEL GOALS
- TOOL & ENVIRONMENT ASSUMPTIONS (Terminal, API, FileSystem, Browser)
- STEP-BY-STEP REASONING & DECISION TREE (Observe -> Think -> Plan -> Act -> Evaluate)
- OPERATIONAL CONSTRAINTS & HARD LIMITS (Rate limits, safe execution, human-in-the-loop triggers)
- STATE & MEMORY MANAGEMENT (Tracking state across steps)
- ERROR RECOVERY & RETRY POLICIES
- STRUCTURED MACHINE-READABLE OUTPUT (Strict JSON schema or action commands)
- STOP CONDITIONS & SUCCESS CRITERIA`,
    };

    const selectedModeInstruction =
      modeInstructions[mode.toLowerCase()] || modeInstructions.professional;

    const systemInstruction = `You are PromptForge, an elite AI prompt engineering agent and compiler.
Your job is to take rough, messy, ambiguous, or incomplete user prompts and compile them into world-class, production-ready AI instructions.

CORE ENGINEERING FRAMEWORK:
Evaluate and enhance the prompt across 10 critical dimensions:
1. Role & Persona Calibration
2. Clear Objective & Intent
3. Contextual Grounding (use clean placeholders like [Insert audience/stack] when details are unspecified)
4. Concrete Actionable Task
5. Input Data & Variables definition
6. Explicit Negative Constraints (What to avoid, hallucinations, formatting violations)
7. Methodical Execution Process (Step-by-step execution flow)
8. Output Format Specification (Markdown, syntax highlighting, strict tables, or code)
9. Quality Criteria & Acceptance Tests
10. Edge Cases & Ambiguity Handling

RULES & BOUNDARIES:
- Preserve the user's authentic core intent. Never mutate the fundamental request into something completely different.
- Never hallucinate proprietary company facts or specific data. Use descriptive placeholders like [Specify Target Audience] or [Your Tech Stack].
- Score the user's ORIGINAL rough prompt fairly from 0 to 100 based on its specificity, clarity, context, constraints, and output format.
- Format the optimizedPrompt with clear, professional capitalized section headers:
  ROLE
  OBJECTIVE
  CONTEXT
  TASK
  INPUTS
  CONSTRAINTS
  PROCESS
  OUTPUT FORMAT
  QUALITY CRITERIA
- Ensure the output is directly copy-pasteable and reusable across Gemini, Claude, and ChatGPT.

${selectedModeInstruction}

Output strictly valid JSON matching the schema provided.`;

    let responseText: string | undefined;

    try {
      // Primary model: gemini-2.5-flash for rapid response times
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: `Analyze and optimize this rough prompt:

"""
${prompt.trim()}
"""`,
        config: {
          systemInstruction,
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              score: {
                type: Type.INTEGER,
                description: "Overall prompt quality score of the user's original prompt (0 to 100).",
              },
              summary: {
                type: Type.STRING,
                description: "A punchy 1-2 sentence assessment of the original prompt's strengths and core deficiencies.",
              },
              strengths: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description: "2-4 positive traits of the original prompt (e.g. clear general intent, concise).",
              },
              weaknesses: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description: "2-5 weaknesses or ambiguities found in the original prompt.",
              },
              missingElements: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description: "Key missing dimensions (e.g. Target audience, Desired output format, Technical constraints, Tone, Success criteria).",
              },
              improvements: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description: "3-5 high-impact upgrades engineered into the new prompt.",
              },
              recommendedModel: {
                type: Type.STRING,
                description: "Recommended AI model for this prompt (e.g. Gemini 2.5 Pro, Claude 3.5 Sonnet, GPT-4o).",
              },
              complexity: {
                type: Type.STRING,
                description: "Complexity level: 'simple', 'intermediate', 'advanced', or 'agentic'.",
              },
              breakdown: {
                type: Type.OBJECT,
                properties: {
                  context: { type: Type.INTEGER, description: "Context score 0-100" },
                  specificity: { type: Type.INTEGER, description: "Specificity score 0-100" },
                  constraints: { type: Type.INTEGER, description: "Constraints score 0-100" },
                  outputFormat: { type: Type.INTEGER, description: "Output format score 0-100" },
                  clarity: { type: Type.INTEGER, description: "Clarity score 0-100" },
                },
                required: ["context", "specificity", "constraints", "outputFormat", "clarity"],
              },
              optimizedPrompt: {
                type: Type.STRING,
                description: "The complete, polished, structured prompt ready to copy and run.",
              },
            },
            required: [
              "score",
              "summary",
              "strengths",
              "weaknesses",
              "missingElements",
              "improvements",
              "recommendedModel",
              "complexity",
              "breakdown",
              "optimizedPrompt",
            ],
          },
        },
      });
      responseText = response.text;
    } catch (modelErr: any) {
      console.warn("Primary model attempt failed, falling back to gemini-3.8-flash:", modelErr?.message);
      // Fallback to gemini-3.8-flash
      const fallbackResponse = await ai.models.generateContent({
        model: "gemini-3.8-flash",
        contents: `Analyze and optimize this rough prompt:

"""
${prompt.trim()}
"""`,
        config: {
          systemInstruction,
          responseMimeType: "application/json",
        },
      });
      responseText = fallbackResponse.text;
    }

    if (!responseText) {
      throw new Error("Empty response received from the AI engine.");
    }

    const parsedData = JSON.parse(responseText);

    // Normalize scale: if values are on a 1-10 scale, convert to 0-100 scale
    const normalizeScale = (val: any, fallback: number) => {
      const num = Number(val);
      if (isNaN(num)) return fallback;
      if (num <= 10 && num > 0) return Math.min(100, Math.round(num * 10));
      return Math.min(100, Math.max(0, Math.round(num)));
    };

    parsedData.score = normalizeScale(parsedData.score, 35);
    if (parsedData.breakdown) {
      parsedData.breakdown.context = normalizeScale(parsedData.breakdown.context, 30);
      parsedData.breakdown.specificity = normalizeScale(parsedData.breakdown.specificity, 40);
      parsedData.breakdown.constraints = normalizeScale(parsedData.breakdown.constraints, 20);
      parsedData.breakdown.outputFormat = normalizeScale(parsedData.breakdown.outputFormat, 10);
      parsedData.breakdown.clarity = normalizeScale(parsedData.breakdown.clarity, 60);
    }

    res.json(parsedData);
  } catch (error: any) {
    console.error("Optimization error:", error);

    const errorMessage = error?.message || "";
    let userFacingMessage = "An unexpected error occurred while analyzing the prompt. Please try again.";

    if (errorMessage.includes("API key not valid") || errorMessage.includes("API_KEY_INVALID")) {
      userFacingMessage = "The Gemini API key is invalid or unauthorized. Please verify your credentials.";
    } else if (errorMessage.includes("quota") || errorMessage.includes("429") || errorMessage.includes("RESOURCE_EXHAUSTED")) {
      userFacingMessage = "Gemini API rate limit or quota exceeded. Please wait a moment and try again.";
    } else if (errorMessage.includes("deadline") || errorMessage.includes("timeout")) {
      userFacingMessage = "The request timed out. Please try with a slightly shorter prompt.";
    } else if (errorMessage.includes("GEMINI_API_KEY is not configured")) {
      userFacingMessage = "Gemini API key is not configured on the server.";
    }

    res.status(500).json({
      error: userFacingMessage,
    });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`PromptForge server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error("Failed to start server:", err);
  process.exit(1);
});
