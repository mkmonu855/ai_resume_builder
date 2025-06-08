import { Button } from "@/components/ui/button";
import Link from "next/link";
import logo from "@/assets/logo.jpg";
import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="container mx-auto px-6 py-16 lg:py-24">
        <div className="max-w-4xl mx-auto text-center space-y-16">
          {/* Logo */}
          <div className="flex justify-center">
            <div className="bg-white rounded-2xl p-4 shadow-lg">
              <Image
                src={logo}
                alt="Logo"
                width={100}
                height={100}
                className="rounded-xl"
              />
            </div>
          </div>

          {/* Main Content */}
          <div className="space-y-8">
            <h1 className="text-5xl lg:text-6xl font-light text-gray-900 leading-tight">
              Build Your Resume
              <br />
              <span className="font-medium">In Minutes</span>
            </h1>
            
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Create professional resumes with our simple builder. 
              Choose from modern templates and export to PDF instantly.
            </p>

            {/* CTA Button */}
            <div className="pt-6">
              <Button 
                asChild 
                size="lg" 
                className="bg-gray-900 hover:bg-gray-800 text-white px-8 py-4 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
              >
                <Link href="/resumes">
                  Get Started
                </Link>
              </Button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 max-w-lg mx-auto pt-8">
            <div className="bg-white rounded-xl p-6 shadow-sm text-center">
              <div className="text-2xl font-semibold text-gray-900">10K+</div>
              <div className="text-sm text-gray-500">Users</div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm text-center">
              <div className="text-2xl font-semibold text-gray-900">6</div>
              <div className="text-sm text-gray-500">Templates</div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm text-center">
              <div className="text-2xl font-semibold text-gray-900">5min</div>
              <div className="text-sm text-gray-500">Average</div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white">
        <div className="container mx-auto px-6 py-20">
          <div className="max-w-5xl mx-auto">
            {/* Section Title */}
            <div className="text-center mb-16">
              <h2 className="text-3xl font-medium text-gray-900 mb-4">
                Why Choose Our Builder
              </h2>
              <p className="text-lg text-gray-600">
                Simple tools for professional results
              </p>
            </div>

            {/* Features Grid */}
            <div className="grid md:grid-cols-3 gap-8">
              {/* Feature 1 */}
              <div className="bg-gray-50 rounded-2xl p-8 text-center">
                <div className="w-12 h-12 bg-gray-900 rounded-xl flex items-center justify-center mx-auto mb-6">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-medium text-gray-900 mb-3">Fast</h3>
                <p className="text-gray-600">
                  Create your resume in minutes with our streamlined interface
                </p>
              </div>

              {/* Feature 2 */}
              <div className="bg-gray-50 rounded-2xl p-8 text-center">
                <div className="w-12 h-12 bg-gray-900 rounded-xl flex items-center justify-center mx-auto mb-6">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-medium text-gray-900 mb-3">Professional</h3>
                <p className="text-gray-600">
                  Beautiful templates designed by professionals
                </p>
              </div>

              {/* Feature 3 */}
              <div className="bg-gray-50 rounded-2xl p-8 text-center">
                <div className="w-12 h-12 bg-gray-900 rounded-xl flex items-center justify-center mx-auto mb-6">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-medium text-gray-900 mb-3">ATS Ready</h3>
                <p className="text-gray-600">
                  Optimized for applicant tracking systems
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom CTA Section */}
      <div className="bg-gray-900">
        <div className="container mx-auto px-6 py-20">
          <div className="max-w-2xl mx-auto text-center space-y-8">
            <h2 className="text-4xl font-light text-white">
              Ready to Start?
            </h2>
            
            <p className="text-xl text-gray-300">
              Join thousands building better resumes
            </p>

            <Button 
              asChild 
              size="lg" 
              className="bg-white hover:bg-gray-100 text-gray-900 px-8 py-4 text-lg rounded-xl shadow-lg transition-all duration-200"
            >
              <Link href="/resumes">
                Create Resume
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
