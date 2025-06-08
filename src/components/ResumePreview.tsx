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
        {templateId === "classic" && (
          <ClassicTemplate resumeData={resumeData} />
        )}
        {templateId === "minimal" && (
          <MinimalTemplate resumeData={resumeData} />
        )}
        {templateId === "creative" && (
          <CreativeTemplate resumeData={resumeData} />
        )}
        {templateId === "corporate" && (
          <CorporateTemplate resumeData={resumeData} />
        )}
        {templateId === "elegant" && (
          <ElegantTemplate resumeData={resumeData} />
        )}
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
      <div className="pb-4">
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
    <div className="-m-6 bg-gradient-to-br from-blue-50 to-purple-50 p-6">
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
      <div className="-m-6 mb-6 bg-gray-900 p-6 text-white">
        <PersonalInfoHeaderCorporate resumeData={resumeData} />
      </div>
      <div className="space-y-6">
        <SummarySection resumeData={resumeData} />
        <div className="grid grid-cols-3 gap-8">
          <div className="col-span-2">
            <WorkExperienceSectionCorporate resumeData={resumeData} />
          </div>
          <div className="space-y-6">
            <EducationSectionCorporate resumeData={resumeData} />
            <SkillsSectionCorporate resumeData={resumeData} />
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
  const { firstName, lastName, jobTitle, city, country, phone, email, colorHex } =
    resumeData;

  return (
    <div className="space-y-2 text-center">
      <h1 
        className="text-4xl font-bold uppercase tracking-wider"
        style={{ color: colorHex }}
      >
        {firstName} {lastName}
      </h1>
      {jobTitle && (
        <p 
          className="text-xl font-medium"
          style={{ color: colorHex }}
        >
          {jobTitle}
        </p>
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
  const { firstName, lastName, jobTitle, city, country, phone, email, colorHex } =
    resumeData;

  return (
    <div className="space-y-1">
      <h1 
        className="text-2xl font-light"
        style={{ color: colorHex }}
      >
        {firstName} {lastName}
      </h1>
      {jobTitle && (
        <p 
          className="text-gray-600"
          style={{ color: colorHex }}
        >
          {jobTitle}
        </p>
      )}
      <p className="text-xs text-gray-500">
        {[city, country, phone, email].filter(Boolean).join(" • ")}
      </p>
    </div>
  );
}

function PersonalInfoHeaderCreative({ resumeData }: ResumeSectionProps) {
  const { photo, firstName, lastName, jobTitle, city, country, phone, email, colorHex } =
    resumeData;

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
      <div className="absolute -left-2 -top-2 h-32 w-32 rounded-full bg-gradient-to-r from-blue-400 to-purple-600 opacity-20"></div>
      <div className="relative flex items-center gap-6">
        {mounted && photoSrc && (
          <Image
            src={photoSrc}
            width={120}
            height={120}
            alt="Author photo"
            className="aspect-square rounded-2xl object-cover shadow-lg"
          />
        )}
        <div className="space-y-2">
          <h1 
            className="text-4xl font-bold"
            style={{ color: colorHex }}
          >
            {firstName} {lastName}
          </h1>
          {jobTitle && (
            <p 
              className="text-lg font-medium"
              style={{ color: colorHex }}
            >
              {jobTitle}
            </p>
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
  const { firstName, lastName, jobTitle, city, country, phone, email, colorHex } =
    resumeData;

  return (
    <div className="space-y-2">
      <h1 
        className="text-3xl font-bold"
        style={{ color: colorHex }}
      >
        {firstName} {lastName}
      </h1>
      {jobTitle && (
        <p 
          className="text-lg"
          style={{ color: colorHex }}
        >
          {jobTitle}
        </p>
      )}
      <p className="text-sm text-gray-400">
        {[city, country, phone, email].filter(Boolean).join(" • ")}
      </p>
    </div>
  );
}

function PersonalInfoHeaderElegant({ resumeData }: ResumeSectionProps) {
  const { photo, firstName, lastName, jobTitle, city, country, phone, email, colorHex } =
    resumeData;

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
          <h1 
            className="text-3xl font-light tracking-wide"
            style={{ color: colorHex }}
          >
            {firstName} <span className="font-normal">{lastName}</span>
          </h1>
          {jobTitle && (
            <p 
              className="text-lg italic"
              style={{ color: colorHex }}
            >
              {jobTitle}
            </p>
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
            className="aspect-square rounded-full object-cover"
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
      <h3 className="border-b border-gray-200 pb-1 text-lg font-light">
        Skills
      </h3>
      <div className="text-sm">{skills.join(" • ")}</div>
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
                  {exp.startDate && formatDate(exp.startDate, "MM/yyyy")} -{" "}
                  {exp.endDate ? formatDate(exp.endDate, "MM/yyyy") : "Present"}
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
                  {edu.startDate && formatDate(edu.startDate, "MM/yyyy")} -{" "}
                  {edu.endDate ? formatDate(edu.endDate, "MM/yyyy") : "Present"}
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

// Corporate Template specific sections
function WorkExperienceSectionCorporate({ resumeData }: ResumeSectionProps) {
  const { workExperiences, colorHex } = resumeData;

  const workExperiencesNotEmpty = workExperiences?.filter(
    (exp) => Object.values(exp).filter(Boolean).length > 0,
  );

  if (!workExperiencesNotEmpty?.length) return null;

  return (
    <div className="space-y-4">
      <div className="border-b-2 border-gray-300 pb-2">
        <h3 className="text-xl font-bold text-gray-900">Work Experience</h3>
      </div>
      <div className="space-y-4">
        {workExperiencesNotEmpty.map((exp, index) => (
          <div key={index} className="space-y-2">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <h4 className="text-lg font-semibold text-gray-900">{exp.position}</h4>
              {exp.startDate && (
                <span className="text-sm text-gray-600">
                  {exp.startDate && formatDate(exp.startDate, "MM/yyyy")} -{" "}
                  {exp.endDate ? formatDate(exp.endDate, "MM/yyyy") : "Present"}
                </span>
              )}
            </div>
            <p className="text-sm font-medium text-gray-700">{exp.company}</p>
            {exp.description && (
              <div className="text-sm text-gray-600 leading-relaxed">{exp.description}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function EducationSectionCorporate({ resumeData }: ResumeSectionProps) {
  const { educations, colorHex } = resumeData;

  const educationsNotEmpty = educations?.filter(
    (edu) => Object.values(edu).filter(Boolean).length > 0,
  );

  if (!educationsNotEmpty?.length) return null;

  return (
    <div className="space-y-3">
      <div className="border-b-2 border-gray-300 pb-1">
        <h3 className="text-lg font-bold text-gray-900">Education</h3>
      </div>
      <div className="space-y-3">
        {educationsNotEmpty.map((edu, index) => (
          <div key={index} className="space-y-1">
            <div className="flex flex-col">
              <h4 className="text-sm font-semibold text-gray-900">{edu.degree}</h4>
              {edu.startDate && (
                <span className="text-xs text-gray-600">
                  {edu.startDate && formatDate(edu.startDate, "MM/yyyy")} -{" "}
                  {edu.endDate ? formatDate(edu.endDate, "MM/yyyy") : "Present"}
                </span>
              )}
            </div>
            <p className="text-xs text-gray-700">{edu.school}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function SkillsSectionCorporate({ resumeData }: ResumeSectionProps) {
  const { skills, colorHex, borderStyle } = resumeData;

  if (!skills?.length) return null;

  return (
    <div className="space-y-3">
      <div className="border-b-2 border-gray-300 pb-1">
        <h3 className="text-lg font-bold text-gray-900">Skills</h3>
      </div>
      <div className="flex flex-wrap gap-2">
        {skills.map((skill, index) => (
          <Badge
            key={index}
            className="rounded-sm bg-gray-800 text-white hover:bg-gray-800 text-xs"
          >
            {skill}
          </Badge>
        ))}
      </div>
    </div>
  );
}
