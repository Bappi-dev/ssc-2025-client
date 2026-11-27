"use client"
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  GraduationCap,
  ArrowRight,
} from 'lucide-react';
import { toast } from '@/components/ui/toast';
import { signUp } from '@/lib/auth-client';

export default function SignUpPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (error) setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.email.trim() || !formData.password) {
      setError('Please fill out all required fields.');
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    setLoading(true);

      try {
      const { data, error: authError } = await signUp.email({
        email: formData.email,
        password: formData.password,
        name: formData.name,
        callbackURL: "/"
      });

      if (data) {
        toast.add({
          description: "Sign Up successful!",
          type: "success",
        });
        router.push("/");
      }

      if (authError) {
        setError(authError.message || "Failed to create account. Please try again.");
        toast.add({
          description: authError.message || "Registration failed!",
          type: "error",
        });
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
      console.log(err);
    } 

  };

  return (
    <section className="flex min-h-[calc(100vh-80px)] items-center justify-center bg-slate-50/70 px-4 py-12">
      <div className="w-full max-w-md overflow-hidden rounded-3xl border border-[#101B35]/10 bg-white shadow-[0_20px_50px_rgba(16,27,53,0.10)]">
        {/* Header */}
        <div className="bg-[#101B35] px-8 py-7 text-center text-white">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#F6D978] to-[#B68A20] text-[#101B35] shadow-lg">
            <GraduationCap size={26} strokeWidth={2.2} />
          </div>
          <h1 className="text-xl font-extrabold tracking-wide">Create Account</h1>
          <p className="mt-1 text-xs text-slate-300">
            Join the <span className="font-semibold text-[#F6D978]">SHERUA ADARSHA HIGH SCHOOL</span> portal
          </p>
        </div>
        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 p-8">
          {error && (
            <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-2.5 text-xs font-medium text-red-600">
              {error}
            </div>
          )}
          {/* Name */}
          <div>
            <label className="mb-1.5 block text-xs font-bold text-[#101B35]">Full Name</label>
            <div className="relative">
              <Mail
                size={17}
                className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="John Doe"
                className="w-full rounded-xl border border-[#101B35]/15 bg-slate-50/50 py-2.5 pl-10 pr-4 text-sm text-[#101B35] outline-none transition focus:border-[#D4AF37] focus:bg-white focus:ring-2 focus:ring-[#D4AF37]/20"
              />
            </div>
          </div>
          {/* Email */}
          <div>
            <label className="mb-1.5 block text-xs font-bold text-[#101B35]">Email Address</label>
            <div className="relative">
              <Mail
                size={17}
                className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="example@email.com"
                className="w-full rounded-xl border border-[#101B35]/15 bg-slate-50/50 py-2.5 pl-10 pr-4 text-sm text-[#101B35] outline-none transition focus:border-[#D4AF37] focus:bg-white focus:ring-2 focus:ring-[#D4AF37]/20"
              />
            </div>
          </div>
          {/* Password */}
          <div>
            <label className="mb-1.5 block text-xs font-bold text-[#101B35]">Password</label>
            <div className="relative">
              <Lock
                size={17}
                className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                required
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full rounded-xl border border-[#101B35]/15 bg-slate-50/50 py-2.5 pl-10 pr-10 text-sm text-[#101B35] outline-none transition focus:border-[#D4AF37] focus:bg-white focus:ring-2 focus:ring-[#D4AF37]/20"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                aria-label="Toggle password visibility"
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-[#101B35]"
              >
                {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
              </button>
            </div>
          </div>
          {/* Confirm Password */}
          <div>
            <label className="mb-1.5 block text-xs font-bold text-[#101B35]">Confirm Password</label>
            <div className="relative">
              <Lock
                size={17}
                className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                type={showPassword ? 'text' : 'password'}
                name="confirmPassword"
                required
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full rounded-xl border border-[#101B35]/15 bg-slate-50/50 py-2.5 pl-10 pr-10 text-sm text-[#101B35] outline-none transition focus:border-[#D4AF37] focus:bg-white focus:ring-2 focus:ring-[#D4AF37]/20"
              />
            </div>
          </div>
          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#F6D978] to-[#C69A2B] py-3 text-sm font-bold text-[#101B35] shadow-lg shadow-[#D4AF37]/20 transition duration-300 hover:-translate-y-0.5 hover:shadow-[#D4AF37]/35 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? 'Creating Account...' : 'Sign Up'}
            {!loading && <ArrowRight size={17} />}
          </button>
          {/* Already have account */}
          <p className="pt-2 text-center text-xs text-slate-600">
            Already have an account?{' '}
            <Link href="/sign-in" className="font-bold text-[#9A7617] underline-offset-4 hover:underline">
              Sign In
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
}
