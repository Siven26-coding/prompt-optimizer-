import React, { useState } from "react";
import { TEMPLATES } from "../data/templates";
import { PromptTemplate, OptimizationMode } from "../types";
import { Search, Layers, ArrowUpRight, Sparkles, Tag } from "lucide-react";

interface TemplateLibraryProps {
  onSelectTemplate: (template: PromptTemplate) => void;
}

const CATEGORIES = [
  "All",
  "Development",
  "Design",
  "Marketing",
  "AI",
  "Education",
  "Business",
] as const;

export const TemplateLibrary: React.FC<TemplateLibraryProps> = ({ onSelectTemplate }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTemplates = TEMPLATES.filter((tpl) => {
    const matchesCategory =
      selectedCategory === "All" || tpl.category === selectedCategory;
    const matchesSearch =
      tpl.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tpl.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tpl.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesSearch;
  });

  return (
    <section id="templates" className="py-16 md:py-20 bg-white border-b border-zinc-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-10">
          <div className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold uppercase tracking-wider text-zinc-500 mb-2">
            <Layers className="w-3.5 h-3.5 text-zinc-700" />
            <span>Curated Prompts</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-950 tracking-tight font-['Plus_Jakarta_Sans',sans-serif]">
            Template Library
          </h2>
          <p className="text-base text-zinc-600 mt-2">
            Pre-configured rough starters across engineering, creative, and agentic workflows.
            Load any template directly into the compiler to test optimization modes.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-8 pb-6 border-b border-zinc-100">
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                id={`cat-tab-${cat.toLowerCase()}`}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? "bg-zinc-950 text-white font-semibold shadow-xs"
                    : "bg-zinc-100 text-zinc-600 hover:text-zinc-900 hover:bg-zinc-200/80"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              id="template-search-input"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search templates, tags..."
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-zinc-50 border border-zinc-200 rounded-lg text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:border-zinc-400 focus:bg-white transition-colors"
            />
          </div>
        </div>

        {/* Grid of Templates */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredTemplates.map((template) => (
            <div
              key={template.id}
              id={`template-card-${template.id}`}
              className="group bg-zinc-50/50 hover:bg-white rounded-2xl border border-zinc-200/90 hover:border-zinc-300 p-5 transition-all duration-200 hover:shadow-md flex flex-col justify-between"
            >
              <div>
                {/* Category badge and recommended mode */}
                <div className="flex items-center justify-between text-xs font-mono mb-3">
                  <span className="px-2 py-0.5 rounded bg-zinc-200/70 text-zinc-700 font-semibold text-[11px]">
                    {template.category}
                  </span>
                  <span className="text-zinc-400 text-[11px]">
                    Rec: <span className="text-zinc-600 font-semibold">{template.recommendedMode}</span>
                  </span>
                </div>

                <h3 className="text-base font-bold text-zinc-950 group-hover:text-black mb-1.5 font-['Plus_Jakarta_Sans',sans-serif]">
                  {template.title}
                </h3>

                <p className="text-xs text-zinc-600 leading-relaxed mb-4">
                  {template.description}
                </p>

                {/* Sample rough prompt snippet */}
                <div className="bg-white rounded-lg p-2.5 border border-zinc-200/80 font-mono text-[11px] text-zinc-600 mb-4 line-clamp-2 italic">
                  "{template.roughPrompt}"
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1 mb-5">
                  {template.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] font-mono text-zinc-500 bg-zinc-100 px-1.5 py-0.5 rounded border border-zinc-200/50"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action */}
              <button
                id={`btn-use-template-${template.id}`}
                type="button"
                onClick={() => onSelectTemplate(template)}
                className="w-full py-2 px-3 rounded-xl bg-white group-hover:bg-zinc-950 text-zinc-800 group-hover:text-white border border-zinc-200 group-hover:border-zinc-950 text-xs font-semibold transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs group-hover:shadow-[0_0_12px_rgba(57,255,20,0.25)]"
              >
                <Sparkles className="w-3.5 h-3.5 text-zinc-400 group-hover:text-[#39FF14] transition-colors" />
                <span>Use Template</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-zinc-400 group-hover:text-zinc-200 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
            </div>
          ))}
        </div>

        {filteredTemplates.length === 0 && (
          <div className="text-center py-12 bg-zinc-50 rounded-2xl border border-zinc-200">
            <p className="text-sm text-zinc-500">No templates found matching your search.</p>
            <button
              onClick={() => {
                setSelectedCategory("All");
                setSearchQuery("");
              }}
              className="mt-2 text-xs text-zinc-900 font-semibold underline cursor-pointer"
            >
              Reset filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
