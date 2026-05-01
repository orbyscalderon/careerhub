'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Briefcase,
  Menu,
  X,
  LogIn,
  LogOut,
  LayoutDashboard,
  User,
  ChevronDown,
} from 'lucide-react';
import { useAppStore } from '@/lib/store';
import { isAdmin } from '@/lib/auth';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import LoginDialog from './LoginDialog';

const NAV_LINKS = [
  { label: 'Home', view: 'home' as const },
  { label: 'Find Jobs', view: 'jobs' as const },
  { label: 'Blog', view: 'blog' as const },
  { label: 'Job Alerts', view: 'job-alerts' as const },
];

export default function Header() {
  const { user, logout, navigate, currentView, mobileMenuOpen, setMobileMenuOpen } = useAppStore();
  const [loginOpen, setLoginOpen] = useState(false);

  const handleNav = (view: string) => {
    if (view === 'job-alerts') {
      navigate('home');
    } else {
      navigate(view as any);
    }
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo */}
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

          {/* Desktop Nav */}
          <nav className="hidden items-center gap-1 md:flex">
            {NAV_LINKS.map((link) => (
              <Button
                key={link.view}
                variant={currentView === link.view ? 'secondary' : 'ghost'}
                size="sm"
                onClick={() => handleNav(link.view)}
                className="text-sm font-medium"
              >
                {link.label}
              </Button>
            ))}
          </nav>

          {/* Auth Section */}
          <div className="flex items-center gap-3">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative flex items-center gap-2 pl-2 pr-3">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-emerald-100 text-emerald-700 text-xs font-semibold">
                        {user.name?.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) || user.email[0].toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <span className="hidden text-sm font-medium sm:inline-block">
                      {user.name || user.email}
                    </span>
                    <ChevronDown className="h-4 w-4 text-muted-foreground" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <div className="flex items-center gap-2 p-2">
                    <Avatar className="h-9 w-9">
                      <AvatarFallback className="bg-emerald-100 text-emerald-700 text-sm font-semibold">
                        {user.name?.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) || user.email[0].toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <span className="text-sm font-medium">{user.name || 'User'}</span>
                      <span className="text-xs text-muted-foreground">{user.email}</span>
                    </div>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    <span>Profile</span>
                    <span className="ml-auto rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-semibold text-emerald-700">
                      {user.role}
                    </span>
                  </DropdownMenuItem>
                  {isAdmin(user) && (
                    <DropdownMenuItem
                      onClick={() => navigate('admin')}
                      className="flex items-center gap-2 text-emerald-600"
                    >
                      <LayoutDashboard className="h-4 w-4" />
                      <span>Admin Dashboard</span>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={logout}
                    className="flex items-center gap-2 text-red-600 focus:text-red-600"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Log Out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button
                onClick={() => setLoginOpen(true)}
                size="sm"
                className="hidden sm:flex bg-emerald-600 hover:bg-emerald-700 text-white"
              >
                <LogIn className="mr-2 h-4 w-4" />
                Sign In
              </Button>
            )}

            {/* Mobile menu */}
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-72">
                <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                <div className="flex flex-col gap-4 pt-6">
                  {/* Mobile Logo */}
                  <div className="flex items-center gap-2 pb-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-600 text-white">
                      <Briefcase className="h-4 w-4" />
                    </div>
                    <span className="text-lg font-bold">
                      Career<span className="text-emerald-600">Hub</span>
                    </span>
                  </div>

                  <Separator />

                  {/* Mobile Nav Links */}
                  <nav className="flex flex-col gap-1">
                    {NAV_LINKS.map((link) => (
                      <Button
                        key={link.view}
                        variant={currentView === link.view ? 'secondary' : 'ghost'}
                        className="justify-start"
                        onClick={() => handleNav(link.view)}
                      >
                        {link.label}
                      </Button>
                    ))}
                  </nav>

                  <Separator />

                  {/* Mobile Auth */}
                  {user ? (
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center gap-3 px-2">
                        <Avatar className="h-10 w-10">
                          <AvatarFallback className="bg-emerald-100 text-emerald-700 text-sm font-semibold">
                            {user.name?.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) || user.email[0].toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium">{user.name || 'User'}</p>
                          <p className="text-xs text-muted-foreground">{user.email}</p>
                        </div>
                      </div>
                      {isAdmin(user) && (
                        <Button
                          variant="outline"
                          className="mt-1 justify-start text-emerald-600"
                          onClick={() => {
                            navigate('admin');
                            setMobileMenuOpen(false);
                          }}
                        >
                          <LayoutDashboard className="mr-2 h-4 w-4" />
                          Admin Dashboard
                        </Button>
                      )}
                      <Button
                        variant="outline"
                        className="mt-1 justify-start text-red-600"
                        onClick={() => {
                          logout();
                          setMobileMenuOpen(false);
                        }}
                      >
                        <LogOut className="mr-2 h-4 w-4" />
                        Log Out
                      </Button>
                    </div>
                  ) : (
                    <Button
                      onClick={() => {
                        setLoginOpen(true);
                        setMobileMenuOpen(false);
                      }}
                      className="bg-emerald-600 hover:bg-emerald-700 text-white"
                    >
                      <LogIn className="mr-2 h-4 w-4" />
                      Sign In
                    </Button>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      <LoginDialog open={loginOpen} onOpenChange={setLoginOpen} />
    </>
  );
}
