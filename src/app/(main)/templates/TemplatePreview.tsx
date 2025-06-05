"use client";

import ResumePreview from "@/components/ResumePreview";
import { ResumeValues } from "@/lib/validation";
import { useRef } from "react";

interface TemplatePreviewProps {
  templateId: string;
  className?: string;
}

// Sample data for preview
const sampleResumeData: ResumeValues = {
  templateId: "modern",
  title: "Sample Resume",
  firstName: "John",
  lastName: "Doe",
  jobTitle: "Software Developer",
  city: "New York",
  country: "USA",
  phone: "(555) 123-4567",
  email: "john.doe@email.com",
  summary: "Experienced software developer with expertise in modern web technologies. Passionate about creating efficient and scalable solutions.",
  workExperiences: [
    {
      position: "Senior Software Developer",
      company: "Tech Corp",
      startDate: "2022-01",
      endDate: "",
      description: "Led development of web applications using React and Node.js"
    },
    {
      position: "Software Developer",
      company: "StartupXYZ",
      startDate: "2020-06",
      endDate: "2021-12",
      description: "Developed responsive web applications and REST APIs"
    }
  ],
  educations: [
    {
      degree: "Bachelor of Computer Science",
      school: "University of Technology",
      startDate: "2016-09",
      endDate: "2020-05"
    }
  ],
  skills: ["React", "Node.js", "TypeScript", "JavaScript", "Python", "AWS"],
  colorHex: "#3b82f6",
  borderStyle: "squircle"
};

export default function TemplatePreview({ templateId, className }: TemplatePreviewProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  
  // Different colors for different templates to make them visually distinct
  const templateColors: Record<string, string> = {
    modern: "#3b82f6",
    classic: "#059669", 
    creative: "#7c3aed",
    minimal: "#1f2937",
    corporate: "#dc2626",
    elegant: "#92400e"
  };
  
  const previewData = {
    ...sampleResumeData,
    templateId,
    colorHex: templateColors[templateId] || "#3b82f6"
  };

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <div className="pointer-events-none">
        <ResumePreview
          resumeData={previewData}
          contentRef={contentRef}
          className="w-full min-h-[400px]"
        />
      </div>
      {/* Subtle overlay to indicate it's a preview */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white/10 pointer-events-none" />
    </div>
  );
} 