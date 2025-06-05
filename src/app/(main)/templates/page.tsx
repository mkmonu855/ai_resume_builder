import { canCreateResume } from "@/lib/permissions";
import prisma from "@/lib/prisma";
import { getUserSubscriptionLevel } from "@/lib/subscription";
import { resumeTemplates } from "@/lib/templates";
import { auth } from "@clerk/nextjs/server";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import Link from "next/link";
import TemplateCard from "./TemplateCard";

export const metadata: Metadata = {
  title: "Choose Template",
};

export default async function Page() {
  const { userId } = await auth();

  if (!userId) {
    return null;
  }

  const [totalCount, subscriptionLevel] = await Promise.all([
    prisma.resume.count({
      where: {
        userId,
      },
    }),
    getUserSubscriptionLevel(userId),
  ]);

  if (!canCreateResume(subscriptionLevel, totalCount)) {
    redirect("/resumes");
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Hero Section */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Back Navigation */}
        <div className="mb-8">
          <Link 
            href="/resumes"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors duration-200"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to My Resumes
          </Link>
        </div>

        <div className="text-center">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
            <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
            Choose Your
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent"> Template</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-600">
            Select from our collection of professionally designed resume templates. 
            Each template is crafted to help you stand out and make a great first impression.
          </p>
          <div className="mt-8 flex items-center justify-center gap-2 text-sm text-gray-500">
            <div className="flex h-2 w-2 rounded-full bg-green-500"></div>
            <span>All templates are completely free</span>
          </div>
        </div>

        {/* Templates Grid */}
        <div className="mt-16">
          <div className="mb-8 text-center">
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">Professional Templates</h2>
            <p className="text-gray-600">All templates are ATS-friendly and designed by professionals</p>
          </div>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
            {resumeTemplates.map((template, index) => (
              <div 
                key={template.id}
                className="animate-in fade-in slide-in-from-bottom-4"
                style={{ 
                  animationDelay: `${index * 150}ms`,
                  animationFillMode: 'both'
                }}
              >
                <TemplateCard
                  template={template}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <div className="mx-auto max-w-2xl">
            <h2 className="text-2xl font-semibold text-gray-900">
              Ready to create your professional resume?
            </h2>
            <p className="mt-2 text-gray-600">
              Choose any template above to get started. You can always switch templates later.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
} 