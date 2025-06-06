import { BorderStyles } from "@/app/(main)/editor/BorderStyleButton";
import useDimensions from "@/hooks/useDimensions";
import { cn } from "@/lib/utils";
import { ResumeValues } from "@/lib/validation";
import { formatDate } from "date-fns";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { Badge } from "./ui/badge";

interface ResumePreviewProps {
  resumeData: ResumeValues;
  contentRef?: React.Ref<HTMLDivElement>;
  className?: string;
}

export default function ResumePreview({
  resumeData,
  contentRef,
  className,
}: ResumePreviewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  const { width } = useDimensions(containerRef);

  const templateId = resumeData.templateId || "modern";

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div
      className={cn(
        "aspect-[210/297] h-fit w-full bg-white text-black",
        className,
      )}
      ref={containerRef}
    >
      <div
        className="space-y-6 p-6"
        style={{
          zoom: mounted && width ? (1 / 794) * width : 1,
        }}
        ref={contentRef}
        id="resumePreviewContent"
      >
        {templateId === "classic" && <ClassicTemplate resumeData={resumeData} />}
        {templateId === "minimal" && <MinimalTemplate resumeData={resumeData} />}
        {templateId === "creative" && <CreativeTemplate resumeData={resumeData} />}
        {templateId === "corporate" && <CorporateTemplate resumeData={resumeData} />}
        {templateId === "elegant" && <ElegantTemplate resumeData={resumeData} />}
        {templateId === "modern" && <ModernTemplate resumeData={resumeData} />}
      </div>
    </div>
  );
}

interface ResumeSectionProps {
  resumeData: ResumeValues;
}

// Modern Template (Original)
function ModernTemplate({ resumeData }: ResumeSectionProps) {
  return (
    <>
      <PersonalInfoHeader resumeData={resumeData} />
      <SummarySection resumeData={resumeData} />
      <WorkExperienceSection resumeData={resumeData} />
      <EducationSection resumeData={resumeData} />
      <SkillsSection resumeData={resumeData} />
    </>
  );
}

// Classic Template
function ClassicTemplate({ resumeData }: ResumeSectionProps) {
  return (
    <div className="space-y-4">
      <div className="border-b-2 border-black pb-4">
        <PersonalInfoHeaderClassic resumeData={resumeData} />
      </div>
      <SummarySection resumeData={resumeData} />
      <WorkExperienceSection resumeData={resumeData} />
      <EducationSection resumeData={resumeData} />
      <SkillsSection resumeData={resumeData} />
    </div>
  );
}

// Minimal Template
function MinimalTemplate({ resumeData }: ResumeSectionProps) {
  return (
    <div className="space-y-8">
      <PersonalInfoHeaderMinimal resumeData={resumeData} />
      <div className="space-y-6">
        <SummarySection resumeData={resumeData} />
        <WorkExperienceSection resumeData={resumeData} />
        <EducationSection resumeData={resumeData} />
        <SkillsSectionMinimal resumeData={resumeData} />
      </div>
    </div>
  );
}

// Creative Template
function CreativeTemplate({ resumeData }: ResumeSectionProps) {
  return (
    <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 -m-6">
      <div className="space-y-6">
        <PersonalInfoHeaderCreative resumeData={resumeData} />
        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-2 space-y-4">
            <SummarySection resumeData={resumeData} />
            <WorkExperienceSection resumeData={resumeData} />
          </div>
          <div className="space-y-4">
            <EducationSection resumeData={resumeData} />
            <SkillsSection resumeData={resumeData} />
          </div>
        </div>
      </div>
    </div>
  );
}

// Corporate Template
function CorporateTemplate({ resumeData }: ResumeSectionProps) {
  return (
    <div className="space-y-6">
      <div className="bg-gray-900 text-white p-6 -m-6 mb-6">
        <PersonalInfoHeaderCorporate resumeData={resumeData} />
      </div>
      <div className="space-y-6">
        <SummarySection resumeData={resumeData} />
        <div className="grid grid-cols-2 gap-6">
          <WorkExperienceSection resumeData={resumeData} />
          <div className="space-y-4">
            <EducationSection resumeData={resumeData} />
            <SkillsSection resumeData={resumeData} />
          </div>
        </div>
      </div>
    </div>
  );
}

// Elegant Template
function ElegantTemplate({ resumeData }: ResumeSectionProps) {
  return (
    <div className="space-y-6 font-serif">
      <PersonalInfoHeaderElegant resumeData={resumeData} />
      <div className="grid grid-cols-4 gap-6">
        <div className="col-span-1 space-y-4 border-r pr-4">
          <EducationSection resumeData={resumeData} />
          <SkillsSection resumeData={resumeData} />
        </div>
        <div className="col-span-3 space-y-4">
          <SummarySection resumeData={resumeData} />
          <WorkExperienceSection resumeData={resumeData} />
        </div>
      </div>
    </div>
  );
}

