import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Eye, EyeOff, ArrowRight } from 'lucide-react';
import { OnboardingShell } from '../OnboardingShell';
import { AIScapeIndicator } from '../AIScapeIndicator';

const FREE_PROVIDERS = ['gmail.com', 'outlook.com', 'yahoo.com', 'hotmail.com', 'icloud.com'];
const DOMAIN_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const schema = z.object({
  firstName: z.string().min(2, 'Required'),
  lastName: z.string().min(2, 'Required'),
  email: z.string().email('Enter a valid work email'),
  password: z.string().min(8, 'Min 8 characters').regex(/[A-Z]/, 'Needs uppercase').regex(/[a-z]/, 'Needs lowercase').regex(/[0-9]/, 'Needs a number'),
  confirmPassword: z.string(),
}).refine((d) => d.password === d.confirmPassword, { message: "Passwords don't match", path: ['confirmPassword'] });

type FormValues = z.infer<typeof schema>;

export function RLRegister() {
  const navigate = useNavigate();
  const [showPw, setShowPw] = useState(false);
  const [showCpw, setShowCpw] = useState(false);
  const [aiDomain, setAiDomain] = useState<string | null>(null);

  const { register, handleSubmit, formState: { errors }, watch } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const emailValue = watch('email', '');

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (DOMAIN_REGEX.test(val)) {
      const domain = val.split('@')[1];
      if (!FREE_PROVIDERS.includes(domain.toLowerCase())) {
        setAiDomain(domain);
        localStorage.setItem('onboardingDomain', domain);
        return;
      }
    }
    setAiDomain(null);
  };

  const onSubmit = () => {
    navigate('/onboarding/company-pitch');
  };

  const inputCls = 'w-full px-[13px] py-[10px] border-[0.5px] border-[#ddd] rounded-[10px] text-[13px] outline-none transition-all focus:border-[#7800D3] focus:shadow-[0_0_0_3px_rgba(120,0,211,0.08)]';

  return (
    <OnboardingShell
      leftPanel={{
        eyebrow: 'Getting started',
        headline: 'Hire smarter, <span class="text-[#c084fc]">not harder.</span>',
        body: 'Set up your account and the AI takes it from here — your first recruitment brief will be ready in minutes.',
        steps: [
          { label: 'Create your account', status: 'current' },
          { label: 'Review your pitch', status: 'locked' },
          { label: 'Invite your team', status: 'locked' },
        ],
      }}
      footer={{
        dots: { total: 3, active: 1 },
        right: (
          <button
            type="submit"
            form="rl-register-form"
            className="bg-[#7800D3] text-white rounded-[10px] px-6 py-[10px] text-[13px] font-medium hover:opacity-90 transition-opacity inline-flex items-center gap-1.5"
          >
            Continue
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        ),
      }}
    >
      <div className="max-w-md">
        <h1 className="font-sora text-[22px] font-semibold text-[#0e0020] mb-1">Create your account</h1>
        <p className="text-[13px] text-[#888] mb-6">Enter your work email — we'll use your domain to learn about your company.</p>

        <form id="rl-register-form" onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-[0.06em] text-[#444] mb-1">First name</label>
              <input {...register('firstName')} placeholder="Kavita" className={inputCls} />
              {errors.firstName && <p className="text-[11px] text-red-500 mt-1">{errors.firstName.message}</p>}
            </div>
            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-[0.06em] text-[#444] mb-1">Last name</label>
              <input {...register('lastName')} placeholder="Rao" className={inputCls} />
              {errors.lastName && <p className="text-[11px] text-red-500 mt-1">{errors.lastName.message}</p>}
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-semibold uppercase tracking-[0.06em] text-[#444] mb-1">Work email</label>
            <input
              {...register('email')}
              onChange={(e) => { register('email').onChange(e); handleEmailChange(e); }}
              type="email"
              placeholder="you@yourcompany.com"
              className={inputCls}
            />
            {errors.email && <p className="text-[11px] text-red-500 mt-1">{errors.email.message}</p>}
            {aiDomain && <AIScapeIndicator domain={aiDomain} />}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-[0.06em] text-[#444] mb-1">Password</label>
              <div className="relative">
                <input
                  {...register('password')}
                  type={showPw ? 'text' : 'password'}
                  placeholder="Min 8 characters"
                  className={`${inputCls} pr-9`}
                />
                <button type="button" onClick={() => setShowPw(!showPw)} className="absolute inset-y-0 right-0 px-3 text-[#aaa] hover:text-[#666]">
                  {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {errors.password && <p className="text-[11px] text-red-500 mt-1">{errors.password.message}</p>}
            </div>
            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-[0.06em] text-[#444] mb-1">Confirm password</label>
              <div className="relative">
                <input
                  {...register('confirmPassword')}
                  type={showCpw ? 'text' : 'password'}
                  placeholder="Repeat password"
                  className={`${inputCls} pr-9`}
                />
                <button type="button" onClick={() => setShowCpw(!showCpw)} className="absolute inset-y-0 right-0 px-3 text-[#aaa] hover:text-[#666]">
                  {showCpw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {errors.confirmPassword && <p className="text-[11px] text-red-500 mt-1">{errors.confirmPassword.message}</p>}
            </div>
          </div>
        </form>
      </div>
    </OnboardingShell>
  );
}

export default RLRegister;
