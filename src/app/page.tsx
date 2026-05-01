'use client';

import { useEffect, useState, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useAppStore } from '@/lib/store';
import { Header } from '@/components/careerhub';
import { Footer } from '@/components/careerhub';
import { HeroSection } from '@/components/careerhub';
import { JobList } from '@/components/careerhub';
import { JobFilters } from '@/components/careerhub';
import { JobDetail } from '@/components/careerhub';
import { BlogList } from '@/components/careerhub';
import { BlogDetail } from '@/components/careerhub';
import { JobAlertsForm } from '@/components/careerhub';
import { CategoryGrid } from '@/components/careerhub';
import { StatsSection } from '@/components/careerhub';
import { AdminDashboard } from '@/components/careerhub';
import { LegalPage } from '@/components/careerhub';
import { AdSlot } from '@/components/careerhub';
import { Button } from '@/components/ui/button';
import { ArrowUp, Briefcase, BookOpen, Bell, Shield } from 'lucide-react';

const pageVariants = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.3, ease: 'easeOut' } },
  exit: { opacity: 0, y: -8, transition: { duration: 0.15 } },
};

// ==================== HOME VIEW ====================
function HomeView() {
  const { navigate } = useAppStore();
  return (
    <div>
      <HeroSection />
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Browse by Category</h2>
          <p className="mt-2 text-muted-foreground">Explore opportunities across different industries</p>
        </div>
        <CategoryGrid />
      </section>

      <AdSlot position="list" size="leaderboard" />

      <section className="bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="mb-10 text-center">
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Latest Opportunities</h2>
            <p className="mt-2 text-muted-foreground">Freshly posted jobs from top companies</p>
          </div>
          <JobList featuredOnly />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <StatsSection />
      </section>

      <section className="bg-emerald-50/50 dark:bg-emerald-950/20">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="mb-10 text-center">
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Why CareerHub?</h2>
            <p className="mt-2 text-muted-foreground">Everything you need to land your next role</p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: Briefcase, title: 'Curated Jobs', desc: 'Handpicked opportunities from verified companies' },
              { icon: BookOpen, title: 'Career Blog', desc: 'Expert advice on resumes, interviews, and career growth' },
              { icon: Bell, title: 'Job Alerts', desc: 'Never miss a matching opportunity in your field' },
              { icon: Shield, title: 'Safe & Secure', desc: 'Your data is protected with enterprise-grade security' },
            ].map((item) => (
              <div key={item.title} className="rounded-xl border bg-card p-6 text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-100 text-emerald-700">
                  <item.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-4 text-lg font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Button onClick={() => navigate('jobs')} size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white">
              Explore All Jobs
            </Button>
          </div>
        </div>
      </section>

      <AdSlot position="footer" size="banner" />
    </div>
  );
}

// ==================== JOBS VIEW ====================
function JobsView() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Find Jobs</h1>
        <p className="mt-2 text-muted-foreground">Discover your next career opportunity</p>
      </div>
      <JobFilters />
      <div className="mt-6">
        <JobList />
      </div>
    </div>
  );
}

// ==================== BLOG VIEW ====================
function BlogView() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Career Blog</h1>
        <p className="mt-2 text-muted-foreground">Expert advice, industry insights, and career tips</p>
      </div>
      <BlogList />
    </div>
  );
}

// ==================== JOB ALERTS VIEW ====================
function JobAlertsView() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8 text-center">
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Job Alerts</h1>
        <p className="mt-2 text-muted-foreground">Get notified when new jobs matching your preferences are posted</p>
      </div>
      <JobAlertsForm />
    </div>
  );
}

// ==================== LEGAL PAGES ====================
function PrivacyView() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
      <LegalPage
        title="Privacy Policy"
        content={`# Privacy Policy for CareerHub

**Last updated:** January 2025

## 1. Introduction

CareerHub ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our services.

## 2. Information We Collect

### Personal Information
- **Name and email address** when you create an account or subscribe to job alerts
- **Resume/CV** when you submit job applications
- **Contact information** including phone number (optional)
- **Profile information** such as skills, experience, and education

### Automatically Collected Information
- Browser type and device information
- IP address and geographic location
- Pages visited and time spent on our site
- Referring website addresses

## 3. How We Use Your Information

We use the information we collect to:
- Provide and maintain our job portal services
- Match you with relevant job opportunities
- Send job alerts and notifications you've subscribed to
- Forward your applications to employers
- Improve our website and user experience
- Comply with legal obligations
- Detect and prevent fraud

## 4. Information Sharing

We may share your information with:
- **Employers** when you apply for their job postings
- **Service providers** who assist in operating our platform
- **Analytics partners** to help us understand usage patterns (anonymized data)
- **Legal authorities** when required by law

## 5. Data Security

We implement industry-standard security measures including:
- SSL/TLS encryption for data transmission
- Secure storage of personal information
- Regular security audits and updates
- Access controls and authentication

## 6. Your Rights

You have the right to:
- Access your personal data
- Correct inaccurate information
- Delete your account and data
- Opt out of marketing communications
- Request data portability

## 7. Cookies

We use cookies and similar technologies to:
- Remember your preferences
- Analyze website traffic
- Provide personalized content
- Enable essential website functionality

## 8. Third-Party Services

Our website may contain links to third-party websites and services. We are not responsible for the privacy practices of these external sites.

## 9. Changes to This Policy

We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date.

## 10. Contact Us

If you have questions about this Privacy Policy, please contact us at:
- **Email:** privacy@careerhub.com
- **Address:** CareerHub Inc., 123 Career Street, San Francisco, CA 94102`}
      />
    </div>
  );
}