// Header variations for different templates
function PersonalInfoHeaderClassic({ resumeData }: ResumeSectionProps) {
  const { firstName, lastName, jobTitle, city, country, phone, email } = resumeData;

  return (
    <div className="text-center space-y-2">
      <h1 className="text-4xl font-bold uppercase tracking-wider">
        {firstName} {lastName}
      </h1>
      {jobTitle && (
        <p className="text-xl font-medium text-gray-700">{jobTitle}</p>
      )}
      <p className="text-sm text-gray-600">
        {city}
        {city && country ? ", " : ""}
        {country}
        {(city || country) && (phone || email) ? " • " : ""}
        {[phone, email].filter(Boolean).join(" • ")}
      </p>
    </div>
  );
}

function PersonalInfoHeaderMinimal({ resumeData }: ResumeSectionProps) {
  const { firstName, lastName, jobTitle, city, country, phone, email } = resumeData;

  return (
    <div className="space-y-1">
      <h1 className="text-2xl font-light">
        {firstName} {lastName}
      </h1>
      {jobTitle && (
        <p className="text-gray-600">{jobTitle}</p>
      )}
      <p className="text-xs text-gray-500">
        {[city, country, phone, email].filter(Boolean).join(" • ")}
      </p>
    </div>
  );
}

function PersonalInfoHeaderCreative({ resumeData }: ResumeSectionProps) {
  const {
    photo,
    firstName,
    lastName,
    jobTitle,
    city,
    country,
    phone,
    email,
    colorHex,
  } = resumeData;

  const [photoSrc, setPhotoSrc] = useState<string>("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (photo instanceof File) {
      const objectUrl = URL.createObjectURL(photo);
      setPhotoSrc(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    } else if (photo) {
      setPhotoSrc(photo);
    } else {
      setPhotoSrc("");
    }
  }, [photo]);

  return (
    <div className="relative">
      <div className="absolute -top-2 -left-2 w-32 h-32 rounded-full bg-gradient-to-r from-blue-400 to-purple-600 opacity-20"></div>
      <div className="relative flex items-center gap-6">
        {mounted && photoSrc && (
          <Image
            src={photoSrc}
            width={120}
            height={120}
            alt="Author photo"
            className="aspect-square object-cover rounded-2xl shadow-lg"
          />
        )}
        <div className="space-y-2">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            {firstName} {lastName}
          </h1>
          {jobTitle && (
            <p className="text-lg font-medium text-gray-700">{jobTitle}</p>
          )}
          <p className="text-sm text-gray-600">
            {[city, country, phone, email].filter(Boolean).join(" • ")}
          </p>
        </div>
      </div>
    </div>
  );
}

function PersonalInfoHeaderCorporate({ resumeData }: ResumeSectionProps) {
  const { firstName, lastName, jobTitle, city, country, phone, email } = resumeData;

  return (
    <div className="space-y-2">
      <h1 className="text-3xl font-bold text-white">
        {firstName} {lastName}
      </h1>
      {jobTitle && (
        <p className="text-lg text-gray-300">{jobTitle}</p>
      )}
      <p className="text-sm text-gray-400">
        {[city, country, phone, email].filter(Boolean).join(" • ")}
      </p>
    </div>
  );
}

function PersonalInfoHeaderElegant({ resumeData }: ResumeSectionProps) {
  const {
    photo,
    firstName,
    lastName,
    jobTitle,
    city,
    country,
    phone,
    email,
    colorHex,
  } = resumeData;

  const [photoSrc, setPhotoSrc] = useState<string>("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (photo instanceof File) {
      const objectUrl = URL.createObjectURL(photo);
      setPhotoSrc(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    } else if (photo) {
      setPhotoSrc(photo);
    } else {
      setPhotoSrc("");
    }
  }, [photo]);

  return (
    <div className="border-b border-gray-200 pb-6">
      <div className="flex items-end justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-light tracking-wide">
            {firstName} <span className="font-normal">{lastName}</span>
          </h1>
          {jobTitle && (
            <p className="text-lg italic text-gray-600">{jobTitle}</p>
          )}
          <p className="text-sm text-gray-500">
            {[city, country, phone, email].filter(Boolean).join(" • ")}
          </p>
        </div>
        {mounted && photoSrc && (
          <Image
            src={photoSrc}
            width={80}
            height={80}
            alt="Author photo"
            className="aspect-square object-cover rounded-full"
          />
        )}
      </div>
    </div>
  );
}

// Skills section variation for minimal template
function SkillsSectionMinimal({ resumeData }: ResumeSectionProps) {
  const { skills } = resumeData;

  if (!skills?.length) return null;

  return (
    <div className="space-y-2">
      <h3 className="text-lg font-light border-b border-gray-200 pb-1">Skills</h3>
      <div className="text-sm">
        {skills.join(" • ")}
      </div>
    </div>
  );
}

