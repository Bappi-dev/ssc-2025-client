import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { GraduationCap } from 'lucide-react';

export default function HeadmasterPage() {
  return (
    <section className="flex min-h-[calc(100vh-80px)] items-center justify-center bg-slate-50/70 px-4 py-12">
      <div className="grid w-full max-w-4xl gap-6 lg:grid-cols-2">
        {/* Card 1: Overview */}
        <Card className="border border-[#101B35]/10 bg-[#10264A] shadow-[0_10px_30px_rgba(16,27,53,0.1)]">
          <CardHeader className="flex flex-col items-center space-y-2">
            <GraduationCap size={48} className="text-[#F6D978]" />
            <CardTitle className="text-2xl font-bold text-white">Headmaster</CardTitle>
          </CardHeader>
          <CardContent className="text-center text-slate-300">
            <p className="mb-4">
              Welcome to the Headmaster dashboard. Manage school‑wide settings, oversee teachers
              and students, and view key statistics.
            </p>
          </CardContent>
        </Card>
        {/* Card 2: Quick Actions */}
        <Card className="border border-[#101B35]/10 bg-[#10264A] shadow-[0_10px_30px_rgba(16,27,53,0.1)]">
          <CardHeader className="flex flex-col items-center space-y-2">
            <GraduationCap size={36} className="text-[#D4AF37]" />
            <CardTitle className="text-xl font-semibold text-white">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-3 text-center text-slate-300">
            <ul className="list-disc list-inside">
              <li>Review pending admissions</li>
              <li>Approve teacher schedules</li>
              <li>Generate end‑of‑year report</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
