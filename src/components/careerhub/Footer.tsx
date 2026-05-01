'use client';

import { useState } from 'react';
import { Briefcase, Mail, Github, Twitter, Linkedin, Heart, ArrowRight } from 'lucide-react';
import { useAppStore } from '@/lib/store';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';

const FOOTER_LINKS = {
  Company: [
    { label: 'About', action: 'legal-privacy' as const },
    { label: 'Blog', action: 'blog' as const },
    { label: 'Careers', action: 'jobs' as const },
  ],
  Legal: [
    { label: 'Privacy Policy', action: 'legal-privacy' as const },
    { label: 'Terms of Service', action: 'legal-terms' as const },
    { label: 'Cookie Policy', action: 'legal-cookies' as const },
  ],
  Resources: [
    { label: 'Find Jobs', action: 'jobs' as const },
    { label: 'Job Alerts', action: 'home' as const },
    { label: 'Categories', action: 'jobs' as const },
  ],
};

const SOCIAL_LINKS = [
  { icon: Twitter, label: 'Twitter', href: '#' },
  { icon: Linkedin, label: 'LinkedIn', href: '#' },
  { icon: Github, label: 'GitHub', href: '#' },
];

export default function Footer() {
  const { navigate } = useAppStore();
  const [alertEmail, setAlertEmail] = useState('');
  const [alertLoading, setAlertLoading] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!alertEmail.trim()) return;
    setAlertLoading(true);
    try {
      const res = await fetch('/api/subscriptions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: alertEmail, name: '', frequency: 'WEEKLY', categories: [] }),
      });
      if (res.ok) {
        toast.success('Subscribed! You\'ll receive job alerts at ' + alertEmail);
        setAlertEmail('');
      } else {
        toast.error('Failed to subscribe. Please try again.');
      }
    } catch {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setAlertLoading(false);
    }
  };

  return (
    <footer className="border-t bg-muted/30">
      {/* Newsletter Section */}
      <div className="bg-emerald-600 text-white">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center gap-6 md:flex-row md:justify-between">
            <div className="text-center md:text-left">
              <h3 className="text-xl font-bold">Never Miss a Job Opportunity</h3>
              <p className="mt-1 text-emerald-100">
                Subscribe to job alerts and get the best opportunities delivered to your inbox.
              </p>
            </div>
            <form onSubmit={handleSubscribe} className="flex w-full max-w-md gap-2">
              <Input
                type="email"
                placeholder="Enter your email"
                value={alertEmail}
                onChange={(e) => setAlertEmail(e.target.value)}
                required
                className="border-white/20 bg-white/10 text-white placeholder:text-emerald-200 focus:border-white focus:ring-white/20"
              />
              <Button
                type="submit"
                disabled={alertLoading}
                className="bg-white text-emerald-700 hover:bg-emerald-50 shrink-0"
              >
                {alertLoading ? '...' : <><Mail className="mr-2 h-4 w-4" />Subscribe</>}
              </Button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <button
              onClick={() => navigate('home')}
              className="flex items-center gap-2 transition-opacity hover:opacity-80"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-600 text-white">
                <Briefcase className="h-5 w-5" />
              </div>
              <span className="text-xl font-bold tracking-tight">
                Career<span className="text-emerald-600">Hub</span>
              </span>
            </button>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
              Your gateway to finding the perfect career opportunity. Connecting talented
              professionals with top companies worldwide.
            </p>
            <div className="mt-4 flex gap-3">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-muted text-muted-foreground transition-colors hover:bg-emerald-100 hover:text-emerald-700"
                >
                  <social.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Link Groups */}
          {Object.entries(FOOTER_LINKS).map(([group, links]) => (
            <div key={group}>
              <h4 className="text-sm font-semibold uppercase tracking-wider text-foreground">
                {group}
              </h4>
              <ul className="mt-4 space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <button
                      onClick={() => navigate(link.action)}
                      className="text-sm text-muted-foreground transition-colors hover:text-emerald-600"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Separator className="my-8" />

        {/* Bottom */}
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} CareerHub. All rights reserved.
          </p>
          <p className="flex items-center gap-1 text-sm text-muted-foreground">
            Made with <Heart className="h-3.5 w-3.5 fill-red-500 text-red-500" /> for job seekers
          </p>
        </div>
      </div>
    </footer>
  );
}