// Keep original components for modern template
function PersonalInfoHeader({ resumeData }: ResumeSectionProps) {
  const {
    photo,
    firstName,
    lastName,
    jobTitle,
    city,
    country,
    phone,
    email,
    colorHex,
    borderStyle,
  } = resumeData;

  const [photoSrc, setPhotoSrc] = useState<string>("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (photo instanceof File) {
      const objectUrl = URL.createObjectURL(photo);
      setPhotoSrc(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    } else if (photo) {
      setPhotoSrc(photo);
    } else {
      setPhotoSrc("");
    }
  }, [photo]);

  return (
    <div className="flex items-center gap-6">
      {mounted && photoSrc && (
        <Image
          src={photoSrc}
          width={100}
          height={100}
          alt="Author photo"
          className="aspect-square object-cover"
          style={{
            borderRadius:
              borderStyle === BorderStyles.SQUARE
                ? "0px"
                : borderStyle === BorderStyles.CIRCLE
                  ? "9999px"
                  : "10%",
          }}
        />
      )}
      <div className="space-y-2.5">
        <div className="space-y-1">
          <p
            className="text-3xl font-bold"
            style={{
              color: colorHex,
            }}
          >
            {firstName} {lastName}
          </p>
          <p
            className="font-medium"
            style={{
              color: colorHex,
            }}
          >
            {jobTitle}
          </p>
        </div>
        <p className="text-xs text-gray-500">
          {city}
          {city && country ? ", " : ""}
          {country}
          {(city || country) && (phone || email) ? " • " : ""}
          {[phone, email].filter(Boolean).join(" • ")}
        </p>
      </div>
    </div>
  );
}

function SummarySection({ resumeData }: ResumeSectionProps) {
  const { summary, colorHex } = resumeData;

  if (!summary) return null;

  return (
    <>
      <hr
        className="border-2"
        style={{
          borderColor: colorHex,
        }}
      />
      <div className="break-inside-avoid space-y-3">
        <p
          className="text-lg font-semibold"
          style={{
            color: colorHex,
          }}
        >
          Professional Summary
        </p>
        <p className="text-sm">{summary}</p>
      </div>
    </>
  );
}

function WorkExperienceSection({ resumeData }: ResumeSectionProps) {
  const { workExperiences, colorHex } = resumeData;

  const workExperiencesNotEmpty = workExperiences?.filter(
    (exp) => Object.values(exp).filter(Boolean).length > 0,
  );

  if (!workExperiencesNotEmpty?.length) return null;

  return (
    <>
      <hr
        className="border-2"
        style={{
          borderColor: colorHex,
        }}
      />
      <div className="space-y-3">
        <p
          className="text-lg font-semibold"
          style={{
            color: colorHex,
          }}
        >
          Work Experience
        </p>
        {workExperiencesNotEmpty.map((exp, index) => (
          <div key={index} className="break-inside-avoid space-y-1">
            <div className="flex items-center justify-between text-sm font-medium">
              <span>{exp.position}</span>
              {exp.startDate && (
                <span>
                  {exp.startDate &&
                    formatDate(exp.startDate, "MM/yyyy")} -{" "}
                  {exp.endDate
                    ? formatDate(exp.endDate, "MM/yyyy")
                    : "Present"}
                </span>
              )}
            </div>
            <p className="text-xs font-semibold">{exp.company}</p>
            {exp.description && (
              <div className="text-xs">{exp.description}</div>
            )}
          </div>
        ))}
      </div>
    </>
  );
}

function EducationSection({ resumeData }: ResumeSectionProps) {
  const { educations, colorHex } = resumeData;

  const educationsNotEmpty = educations?.filter(
    (edu) => Object.values(edu).filter(Boolean).length > 0,
  );

  if (!educationsNotEmpty?.length) return null;

  return (
    <>
      <hr
        className="border-2"
        style={{
          borderColor: colorHex,
        }}
      />
      <div className="space-y-3">
        <p
          className="text-lg font-semibold"
          style={{
            color: colorHex,
          }}
        >
          Education
        </p>
        {educationsNotEmpty.map((edu, index) => (
          <div key={index} className="break-inside-avoid space-y-1">
            <div className="flex items-center justify-between text-sm font-medium">
              <span>{edu.degree}</span>
              {edu.startDate && (
                <span>
                  {edu.startDate &&
                    formatDate(edu.startDate, "MM/yyyy")} -{" "}
                  {edu.endDate
                    ? formatDate(edu.endDate, "MM/yyyy")
                    : "Present"}
                </span>
              )}
            </div>
            <p className="text-xs font-semibold">{edu.school}</p>
          </div>
        ))}
      </div>
    </>
  );
}

function SkillsSection({ resumeData }: ResumeSectionProps) {
  const { skills, colorHex, borderStyle } = resumeData;

  if (!skills?.length) return null;

  return (
    <>
      <hr
        className="border-2"
        style={{
          borderColor: colorHex,
        }}
      />
      <div className="break-inside-avoid space-y-3">
        <p
          className="text-lg font-semibold"
          style={{
            color: colorHex,
          }}
        >
          Skills
        </p>
        <div className="flex break-inside-avoid flex-wrap gap-2">
          {skills.map((skill, index) => (
            <Badge
              key={index}
              className="rounded-md bg-black text-white hover:bg-black"
              style={{
                backgroundColor: colorHex,
                borderRadius:
                  borderStyle === BorderStyles.SQUARE
                    ? "0px"
                    : borderStyle === BorderStyles.CIRCLE
                      ? "9999px"
                      : "8px",
              }}
            >
              {skill}
            </Badge>
          ))}
        </div>
      </div>
    </>
  );
}
