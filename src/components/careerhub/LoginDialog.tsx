'use client';

import { motion } from 'framer-motion';
import { Shield, Building2, UserCircle, ArrowRight } from 'lucide-react';
import { DEMO_ACCOUNTS } from '@/lib/auth';
import { useAppStore } from '@/lib/store';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';

interface LoginDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ACCOUNT_OPTIONS = [
  {
    key: 'admin@careerhub.com',
    role: 'Admin',
    description: 'Full access to manage jobs, blog posts, and applications.',
    icon: Shield,
    color: 'text-rose-600 bg-rose-50',
  },
  {
    key: 'employer@techcorp.com',
    role: 'Employer',
    description: 'Post and manage job listings for your company.',
    icon: Building2,
    color: 'text-amber-600 bg-amber-50',
  },
  {
    key: 'candidate@email.com',
    role: 'Candidate',
    description: 'Browse jobs, apply to positions, and set alerts.',
    icon: UserCircle,
    color: 'text-emerald-600 bg-emerald-50',
  },
];

export default function LoginDialog({ open, onOpenChange }: LoginDialogProps) {
  const { login } = useAppStore();

  const handleLogin = (email: string) => {
    const account = DEMO_ACCOUNTS[email];
    if (account) {
      login(account);
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-xl">Welcome to CareerHub</DialogTitle>
          <DialogDescription className="text-center">
            Choose a demo account to explore the platform.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-3 pt-2">
          {ACCOUNT_OPTIONS.map((option) => (
            <motion.div
              key={option.key}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
            >
              <Card
                className="cursor-pointer transition-all hover:shadow-md hover:border-emerald-200"
                onClick={() => handleLogin(option.key)}
              >
                <CardContent className="flex items-center gap-4 p-4">
                  <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${option.color}`}>
                    <option.icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="font-semibold text-sm">{option.role}</p>
                      <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
                        Demo
                      </span>
                    </div>
                    <p className="mt-0.5 text-xs text-muted-foreground line-clamp-1">
                      {option.description}
                    </p>
                  </div>
                  <ArrowRight className="h-4 w-4 text-muted-foreground shrink-0" />
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
        <p className="text-center text-xs text-muted-foreground pt-1">
          This is a demo environment. No real authentication required.
        </p>
      </DialogContent>
    </Dialog>
  );
}
