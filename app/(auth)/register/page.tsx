'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Scale, Building2, User, Users, CheckCircle2, ArrowRight, ArrowLeft, Eye, EyeOff, Plus, Trash2 } from 'lucide-react';
import { MotionWrapper } from '@/components/shared/MotionWrapper';
import { toast } from 'sonner';

// Password Regex: 1 upper, 1 lower, 1 number, 1 special (!@#$%^&*)
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#\$%\^&\*]).{8,}$/;

const getPasswordStrength = (pass: string) => {
    let score = 0;
    if (!pass) return score;
    if (pass.length >= 8) score++;
    if (/[A-Z]/.test(pass) && /[a-z]/.test(pass)) score++;
    if (/\d/.test(pass)) score++;
    if (/[!@#\$%\^&\*]/.test(pass)) score++;
    return score;
};

const registerSchema = z.object({
  entity_type: z.enum(['individual', 'partnership', 'company']),
  
  // INDIVIDUAL FIELDS
  ind_name: z.string().optional(),
  ind_nationality: z.string().optional(),
  ind_national_id: z.string().optional(),
  ind_dob: z.string().optional(),
  ind_biz_name: z.string().optional(),
  ind_nature: z.string().optional(),
  ind_address: z.string().optional(),
  ind_city: z.string().optional(),
  ind_region: z.string().optional(),
  ind_country: z.string().optional(),
  ind_postal: z.string().optional(),
  ind_phone: z.string().optional(),
  ind_phone2: z.string().optional(),
  ind_email: z.string().optional(),
  ind_website: z.string().optional(),

  // PARTNERSHIP FIELDS
  part_biz_name: z.string().optional(),
  part_nature: z.string().optional(),
  part_address: z.string().optional(),
  part_city: z.string().optional(),
  part_region: z.string().optional(),
  part_country: z.string().optional(),
  part_postal: z.string().optional(),
  part_phone: z.string().optional(),
  part_email: z.string().optional(),
  part_website: z.string().optional(),
  partners: z.array(z.object({
      name: z.string().min(3, "Min 3 chars"),
      nationality: z.string().min(2, "Required"),
      national_id: z.string().min(6, "Min 6 chars"),
      phone: z.string().regex(/^\+255\d{9}$/, "Format: +255XXXXXXXXX"),
      email: z.string().email("Valid email required"),
      address: z.string().min(10, "Min 10 chars")
  })).optional(),

  // COMPANY FIELDS
  comp_name: z.string().optional(),
  comp_country_inc: z.string().optional(),
  comp_reg_no: z.string().optional(),
  comp_date_inc: z.string().optional(),
  comp_nature: z.string().optional(),
  comp_address: z.string().optional(),
  comp_city: z.string().optional(),
  comp_region: z.string().optional(),
  comp_country: z.string().optional(),
  comp_postal: z.string().optional(),
  comp_phone: z.string().optional(),
  comp_email: z.string().optional(),
  comp_website: z.string().optional(),
  comp_contact_name: z.string().optional(),
  comp_contact_title: z.string().optional(),
  comp_contact_phone: z.string().optional(),
  comp_contact_email: z.string().optional(),
  comp_contact_id: z.string().optional(),

  // SECURITY FIELDS
  login_email: z.string().email("Valid email required"),
  password: z.string().regex(passwordRegex, "Must contain uppercase, lowercase, number, and special character"),
  confirm_password: z.string(),
  terms: z.boolean().refine(val => val === true, "Must accept terms"),
  privacy: z.boolean().refine(val => val === true, "Must accept privacy policy")
}).superRefine((data, ctx) => {
    
    // Cross-field step 2 validation
    if (data.entity_type === 'individual') {
        if (!data.ind_name || data.ind_name.length < 3) ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Min 3 chars required", path: ['ind_name']});
        if (!data.ind_nationality) ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Required", path: ['ind_nationality']});
        if (!data.ind_national_id || data.ind_national_id.length < 6) ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Min 6 chars", path: ['ind_national_id']});
        if (!data.ind_dob) ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Required", path: ['ind_dob']}); 
        if (!data.ind_biz_name || data.ind_biz_name.length < 2) ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Min 2 chars", path: ['ind_biz_name']});
        if (!data.ind_nature || data.ind_nature.length < 30) ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Min 30 chars", path: ['ind_nature']});
        if (!data.ind_address || data.ind_address.length < 10) ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Min 10 chars", path: ['ind_address']});
        if (!data.ind_city) ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Required", path: ['ind_city']});
        if (!data.ind_region) ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Required", path: ['ind_region']});
        if (!data.ind_country) ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Required", path: ['ind_country']});
        if (!data.ind_phone || !/^\+255\d{9}$/.test(data.ind_phone)) ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Format +255XXXXXXXXX", path: ['ind_phone']});
        if (!data.ind_email || !/^.+@.+\..+$/.test(data.ind_email)) ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Valid email required", path: ['ind_email']});
    }

    if (data.entity_type === 'partnership') {
        if (!data.part_biz_name || data.part_biz_name.length < 3) ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Min 3 chars", path: ['part_biz_name']});
        if (!data.part_nature || data.part_nature.length < 30) ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Min 30 chars", path: ['part_nature']});
        if (!data.part_address || data.part_address.length < 10) ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Min 10 chars", path: ['part_address']});
        if (!data.part_city) ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Required", path: ['part_city']});
        if (!data.part_region) ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Required", path: ['part_region']});
        if (!data.part_country) ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Required", path: ['part_country']});
        if (!data.part_phone || !/^\+255\d{9}$/.test(data.part_phone)) ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Format +255XXXXXXXXX", path: ['part_phone']});
        if (!data.part_email || !/^.+@.+\..+$/.test(data.part_email)) ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Valid email", path: ['part_email']});
        if (!data.partners || data.partners.length < 2) ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Min 2 partners required", path: ['partners']});
    }

    if (data.entity_type === 'company') {
        if (!data.comp_name || data.comp_name.length < 3) ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Min 3 chars", path: ['comp_name']});
        if (!data.comp_country_inc) ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Required", path: ['comp_country_inc']});
        if (!data.comp_reg_no || data.comp_reg_no.length < 5) ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Min 5 chars", path: ['comp_reg_no']});
        if (!data.comp_date_inc) ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Required", path: ['comp_date_inc']});
        if (!data.comp_nature || data.comp_nature.length < 30) ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Min 30 chars", path: ['comp_nature']});
        if (!data.comp_address || data.comp_address.length < 10) ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Min 10 chars", path: ['comp_address']});
        if (!data.comp_city) ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Required", path: ['comp_city']});
        if (!data.comp_region) ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Required", path: ['comp_region']});
        if (!data.comp_country) ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Required", path: ['comp_country']});
        if (!data.comp_phone || !/^\+\d{10,14}$/.test(data.comp_phone.replace(/\s+/g,''))) ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Include country code", path: ['comp_phone']});
        if (!data.comp_email || !/^.+@.+\..+$/.test(data.comp_email)) ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Valid email required", path: ['comp_email']});
        if (!data.comp_contact_name || data.comp_contact_name.length < 3) ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Min 3 chars", path: ['comp_contact_name']});
        if (!data.comp_contact_title) ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Required", path: ['comp_contact_title']});
        if (!data.comp_contact_phone || !/^\+255\d{9}$/.test(data.comp_contact_phone)) ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Format +255XXXXXXXXX", path: ['comp_contact_phone']});
        if (!data.comp_contact_email || !/^.+@.+\..+$/.test(data.comp_contact_email)) ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Valid email", path: ['comp_contact_email']});
        if (!data.comp_contact_id || data.comp_contact_id.length < 6) ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Min 6 chars", path: ['comp_contact_id']});
    }

    if (data.password !== data.confirm_password) {
        ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Passwords do not match", path: ['confirm_password'] });
    }
});

type FormValues = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const { register, control, handleSubmit, watch, trigger, setValue, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: { 
        entity_type: 'company', 
        terms: false, 
        privacy: false,
        partners: [{ name: '', nationality: '', national_id: '', phone: '', email: '', address: '' }]
    }
  });

  const { fields, append, remove } = useFieldArray({
      control,
      name: "partners"
  });

  const entityType = watch('entity_type');
  const password = watch('password');
  const strength = getPasswordStrength(password);

  const handleNext = async () => {
      let fieldsToValidate: any = [];
      if (step === 1) {
          fieldsToValidate = ['entity_type'];
      } else if (step === 2) {
          if (entityType === 'individual') {
              fieldsToValidate = ['ind_name', 'ind_nationality', 'ind_national_id', 'ind_dob', 'ind_biz_name', 'ind_nature', 'ind_address', 'ind_city', 'ind_region', 'ind_country', 'ind_phone', 'ind_email'];
          } else if (entityType === 'partnership') {
              fieldsToValidate = ['part_biz_name', 'part_nature', 'part_address', 'part_city', 'part_region', 'part_country', 'part_phone', 'part_email', 'partners'];
          } else if (entityType === 'company') {
              fieldsToValidate = ['comp_name', 'comp_country_inc', 'comp_reg_no', 'comp_date_inc', 'comp_nature', 'comp_address', 'comp_city', 'comp_region', 'comp_country', 'comp_phone', 'comp_email', 'comp_contact_name', 'comp_contact_title', 'comp_contact_phone', 'comp_contact_email', 'comp_contact_id'];
          }
      }

      const isValid = await trigger(fieldsToValidate);
      if (isValid) {
          if (step === 2) {
              const baseEmail = entityType === 'individual' ? watch('ind_email') : entityType === 'partnership' ? watch('part_email') : watch('comp_email');
              if (baseEmail) setValue('login_email', baseEmail);
          }
          setStep(step + 1);
          window.scrollTo(0,0);
      } else {
          toast.error("Please fill in all required fields correctly.");
      }
  };

  const onSubmit = (data: FormValues) => {
    setIsSubmitting(true);
    setTimeout(() => {
        setIsSubmitting(false);
        toast.success(`Confirmation email sent to ${data.login_email}`);
        router.push('/verify-email');
    }, 1500);
  };

  return (
    <div className="min-h-screen relative flex flex-col items-center pt-8 p-6 pb-20 overflow-x-hidden">
      {/* Dynamic Background Image */}
      <div 
         className="absolute inset-0 z-0 bg-cover bg-center bg-fixed w-full h-full"
         style={{ backgroundImage: 'url("/coverImage-1731574415615-526503582DSC_7216.jpeg")' }}
      >
         <div className="absolute inset-0 bg-slate-950/70 backdrop-blur-[2px]"></div>
      </div>

      <div className="relative z-10 w-full flex flex-col items-center">
          <Link href="/" className="flex items-center space-x-3 hover:opacity-90 transition mb-8">
             <img src="/logo-fcc.png" alt="FCC Logo" className="h-12 w-auto brightness-0 invert" />
             <div className="font-bold text-2xl text-white leading-tight drop-shadow-md">Fair Competition <br/><span className="text-lg font-normal text-slate-200">Commission</span></div>
          </Link>

          <MotionWrapper className="w-full max-w-3xl bg-white rounded-2xl shadow-2xl overflow-hidden border-0">
         <div className="bg-slate-50 border-b border-border p-6 md:p-8 text-center">
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">Entity Registration</h1>
            <p className="text-slate-500 mt-2">Join the digital trademark registry infrastructure.</p>
         </div>

         <div className="flex justify-center items-center py-6 border-b border-slate-100 px-8 bg-white">
            <div className="flex items-center">
               <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${step >= 1 ? 'bg-primary text-white' : 'bg-slate-100 text-slate-400'}`}>1</div>
               <div className="hidden sm:block text-xs font-semibold ml-2 text-slate-500 uppercase">Entity</div>
               <div className={`w-12 sm:w-8 h-1 mx-2 sm:mx-4 rounded-full ${step >= 2 ? 'bg-primary' : 'bg-slate-100'}`}></div>
               
               <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${step >= 2 ? 'bg-primary text-white' : 'bg-slate-100 text-slate-400'}`}>2</div>
               <div className="hidden sm:block text-xs font-semibold ml-2 text-slate-500 uppercase">Details</div>
               <div className={`w-12 sm:w-8 h-1 mx-2 sm:mx-4 rounded-full ${step >= 3 ? 'bg-primary' : 'bg-slate-100'}`}></div>
               
               <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${step >= 3 ? 'bg-primary text-white' : 'bg-slate-100 text-slate-400'}`}>3</div>
               <div className="hidden sm:block text-xs font-semibold ml-2 text-slate-500 uppercase">Security</div>
            </div>
         </div>

         <form onSubmit={handleSubmit(onSubmit)} className="p-6 md:p-10">
            
            {/* STEP 1: ENTITY TYPE */}
            {step === 1 && (
               <MotionWrapper className="space-y-6">
                  <h3 className="text-lg font-semibold mb-4">Select Entity Type</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div onClick={() => setValue('entity_type', 'individual')} className={`cursor-pointer rounded-xl border p-5 flex flex-col items-center text-center transition ${entityType === 'individual' ? 'border-primary bg-primary/5 ring-1 ring-primary' : 'border-border hover:border-slate-300'}`}>
                      <User className={`h-8 w-8 mb-3 ${entityType === 'individual' ? 'text-primary' : 'text-slate-400'}`} />
                      <span className="font-semibold text-slate-900">Individual</span>
                      <span className="text-xs text-slate-500 mt-2">I am an individual or sole business owner</span>
                    </div>

                    <div onClick={() => setValue('entity_type', 'partnership')} className={`cursor-pointer rounded-xl border p-5 flex flex-col items-center text-center transition ${entityType === 'partnership' ? 'border-primary bg-primary/5 ring-1 ring-primary' : 'border-border hover:border-slate-300'}`}>
                      <Users className={`h-8 w-8 mb-3 ${entityType === 'partnership' ? 'text-primary' : 'text-slate-400'}`} />
                      <span className="font-semibold text-slate-900">Partnership</span>
                      <span className="text-xs text-slate-500 mt-2">My business is owned by two or more partners</span>
                    </div>

                    <div onClick={() => setValue('entity_type', 'company')} className={`cursor-pointer rounded-xl border p-5 flex flex-col items-center text-center transition ${entityType === 'company' ? 'border-primary bg-primary/5 ring-1 ring-primary' : 'border-border hover:border-slate-300'}`}>
                      <Building2 className={`h-8 w-8 mb-3 ${entityType === 'company' ? 'text-primary' : 'text-slate-400'}`} />
                      <span className="font-semibold text-slate-900">Company</span>
                      <span className="text-xs text-slate-500 mt-2">I represent a registered company or corporation</span>
                    </div>
                  </div>
                  
                  <div className="flex justify-end pt-8">
                     <Button type="button" onClick={handleNext} className="h-12 px-8">Next Step <ArrowRight className="ml-2 h-4 w-4" /></Button>
                  </div>
               </MotionWrapper>
            )}

            {/* STEP 2: DETAILS */}
            {step === 2 && (
               <MotionWrapper className="space-y-8">
                  {entityType === 'individual' && (
                      <div className="space-y-6">
                         <h3 className="text-xl font-semibold mb-6 border-b pb-2">Individual Details</h3>
                         
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                             <div className="space-y-2 col-span-2">
                                <Label>Full Legal Name *</Label>
                                <Input {...register('ind_name')} placeholder="Full name exactly as on ID" className={errors.ind_name ? "border-red-500" : ""} />
                                {errors.ind_name && <p className="text-xs text-red-500">{errors.ind_name.message}</p>}
                             </div>
                             
                             <div className="space-y-2">
                                <Label>National ID / Passport Number *</Label>
                                <Input {...register('ind_national_id')} placeholder="NIDA or Passport Number" className={errors.ind_national_id ? "border-red-500" : ""} />
                                {errors.ind_national_id && <p className="text-xs text-red-500">{errors.ind_national_id.message}</p>}
                             </div>

                             <div className="space-y-2">
                                <Label>Nationality *</Label>
                                <select {...register('ind_nationality')} className={`flex h-12 w-full rounded-md border bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring ${errors.ind_nationality ? 'border-red-500' : 'border-input'}`}>
                                    <option value="">Select Country</option>
                                    <option value="TZ">Tanzania</option>
                                    <option value="KE">Kenya</option>
                                    <option value="UG">Uganda</option>
                                    <option value="OTHER">Other</option>
                                </select>
                                {errors.ind_nationality && <p className="text-xs text-red-500">{errors.ind_nationality.message}</p>}
                             </div>

                             <div className="space-y-2">
                                <Label>Date of Birth *</Label>
                                <Input type="date" {...register('ind_dob')} className={errors.ind_dob ? "border-red-500" : ""} />
                                {errors.ind_dob && <p className="text-xs text-red-500">{errors.ind_dob.message}</p>}
                             </div>

                             <div className="space-y-2">
                                <Label>Business / Trading Name *</Label>
                                <Input {...register('ind_biz_name')} className={errors.ind_biz_name ? "border-red-500" : ""} />
                                {errors.ind_biz_name && <p className="text-xs text-red-500">{errors.ind_biz_name.message}</p>}
                             </div>

                             <div className="space-y-2 col-span-2">
                                <Label>Nature of Business * (Min 30 chars)</Label>
                                <Textarea {...register('ind_nature')} rows={3} className={errors.ind_nature ? "border-red-500" : ""} />
                                {errors.ind_nature && <p className="text-xs text-red-500">{errors.ind_nature.message}</p>}
                             </div>

                             <div className="space-y-2 col-span-2">
                                <Label>Physical Business Address *</Label>
                                <Input {...register('ind_address')} className={errors.ind_address ? "border-red-500" : ""} />
                                {errors.ind_address && <p className="text-xs text-red-500">{errors.ind_address.message}</p>}
                             </div>

                             <div className="space-y-2">
                                <Label>City / Town *</Label>
                                <Input {...register('ind_city')} className={errors.ind_city ? "border-red-500" : ""} />
                                {errors.ind_city && <p className="text-xs text-red-500">{errors.ind_city.message}</p>}
                             </div>

                             <div className="space-y-2">
                                <Label>Region *</Label>
                                <Input {...register('ind_region')} className={errors.ind_region ? "border-red-500" : ""} />
                                {errors.ind_region && <p className="text-xs text-red-500">{errors.ind_region.message}</p>}
                             </div>

                             <div className="space-y-2">
                                <Label>Country *</Label>
                                <select {...register('ind_country')} className={`flex h-12 w-full rounded-md border bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring ${errors.ind_country ? 'border-red-500' : 'border-input'}`}>
                                    <option value="TZ">Tanzania</option>
                                    <option value="KE">Kenya</option>
                                    <option value="UG">Uganda</option>
                                </select>
                                {errors.ind_country && <p className="text-xs text-red-500">{errors.ind_country.message}</p>}
                             </div>
                             
                             <div className="space-y-2">
                                <Label>P.O. Box (Optional)</Label>
                                <Input {...register('ind_postal')} />
                             </div>

                             <div className="space-y-2">
                                <Label>Phone Number (Primary) *</Label>
                                <Input {...register('ind_phone')} placeholder="+255..." className={errors.ind_phone ? "border-red-500" : ""} />
                                {errors.ind_phone && <p className="text-xs text-red-500">{errors.ind_phone.message}</p>}
                             </div>
                             
                             <div className="space-y-2">
                                <Label>Email Address *</Label>
                                <Input type="email" {...register('ind_email')} placeholder="you@example.com" className={errors.ind_email ? "border-red-500" : ""} />
                                {errors.ind_email && <p className="text-xs text-red-500">{errors.ind_email.message}</p>}
                             </div>
                         </div>
                      </div>
                  )}

                  {entityType === 'partnership' && (
                      <div className="space-y-6">
                         <h3 className="text-xl font-semibold mb-6 border-b pb-2">Partnership Basics</h3>
                         
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                             <div className="space-y-2 col-span-2">
                                <Label>Business / Partnership Name *</Label>
                                <Input {...register('part_biz_name')} className={errors.part_biz_name ? "border-red-500" : ""} />
                                {errors.part_biz_name && <p className="text-xs text-red-500">{errors.part_biz_name.message}</p>}
                             </div>

                             <div className="space-y-2 col-span-2">
                                <Label>Nature of Business * (Min 30 chars)</Label>
                                <Textarea {...register('part_nature')} rows={3} className={errors.part_nature ? "border-red-500" : ""} />
                                {errors.part_nature && <p className="text-xs text-red-500">{errors.part_nature.message}</p>}
                             </div>

                             <div className="space-y-2 col-span-2">
                                <Label>Physical Business Address *</Label>
                                <Input {...register('part_address')} className={errors.part_address ? "border-red-500" : ""} />
                                {errors.part_address && <p className="text-xs text-red-500">{errors.part_address.message}</p>}
                             </div>

                             <div className="space-y-2">
                                <Label>City *</Label>
                                <Input {...register('part_city')} />
                             </div>
                             
                             <div className="space-y-2">
                                <Label>Region *</Label>
                                <Input {...register('part_region')} />
                             </div>

                             <div className="space-y-2">
                                <Label>Country *</Label>
                                <select {...register('part_country')} className="flex h-12 w-full rounded-md border border-input bg-transparent px-3 py-1 shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring">
                                    <option value="TZ">Tanzania</option>
                                </select>
                             </div>

                             <div className="space-y-2">
                                <Label>Business Phone *</Label>
                                <Input {...register('part_phone')} placeholder="+255..." className={errors.part_phone ? "border-red-500" : ""} />
                                {errors.part_phone && <p className="text-xs text-red-500">{errors.part_phone.message}</p>}
                             </div>

                             <div className="space-y-2">
                                <Label>Business Email *</Label>
                                <Input placeholder="legal@partnership.com" {...register('part_email')} className={errors.part_email ? "border-red-500" : ""} />
                                {errors.part_email && <p className="text-xs text-red-500">{errors.part_email.message}</p>}
                             </div>
                         </div>

                         <div className="pt-8">
                             <div className="flex items-center justify-between border-b pb-2 mb-6">
                                <h3 className="text-xl font-semibold">Partners</h3>
                                <Button type="button" variant="outline" size="sm" onClick={() => append({ name: '', nationality: '', national_id: '', phone: '', email: '', address: '' })}>
                                   <Plus className="mr-2 h-4 w-4" /> Add Partner
                                </Button>
                             </div>
                             
                             {errors.partners && <p className="text-sm font-semibold text-red-500 mb-4">{errors.partners.message}</p>}

                             <div className="space-y-6">
                                 {fields.map((field, index) => (
                                    <div key={field.id} className="relative bg-slate-50 border border-slate-200 rounded-xl p-6">
                                        {fields.length > 1 && (
                                            <button type="button" onClick={() => remove(index)} className="absolute top-4 right-4 text-slate-400 hover:text-red-500 transition">
                                                <Trash2 className="h-5 w-5" />
                                            </button>
                                        )}
                                        <h4 className="font-semibold text-slate-700 mb-4 uppercase tracking-wider text-xs">Partner {index + 1}</h4>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <Label>Full Name *</Label>
                                                <Input {...register(`partners.${index}.name`)} className={errors.partners?.[index]?.name ? "border-red-500": ""} />
                                            </div>
                                            <div className="space-y-2">
                                                <Label>National ID *</Label>
                                                <Input {...register(`partners.${index}.national_id`)} className={errors.partners?.[index]?.national_id ? "border-red-500": ""} />
                                            </div>
                                            <div className="space-y-2">
                                                <Label>Nationality *</Label>
                                                <Input {...register(`partners.${index}.nationality`)} className={errors.partners?.[index]?.nationality ? "border-red-500": ""} />
                                            </div>
                                            <div className="space-y-2">
                                                <Label>Phone Number *</Label>
                                                <Input {...register(`partners.${index}.phone`)} placeholder="+255..." className={errors.partners?.[index]?.phone ? "border-red-500": ""} />
                                            </div>
                                            <div className="space-y-2">
                                                <Label>Email *</Label>
                                                <Input {...register(`partners.${index}.email`)} className={errors.partners?.[index]?.email ? "border-red-500": ""} />
                                            </div>
                                            <div className="space-y-2 col-span-2">
                                                <Label>Physical Address *</Label>
                                                <Input {...register(`partners.${index}.address`)} className={errors.partners?.[index]?.address ? "border-red-500": ""} />
                                            </div>
                                        </div>
                                    </div>
                                 ))}
                             </div>
                         </div>
                      </div>
                  )}

                  {entityType === 'company' && (
                      <div className="space-y-6">
                         <h3 className="text-xl font-semibold mb-6 border-b pb-2">Company / Corporate Details</h3>
                         
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                             <div className="space-y-2 col-span-2">
                                <Label>Company Name * (As per certificates)</Label>
                                <Input {...register('comp_name')} className={errors.comp_name ? "border-red-500" : ""} />
                                {errors.comp_name && <p className="text-xs text-red-500">{errors.comp_name.message}</p>}
                             </div>

                             <div className="space-y-2">
                                <Label>Company Registration Number *</Label>
                                <Input {...register('comp_reg_no')} className={errors.comp_reg_no ? "border-red-500" : ""} />
                                {errors.comp_reg_no && <p className="text-xs text-red-500">{errors.comp_reg_no.message}</p>}
                             </div>

                             <div className="space-y-2">
                                <Label>Date of Incorporation *</Label>
                                <Input type="date" {...register('comp_date_inc')} className={errors.comp_date_inc ? "border-red-500" : ""} />
                                {errors.comp_date_inc && <p className="text-xs text-red-500">{errors.comp_date_inc.message}</p>}
                             </div>

                             <div className="space-y-2">
                                <Label>Country of Incorporation *</Label>
                                <select {...register('comp_country_inc')} className="flex h-12 w-full rounded-md border border-input bg-transparent px-3 py-1 shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring">
                                    <option value="">Select Country</option>
                                    <option value="TZ">Tanzania</option>
                                    <option value="UK">United Kingdom</option>
                                    <option value="USA">USA</option>
                                    <option value="KE">Kenya</option>
                                    <option value="ZA">South Africa</option>
                                    <option value="OTHER">Other</option>
                                </select>
                                {errors.comp_country_inc && <p className="text-xs text-red-500">{errors.comp_country_inc.message}</p>}
                             </div>

                             <div className="space-y-2 col-span-2 mt-4">
                                <Label>Registered Office Address *</Label>
                                <Input {...register('comp_address')} className={errors.comp_address ? "border-red-500" : ""} />
                                {errors.comp_address && <p className="text-xs text-red-500">{errors.comp_address.message}</p>}
                             </div>

                             <div className="space-y-2">
                                <Label>City / Town *</Label>
                                <Input {...register('comp_city')} className={errors.comp_city ? "border-red-500" : ""} />
                             </div>
                             
                             <div className="space-y-2">
                                <Label>Region / State / Province *</Label>
                                <Input {...register('comp_region')} className={errors.comp_region ? "border-red-500" : ""} />
                             </div>

                             <div className="space-y-2">
                                <Label>Country *</Label>
                                <Input defaultValue="Tanzania" {...register('comp_country')} className={errors.comp_country ? "border-red-500" : ""} />
                             </div>

                             <div className="space-y-2">
                                <Label>P.O. Box</Label>
                                <Input {...register('comp_postal')} />
                             </div>

                             <div className="space-y-2 col-span-2">
                                <Label>Nature of Business * (Min 30 chars)</Label>
                                <Textarea {...register('comp_nature')} rows={3} className={errors.comp_nature ? "border-red-500" : ""} />
                                {errors.comp_nature && <p className="text-xs text-red-500">{errors.comp_nature.message}</p>}
                             </div>

                             <div className="space-y-2">
                                <Label>Business Phone Number *</Label>
                                <Input {...register('comp_phone')} placeholder="+255..." className={errors.comp_phone ? "border-red-500" : ""} />
                                {errors.comp_phone && <p className="text-xs text-red-500">{errors.comp_phone.message}</p>}
                             </div>

                             <div className="space-y-2">
                                <Label>Business Email Address *</Label>
                                <Input type="email" {...register('comp_email')} placeholder="info@company.co.tz" className={errors.comp_email ? "border-red-500" : ""} />
                                {errors.comp_email && <p className="text-xs text-red-500">{errors.comp_email.message}</p>}
                             </div>
                         </div>

                         <div className="pt-8">
                             <h3 className="text-xl font-semibold mb-6 border-b pb-2">Authorized Contact Person</h3>
                             <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                 <div className="space-y-2">
                                    <Label>Contact Person Full Name *</Label>
                                    <Input {...register('comp_contact_name')} className={errors.comp_contact_name ? "border-red-500" : ""} />
                                    {errors.comp_contact_name && <p className="text-xs text-red-500">{errors.comp_contact_name.message}</p>}
                                 </div>
                                 <div className="space-y-2">
                                    <Label>Job Title / Designation *</Label>
                                    <Input placeholder="e.g. Legal Counsel, Director" {...register('comp_contact_title')} className={errors.comp_contact_title ? "border-red-500" : ""} />
                                    {errors.comp_contact_title && <p className="text-xs text-red-500">{errors.comp_contact_title.message}</p>}
                                 </div>
                                 <div className="space-y-2">
                                    <Label>National ID / Passport *</Label>
                                    <Input {...register('comp_contact_id')} className={errors.comp_contact_id ? "border-red-500" : ""} />
                                    {errors.comp_contact_id && <p className="text-xs text-red-500">{errors.comp_contact_id.message}</p>}
                                 </div>
                                 <div className="space-y-2">
                                    <Label>Contact Phone *</Label>
                                    <Input {...register('comp_contact_phone')} placeholder="+255..." className={errors.comp_contact_phone ? "border-red-500" : ""} />
                                    {errors.comp_contact_phone && <p className="text-xs text-red-500">{errors.comp_contact_phone.message}</p>}
                                 </div>
                                 <div className="space-y-2 col-span-2 md:col-span-1">
                                    <Label>Contact Email *</Label>
                                    <Input type="email" {...register('comp_contact_email')} className={errors.comp_contact_email ? "border-red-500" : ""} />
                                    {errors.comp_contact_email && <p className="text-xs text-red-500">{errors.comp_contact_email.message}</p>}
                                 </div>
                             </div>
                         </div>

                      </div>
                  )}

                  <div className="flex justify-between pt-8 border-t border-slate-100">
                     <Button variant="outline" type="button" onClick={() => { setStep(1); window.scrollTo(0,0); }} className="h-12 px-6"><ArrowLeft className="mr-2 h-4 w-4" /> Back</Button>
                     <Button type="button" onClick={handleNext} className="h-12 px-8">Next Step <ArrowRight className="ml-2 h-4 w-4" /></Button>
                  </div>
               </MotionWrapper>
            )}

            {/* STEP 3: SECURITY */}
            {step === 3 && (
               <MotionWrapper className="space-y-8">
                  <h3 className="text-xl font-semibold mb-6 border-b pb-2">Account Security</h3>
                  
                  <div className="space-y-6 max-w-md mx-auto">
                     <div className="space-y-2">
                         <Label>Email Address (Login ID) *</Label>
                         <Input type="email" {...register('login_email')} className={errors.login_email ? "border-red-500" : ""} />
                         {errors.login_email && <p className="text-xs text-red-500">{errors.login_email.message}</p>}
                         <p className="text-[11px] text-slate-500">This email will be used to log into the FCC portal.</p>
                     </div>

                     <div className="space-y-2 relative">
                         <Label>Create Password *</Label>
                         <div className="relative">
                            <Input type={showPassword ? "text" : "password"} {...register('password')} className={errors.password ? "border-red-500 pr-10" : "pr-10"} />
                            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-3 text-slate-400 hover:text-slate-600">
                                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                            </button>
                         </div>
                         {errors.password && <p className="text-xs text-red-500">{errors.password.message}</p>}
                         
                         {/* Password Strength Indicator */}
                         <div className="pt-2">
                            <div className="flex items-center justify-between mb-1">
                                <span className="text-[10px] uppercase font-bold text-slate-500">Password Strength</span>
                                <span className={`text-[10px] uppercase font-bold ${strength === 0 ? 'text-slate-400' : strength === 1 ? 'text-red-500' : strength === 2 ? 'text-orange-500' : strength === 3 ? 'text-yellow-500' : 'text-green-500'}`}>
                                    {strength === 0 ? 'None' : strength === 1 ? 'Weak' : strength === 2 ? 'Fair' : strength === 3 ? 'Good' : 'Strong'}
                                </span>
                            </div>
                            <div className="flex gap-1 h-1.5">
                                <div className={`flex-1 rounded-full ${strength >= 1 ? (strength === 1 ? 'bg-red-500' : strength === 2 ? 'bg-orange-500' : strength === 3 ? 'bg-yellow-500' : 'bg-green-500') : 'bg-slate-200'}`}></div>
                                <div className={`flex-1 rounded-full ${strength >= 2 ? (strength === 2 ? 'bg-orange-500' : strength === 3 ? 'bg-yellow-500' : 'bg-green-500') : 'bg-slate-200'}`}></div>
                                <div className={`flex-1 rounded-full ${strength >= 3 ? (strength === 3 ? 'bg-yellow-500' : 'bg-green-500') : 'bg-slate-200'}`}></div>
                                <div className={`flex-1 rounded-full ${strength >= 4 ? 'bg-green-500' : 'bg-slate-200'}`}></div>
                            </div>
                         </div>
                     </div>

                     <div className="space-y-2">
                         <Label>Confirm Password *</Label>
                         <Input type={showPassword ? "text" : "password"} {...register('confirm_password')} className={errors.confirm_password ? "border-red-500" : ""} />
                         {errors.confirm_password && <p className="text-xs text-red-500">{errors.confirm_password.message}</p>}
                     </div>

                     <div className="pt-4 space-y-3">
                         <label className="flex items-start space-x-3 cursor-pointer group">
                             <div className="pt-0.5">
                                 <input type="checkbox" {...register('terms')} className="w-4 h-4 rounded border-slate-300 text-primary focus:ring-primary" />
                             </div>
                             <div className="text-sm text-slate-600 leading-tight">
                                 I agree to the <Link href="/terms" className="text-primary hover:underline">Terms of Service</Link> and certify that all details provided are true and accurate.
                                 {errors.terms && <p className="text-xs text-red-500 mt-1">{errors.terms.message}</p>}
                             </div>
                         </label>

                         <label className="flex items-start space-x-3 cursor-pointer group">
                             <div className="pt-0.5">
                                 <input type="checkbox" {...register('privacy')} className="w-4 h-4 rounded border-slate-300 text-primary focus:ring-primary" />
                             </div>
                             <div className="text-sm text-slate-600 leading-tight">
                                 I agree to the <Link href="/privacy" className="text-primary hover:underline">Privacy Policy</Link> regarding handling of personal and corporate data.
                                 {errors.privacy && <p className="text-xs text-red-500 mt-1">{errors.privacy.message}</p>}
                             </div>
                         </label>
                     </div>
                  </div>

                  <div className="flex justify-between pt-8 border-t border-slate-100">
                     <Button variant="outline" type="button" onClick={() => { setStep(2); window.scrollTo(0,0); }} className="h-12 px-6"><ArrowLeft className="mr-2 h-4 w-4" /> Back</Button>
                     <Button type="submit" disabled={isSubmitting} className="h-12 px-8 bg-green-600 hover:bg-green-700 text-white font-semibold">
                         {isSubmitting ? "Creating..." : "Complete Registration"} <CheckCircle2 className="ml-2 h-4 w-4" />
                     </Button>
                  </div>
               </MotionWrapper>
            )}

         </form>

         <div className="bg-slate-50 py-5 text-center border-t border-slate-100">
            <p className="text-sm text-slate-500">Already have an account? <Link href="/login" className="text-primary font-semibold hover:underline">Log in to the Portal</Link></p>
         </div>
      </MotionWrapper>
     </div>
    </div>
  );
}
