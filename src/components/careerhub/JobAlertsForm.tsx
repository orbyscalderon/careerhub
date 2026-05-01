'use client';

import { useState } from 'react';
import { Bell, Mail, User, CheckCircle2, Loader2 } from 'lucide-react';
import { JOB_CATEGORIES } from '@/lib/helpers';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { toast } from 'sonner';

export default function JobAlertsForm() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    frequency: 'WEEKLY' as string,
    categories: [] as string[],
  });

  const handleCategoryToggle = (category: string) => {
    setFormData((prev) => ({
      ...prev,
      categories: prev.categories.includes(category)
        ? prev.categories.filter((c) => c !== category)
        : [...prev.categories, category],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email.trim()) {
      toast.error('Please enter your email address');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/subscriptions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setSuccess(true);
        toast.success('Job alert subscription confirmed!');
      } else {
        const data = await res.json().catch(() => ({}));
        toast.error(data.error || 'Failed to subscribe. Please try again.');
      }
    } catch {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <Card className="max-w-2xl mx-auto">
        <CardContent className="flex flex-col items-center gap-4 py-12">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100">
            <CheckCircle2 className="h-8 w-8 text-emerald-600" />
          </div>
          <div className="text-center">
            <h3 className="text-lg font-semibold">You&apos;re All Set!</h3>
            <p className="mt-1 max-w-sm text-sm text-muted-foreground">
              Job alerts will be sent to <strong>{formData.email}</strong>{' '}
              {formData.frequency !== 'DAILY' && `every ${formData.frequency.toLowerCase()}`}.
              {formData.categories.length > 0 &&
                ` You'll receive alerts for: ${formData.categories.join(', ')}.`}
            </p>
          </div>
          <Button
            variant="outline"
            onClick={() => {
              setSuccess(false);
              setFormData({ email: '', name: '', frequency: 'WEEKLY', categories: [] });
            }}
          >
            Set Up Another Alert
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50">
            <Bell className="h-5 w-5 text-emerald-600" />
          </div>
          <div>
            <CardTitle className="text-xl">Job Alerts</CardTitle>
            <CardDescription>Get notified when new jobs match your preferences.</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="alert-email" className="flex items-center gap-1.5">
              <Mail className="h-3.5 w-3.5" />
              Email Address *
            </Label>
            <Input
              id="alert-email"
              type="email"
              placeholder="your@email.com"
              value={formData.email}
              onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
              required
            />
          </div>

          {/* Name (optional) */}
          <div className="space-y-2">
            <Label htmlFor="alert-name" className="flex items-center gap-1.5">
              <User className="h-3.5 w-3.5" />
              Name <span className="text-muted-foreground font-normal">(optional)</span>
            </Label>
            <Input
              id="alert-name"
              type="text"
              placeholder="John Doe"
              value={formData.name}
              onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
            />
          </div>

          {/* Frequency */}
          <div className="space-y-2">
            <Label>Frequency</Label>
            <Select
              value={formData.frequency}
              onValueChange={(val) => setFormData((prev) => ({ ...prev, frequency: val }))}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="DAILY">Daily</SelectItem>
                <SelectItem value="WEEKLY">Weekly</SelectItem>
                <SelectItem value="MONTHLY">Monthly</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Categories */}
          <div className="space-y-3">
            <Label>Preferred Categories</Label>
            <p className="text-xs text-muted-foreground">Select the categories you&apos;re interested in.</p>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              {JOB_CATEGORIES.map((cat) => (
                <label
                  key={cat}
                  className="flex items-center gap-2 rounded-lg border px-3 py-2 cursor-pointer transition-colors hover:bg-muted/50 has-[button[data-state=checked]]:border-emerald-300 has-[button[data-state=checked]]:bg-emerald-50"
                >
                  <Checkbox
                    checked={formData.categories.includes(cat)}
                    onCheckedChange={() => handleCategoryToggle(cat)}
                    className="data-[state=checked]:border-emerald-600 data-[state=checked]:bg-emerald-600"
                  />
                  <span className="text-sm">{cat}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Submit */}
          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Subscribing...
              </>
            ) : (
              <>
                <Bell className="mr-2 h-4 w-4" />
                Subscribe to Job Alerts
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