function TermsView() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
      <LegalPage
        title="Terms of Service"
        content={`# Terms of Service for CareerHub

**Last updated:** January 2025

## 1. Acceptance of Terms

By accessing and using CareerHub, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.

## 2. Description of Service

CareerHub is a job portal that connects job seekers with employers. Our services include:
- Job listing and search functionality
- Job application submission
- Job alert notifications
- Career blog and resources
- Employer job posting tools

## 3. User Accounts

### Registration
You may be required to create an account to access certain features. You agree to:
- Provide accurate and complete information
- Keep your account credentials secure
- Notify us immediately of unauthorized access
- Be responsible for all activities under your account

### Account Types
- **Candidates** can search jobs, save favorites, and submit applications
- **Employers** can post jobs and review applications
- **Administrators** have full platform management access

## 4. Job Postings

### For Employers
- Job postings must be accurate and not misleading
- You must have authority to post on behalf of your company
- Jobs must comply with applicable employment laws
- We reserve the right to remove any posting that violates our guidelines

### For Job Seekers
- Applications should be for positions you are genuinely interested in
- Providing false information in applications is prohibited
- You may not use automated tools to mass-apply to positions

## 5. Content

### User-Generated Content
Users may post content such as resumes, cover letters, and job descriptions. You retain ownership of your content but grant us a license to use it for providing our services.

### Prohibited Content
You may not post content that is:
- Illegal, harmful, or threatening
- Discriminatory or hateful
- Fraudulent or deceptive
- In violation of intellectual property rights

## 6. Intellectual Property

CareerHub and its original content, features, and functionality are owned by CareerHub Inc. and are protected by international copyright, trademark, and other intellectual property laws.

## 7. Limitation of Liability

CareerHub is not responsible for:
- The accuracy of job postings or employer information
- The outcome of job applications
- Any loss or damage arising from use of our services
- Third-party content or websites linked from our platform

## 8. Termination

We may terminate or suspend your account at any time for violation of these terms. You may delete your account at any time by contacting us.

## 9. Governing Law

These terms are governed by the laws of the State of California, without regard to conflict of law principles.

## 10. Contact

For questions about these Terms of Service, please contact us at:
- **Email:** legal@careerhub.com
- **Address:** CareerHub Inc., 123 Career Street, San Francisco, CA 94102`}
      />
    </div>
  );
}

function CookiesView() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
      <LegalPage
        title="Cookie Policy"
        content={`# Cookie Policy for CareerHub

**Last updated:** January 2025

## 1. What Are Cookies?

Cookies are small text files stored on your device when you visit a website. They help us provide you with a better experience by remembering your preferences and enabling core functionality.

## 2. Types of Cookies We Use

### Essential Cookies
These cookies are necessary for the website to function properly:
- **Session cookies** to maintain your login state
- **CSRF tokens** for security
- **Preference cookies** to remember your settings

### Analytics Cookies
These cookies help us understand how visitors interact with our website:
- Google Analytics (_ga, _gid)
- Page view tracking
- User behavior analysis

### Advertising Cookies
These cookies are used to deliver relevant advertisements:
- Google AdSense cookies
- Retargeting cookies
- Conversion tracking cookies

### Functional Cookies
These cookies enable enhanced functionality:
- Remember search preferences
- Recently viewed jobs
- Saved filter settings

## 3. Managing Cookies

### Browser Settings
You can control cookies through your browser settings:
- **Chrome:** Settings > Privacy and Security > Cookies
- **Firefox:** Options > Privacy & Security > Cookies
- **Safari:** Preferences > Privacy > Cookies

### Opt-Out Links
- [Google Analytics Opt-out](https://tools.google.com/dlpage/gaoptout)
- [Google Ad Settings](https://adssettings.google.com)

## 4. Third-Party Cookies

Some cookies are set by third-party services that appear on our pages:
- **Google Analytics** for website analytics
- **Google AdSense** for advertising
- **Social media plugins** for sharing features

## 5. Updates to This Policy

We may update this Cookie Policy from time to time. Changes will be posted on this page with an updated "Last updated" date.

## 6. Contact Us

If you have questions about our use of cookies, please contact us at:
- **Email:** privacy@careerhub.com`}
      />
    </div>
  );
}

// ==================== MAIN APP ====================
export default function CareerHubApp() {
  const { currentView, selectedJobId, selectedPostSlug } = useAppStore();
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const renderView = () => {
    switch (currentView) {
      case 'home':
        return <HomeView />;
      case 'jobs':
        return <JobsView />;
      case 'job-detail':
        return selectedJobId ? <JobDetail jobId={selectedJobId} /> : <JobsView />;
      case 'job-alerts':
        return <JobAlertsView />;
      case 'blog':
        return <BlogView />;
      case 'blog-detail':
        return selectedPostSlug ? <BlogDetail postSlug={selectedPostSlug} /> : <BlogView />;
      case 'admin':
      case 'admin-jobs':
      case 'admin-blog':
      case 'admin-applications':
        return <AdminDashboard />;
      case 'legal-privacy':
        return <PrivacyView />;
      case 'legal-terms':
        return <TermsView />;
      case 'legal-cookies':
        return <CookiesView />;
      default:
        return <HomeView />;
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentView}
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            {renderView()}
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer />

      {/* Scroll to top button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 z-50 flex h-10 w-10 items-center justify-center rounded-full bg-emerald-600 text-white shadow-lg transition-colors hover:bg-emerald-700"
            aria-label="Scroll to top"
          >
            <ArrowUp className="h-5 w-5" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
