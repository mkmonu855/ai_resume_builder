"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { ResumeTemplate } from "@/lib/templates";
import { useRouter } from "next/navigation";
import { createResume } from "./actions";
import TemplatePreview from "./TemplatePreview";

interface TemplateCardProps {
  template: ResumeTemplate;
}

export default function TemplateCard({
  template,
}: TemplateCardProps) {
  const router = useRouter();

  async function handleSelectTemplate() {
    try {
      const resume = await createResume(template.id);
      router.push(`/editor?resumeId=${resume.id}`);
    } catch (error) {
      console.error("Failed to create resume:", error);
    }
  }

  return (
    <Card className="group relative overflow-hidden border-0 bg-white shadow-md transition-all duration-300 hover:shadow-2xl hover:scale-[1.02]">
      {/* Preview Section */}
      <CardHeader className="p-0">
        <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-slate-50 to-slate-100">
          {/* Preview Container */}
          <div className="absolute inset-2 overflow-hidden rounded-lg bg-white shadow-inner">
            <TemplatePreview 
              templateId={template.id}
              className="h-full w-full scale-[0.75] origin-top-left transform transition-transform duration-300 group-hover:scale-[0.78]"
            />
          </div>
          
          {/* Overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          
          {/* Quick Preview Badge */}
          <div className="absolute right-2 top-2 rounded-full bg-white/90 px-2 py-1 text-xs font-medium text-gray-700 shadow-lg backdrop-blur-sm opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            Preview
          </div>
        </div>
      </CardHeader>

      {/* Content Section */}
      <CardContent className="p-6">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-gray-900">{template.name}</h3>
            <div className="rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-700">
              Free
            </div>
          </div>
          <p className="text-sm leading-relaxed text-gray-600">{template.description}</p>
          
          {/* Features */}
          <div className="flex flex-wrap gap-2 pt-2">
            <span className="rounded-md bg-gray-100 px-2 py-1 text-xs text-gray-600">Professional</span>
            <span className="rounded-md bg-gray-100 px-2 py-1 text-xs text-gray-600">ATS-Friendly</span>
            <span className="rounded-md bg-gray-100 px-2 py-1 text-xs text-gray-600">Customizable</span>
          </div>
        </div>
      </CardContent>

      {/* Action Section */}
      <CardFooter className="p-6 pt-0">
        <Button
          onClick={handleSelectTemplate}
          className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 transform hover:scale-[1.02] shadow-md hover:shadow-lg"
          size="lg"
        >
          <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Use This Template
        </Button>
      </CardFooter>
    </Card>
  );
} 