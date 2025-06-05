"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { resumeTemplates, getTemplateById } from "@/lib/templates";
import { ResumeValues } from "@/lib/validation";
import { Palette } from "lucide-react";

interface TemplateSelectorProps {
  resumeData: ResumeValues;
  setResumeData: (data: ResumeValues) => void;
}

export default function TemplateSelector({
  resumeData,
  setResumeData,
}: TemplateSelectorProps) {
  const currentTemplate = getTemplateById(resumeData.templateId || "modern");

  function handleTemplateChange(templateId: string) {
    setResumeData({
      ...resumeData,
      templateId,
    });
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Palette className="size-4" />
          {currentTemplate?.name || "Modern"}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-56">
        {resumeTemplates.map((template) => (
          <DropdownMenuItem
            key={template.id}
            onClick={() => handleTemplateChange(template.id)}
            className="flex items-center justify-between p-3"
          >
            <div className="flex flex-col">
              <span className="font-medium">{template.name}</span>
              <span className="text-xs text-muted-foreground">
                {template.description}
              </span>
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
} 