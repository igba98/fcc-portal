'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { ChevronRight, ShieldCheck, UserPlus, Copy, CheckCircle2 } from 'lucide-react';
import { MotionWrapper } from '@/components/shared/MotionWrapper';
import { toast } from 'sonner';

const staffSchema = z.object({
  fullName: z.string().min(3, "Min 3 chars"),
  employeeId: z.string().regex(/^FCC-EMP-\d{4}$/, "Required format: FCC-EMP-XXXX"),
  department: z.string().min(1, "Select Department"),
  role: z.string().min(1, "Select Role"),
  workEmail: z.string().email().regex(/.*@fcc\.go\.tz$/, "Must end with @fcc.go.tz"),
  phone: z.string().regex(/^\+255\d{9}$/, "Required format: +255XXXXXXXXX"),
  dateJoined: z.string().refine(val => {
      if (!val) return false;
      const today = new Date().toISOString().split('T')[0];
      return val <= today;
  }, "Cannot be a future date"),
  location: z.string().min(1, "Select Location"),
  supervisor: z.string().min(1, "Select a supervisor"),
  initialPassword: z.string(),
  forcePasswordChange: z.boolean(),
  accountStatus: z.boolean(),

  // TRO fields
  troApptLetter: z.string().optional(),
  troApptBy: z.string().optional(),
  troApptDate: z.string().optional(),
  troTermEnd: z.string().optional(),
  troSection: z.string().optional(),
  troJustification: z.string().optional(),
  troInduction: z.boolean().optional(),

  // CSO fields
  csoPort: z.string().optional(),
  csoRotStart: z.string().optional(),
  csoRotEnd: z.string().optional(),
  csoAllowance: z.string().optional(),
  csoPrevPort: z.string().optional(),
  csoAccommodation: z.boolean().optional(),
}).superRefine((data, ctx) => {
   if (data.role === 'TRO') {
      if (!data.troApptLetter) ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Required for appointment", path: ['troApptLetter'] });
      if (!data.troApptBy) ctx.addIssue({ code: z.ZodIssueCode.custom, message: "System failure capturing authorizer", path: ['troApptBy'] });
      if (!data.troApptDate) ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Required", path: ['troApptDate'] });
      if (!data.troSection) ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Required", path: ['troSection'] });
      if (!data.troJustification) ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Brief justification required", path: ['troJustification'] });
      if (!data.troInduction) ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Mandatory induction sign-off missing", path: ['troInduction'] });
   }
   if (data.role === 'CSO') {
      if (!data.csoPort) ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Port assignment required", path: ['csoPort'] });
      if (!data.csoRotStart) ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Rotation schedule required", path: ['csoRotStart'] });
      if (!data.csoRotEnd) ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Rotation schedule required", path: ['csoRotEnd'] });
      if (!data.csoAllowance) ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Allowance status required", path: ['csoAllowance'] });
   }
});

type FormValues = z.infer<typeof staffSchema>;

export default function NewStaffAccount() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copied, setCopied] = useState(false);

  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(staffSchema),
    defaultValues: { 
        forcePasswordChange: true,
        accountStatus: true,
        troInduction: false,
        csoAccommodation: false,
        troApptBy: "Chief Inspector (Admin)"
    }
  });

  const role = watch('role');
  const csoRotStart = watch('csoRotStart');
  const activePassword = watch('initialPassword');

  // Auto-generate password based on role
  useEffect(() => {
      if (role) {
          const year = new Date().getFullYear();
          const random4 = Math.floor(1000 + Math.random() * 9000);
          setValue('initialPassword', `${role}@${year}+${random4}`);
      }
  }, [role, setValue]);

  // Auto-calculate CSO rotation end (+3 months)
  useEffect(() => {
      if (csoRotStart) {
          const start = new Date(csoRotStart);
          start.setMonth(start.getMonth() + 3);
          setValue('csoRotEnd', start.toISOString().split('T')[0]);
      }
  }, [csoRotStart, setValue]);

  const onCopyPassword = () => {
      if (activePassword) {
          navigator.clipboard.writeText(activePassword);
          setCopied(true);
          toast.success("Temporary password copied to clipboard");
          setTimeout(() => setCopied(false), 2000);
      }
  };

  const onSubmit = (data: FormValues) => {
    setIsSubmitting(true);
    setTimeout(() => {
        setIsSubmitting(false);
        toast.success(`Account for ${data.fullName} created successfully.`);
        router.push('/internal/users');
    }, 1500);
  };

  return (
    <main className="flex-1 overflow-auto p-6 md:p-10 bg-slate-50/50">
        <MotionWrapper className="max-w-5xl mx-auto flex flex-col h-full">
            
            <div className="mb-6 flex items-center space-x-2 text-sm text-slate-500">
               <Link href="/internal/users" className="hover:text-primary transition">User Management</Link>
               <ChevronRight className="h-4 w-4" />
               <span className="text-slate-900 font-medium">New Staff Account</span>
            </div>

            <div className="flex items-center space-x-4 mb-8">
               <div className="w-14 h-14 bg-indigo-100 rounded-xl flex items-center justify-center text-indigo-700">
                   <UserPlus className="h-7 w-7" />
               </div>
               <div>
                   <h1 className="text-3xl font-bold tracking-tight text-slate-900">Provision Staff Account</h1>
                   <p className="text-slate-500 mt-1">Configure roles, hierarchy vectors, and system permissions.</p>
               </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                
                {/* 1. Core Profile Block */}
                <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
                    <div className="bg-slate-50 border-b border-slate-200 px-6 py-4">
                        <h3 className="font-semibold text-slate-900">Core Profile</h3>
                    </div>
                    <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">
                        
                        <div className="space-y-2">
                            <Label>Full Name *</Label>
                            <Input {...register('fullName')} className={errors.fullName ? "border-red-500" : ""} />
                            {errors.fullName && <p className="text-xs text-red-500">{errors.fullName.message}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label>Employee ID (FCC-EMP-XXXX) *</Label>
                            <Input {...register('employeeId')} placeholder="FCC-EMP-" className={errors.employeeId ? "border-red-500" : ""} />
                            {errors.employeeId && <p className="text-xs text-red-500">{errors.employeeId.message}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label>Work Email *</Label>
                            <Input type="email" placeholder="name@fcc.go.tz" {...register('workEmail')} className={errors.workEmail ? "border-red-500" : ""} />
                            {errors.workEmail && <p className="text-xs text-red-500">{errors.workEmail.message}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label>Phone Number *</Label>
                            <Input placeholder="+255..." {...register('phone')} className={errors.phone ? "border-red-500" : ""} />
                            {errors.phone && <p className="text-xs text-red-500">{errors.phone.message}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label>Date Joined *</Label>
                            <Input type="date" {...register('dateJoined')} className={errors.dateJoined ? "border-red-500" : ""} />
                            {errors.dateJoined && <p className="text-xs text-red-500">{errors.dateJoined.message}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label>Office Location *</Label>
                            <select {...register('location')} className="flex h-12 w-full rounded-md border border-input bg-transparent px-3 py-1 shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring">
                                <option value="">Select Base Area</option>
                                <option value="Dodoma HQ">Dodoma HQ</option>
                                <option value="Dar es Salaam">Dar es Salaam</option>
                                <option value="Arusha">Arusha</option>
                                <option value="Mwanza">Mwanza</option>
                                <option value="Tunduma">Tunduma</option>
                                <option value="Holili">Holili</option>
                            </select>
                            {errors.location && <p className="text-xs text-red-500">{errors.location.message}</p>}
                        </div>

                    </div>
                </div>

                {/* 2. Organizational Setup Block */}
                <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
                    <div className="bg-slate-50 border-b border-slate-200 px-6 py-4">
                        <h3 className="font-semibold text-slate-900">Department & Hierarchy</h3>
                    </div>
                    <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">
                        
                        <div className="space-y-2">
                            <Label>Department *</Label>
                            <select {...register('department')} className="flex h-12 w-full rounded-md border border-input bg-transparent px-3 py-1 shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring">
                                <option value="">Select Division</option>
                                <option value="Anti-Counterfeits Division">Anti-Counterfeits Division</option>
                                <option value="Enforcement Section">Enforcement Section</option>
                                <option value="Surveillance Section">Surveillance Section</option>
                                <option value="Administration">Administration</option>
                            </select>
                            {errors.department && <p className="text-xs text-red-500">{errors.department.message}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label>System Role *</Label>
                            <select {...register('role')} className={`flex h-12 w-full rounded-md border bg-transparent px-3 py-1 shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring ${errors.role ? 'border-red-500' : 'border-input'}`}>
                                <option value="">Select Role</option>
                                <option value="CHIEF_INSPECTOR">Chief Inspector</option>
                                <option value="DAC">Director of Anti-Counterfeits (DAC)</option>
                                <option value="ACEM">Anti-Counterfeit Enforcement Manager (ACEM)</option>
                                <option value="TRO">Trademark Receiving Officer (TRO)</option>
                                <option value="ACSM">Anti-Counterfeit Surveillance Manager (ACSM)</option>
                                <option value="CSO">Customs Surveillance Officer (CSO)</option>
                            </select>
                            {errors.role && <p className="text-xs text-red-500">{errors.role.message}</p>}
                        </div>

                        <div className="space-y-2 col-span-2">
                            <Label>Reports To (Supervisor) *</Label>
                            <select {...register('supervisor')} className="flex h-12 w-full rounded-md border border-input bg-transparent px-3 py-1 shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring">
                                <option value="">Select Direct Supervisor</option>
                                <option value="Director General">Director General</option>
                                <option value="Chief Inspector (Admin)">Chief Inspector</option>
                                <option value="Director of Anti-Counterfeits">Director of Anti-Counterfeits</option>
                                <option value="ACEM - Dar es Salaam">ACEM - Dar es Salaam</option>
                            </select>
                            {errors.supervisor && <p className="text-xs text-red-500">{errors.supervisor.message}</p>}
                        </div>

                    </div>
                </div>

                {/* Conditional TRO Block */}
                {role === 'TRO' && (
                    <div className="bg-amber-50 border border-amber-200 rounded-xl shadow-sm overflow-hidden relative">
                        <div className="absolute top-0 left-0 w-1 h-full bg-amber-500"></div>
                        <div className="bg-amber-100/50 border-b border-amber-200 px-6 py-4 flex items-center mb-0">
                            <Badge variant="outline" className="bg-amber-500 text-white border-0 mr-3">TRO Addendum</Badge>
                            <h3 className="font-semibold text-slate-900">Trademark Officer Appointments</h3>
                        </div>
                        <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">
                            <div className="space-y-2">
                                <Label>Appointment Letter Ref *</Label>
                                <Input {...register('troApptLetter')} className={errors.troApptLetter ? "border-red-500 bg-white" : "bg-white"} />
                                {errors.troApptLetter && <p className="text-xs text-red-500">{errors.troApptLetter.message}</p>}
                            </div>
                            <div className="space-y-2">
                                <Label>Appointed By (Authorizer) *</Label>
                                <Input disabled {...register('troApptBy')} className="bg-slate-100 text-slate-500 cursor-not-allowed" />
                            </div>
                            <div className="space-y-2">
                                <Label>Appointment Date *</Label>
                                <Input type="date" {...register('troApptDate')} className={errors.troApptDate ? "border-red-500 bg-white" : "bg-white"} />
                                {errors.troApptDate && <p className="text-xs text-red-500">{errors.troApptDate.message}</p>}
                            </div>
                            <div className="space-y-2">
                                <Label>Term End Date (Optional)</Label>
                                <Input type="date" {...register('troTermEnd')} className="bg-white" />
                                <p className="text-[10px] text-amber-700">Leave blank for indefinite designation</p>
                            </div>
                            <div className="space-y-2 col-span-2">
                                <Label>Assigned Application Section *</Label>
                                <select {...register('troSection')} className="flex h-12 w-full rounded-md border border-input bg-white px-3 py-1 shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring">
                                    <option value="">Select Routing Section</option>
                                    <option value="Tanzania Mainland Intake">Tanzania Mainland Intake</option>
                                    <option value="Zanzibar Registry">Zanzibar Registry</option>
                                </select>
                                {errors.troSection && <p className="text-xs text-red-500">{errors.troSection.message}</p>}
                            </div>
                            <div className="space-y-2 col-span-2">
                                <Label>Brief Justification / Need *</Label>
                                <Textarea {...register('troJustification')} rows={2} className={`bg-white ${errors.troJustification ? "border-red-500" : ""}`} />
                                {errors.troJustification && <p className="text-xs text-red-500">{errors.troJustification.message}</p>}
                            </div>
                            <div className="space-y-2 col-span-2 pt-2 border-t border-amber-200 flex items-center">
                                <input type="checkbox" {...register('troInduction')} id="troInduction" className="w-5 h-5 rounded border-amber-300 text-amber-600 focus:ring-amber-500 mr-3" />
                                <Label htmlFor="troInduction" className="cursor-pointer">I verify that the statutory Trademark Intake Induction has been completed successfully.</Label>
                            </div>
                            {errors.troInduction && <p className="text-xs text-red-500 col-span-2 -mt-4">{errors.troInduction.message}</p>}
                        </div>
                    </div>
                )}

                {/* Conditional CSO Block */}
                {role === 'CSO' && (
                    <div className="bg-blue-50 border border-blue-200 rounded-xl shadow-sm overflow-hidden relative">
                        <div className="absolute top-0 left-0 w-1 h-full bg-blue-500"></div>
                        <div className="bg-blue-100/50 border-b border-blue-200 px-6 py-4 flex items-center mb-0">
                            <Badge variant="outline" className="bg-blue-500 text-white border-0 mr-3">CSO Addendum</Badge>
                            <h3 className="font-semibold text-slate-900">Customs Surveillance Assignment</h3>
                        </div>
                        <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">
                            <div className="space-y-2 col-span-2 md:col-span-1">
                                <Label>Current Port / Border Post *</Label>
                                <select {...register('csoPort')} className="flex h-12 w-full rounded-md border border-input bg-white px-3 py-1 shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring">
                                    <option value="">Select Assigned Port</option>
                                    <option value="Dar es Salaam Port">Dar es Salaam Port</option>
                                    <option value="Julius Nyerere Intl Airport">Julius Nyerere Intl Airport (JNIA)</option>
                                    <option value="Tunduma Border">Tunduma Border</option>
                                    <option value="Namanga Border">Namanga Border</option>
                                    <option value="Mutukula Border">Mutukula Border</option>
                                </select>
                                {errors.csoPort && <p className="text-xs text-red-500">{errors.csoPort.message}</p>}
                            </div>
                            <div className="space-y-2">
                                <Label>Previous Port Assignment (Optional)</Label>
                                <Input {...register('csoPrevPort')} className="bg-white" />
                            </div>
                            
                            <div className="space-y-2">
                                <Label>Rotation Start Date *</Label>
                                <Input type="date" {...register('csoRotStart')} className={errors.csoRotStart ? "border-red-500 bg-white" : "bg-white"} />
                                {errors.csoRotStart && <p className="text-xs text-red-500">{errors.csoRotStart.message}</p>}
                            </div>
                            <div className="space-y-2">
                                <Label>Rotation End Date (Auto 3-months) *</Label>
                                <Input type="date" {...register('csoRotEnd')} readOnly className="bg-slate-100 text-slate-500" />
                            </div>

                            <div className="space-y-2">
                                <Label>Field Allowance Status *</Label>
                                <select {...register('csoAllowance')} className="flex h-12 w-full rounded-md border border-input bg-white px-3 py-1 shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring">
                                    <option value="">Select Status</option>
                                    <option value="PAID">Paid</option>
                                    <option value="PENDING">Pending Transfer</option>
                                    <option value="NOT_APPLICABLE">Not Applicable (HQ Attached)</option>
                                </select>
                                {errors.csoAllowance && <p className="text-xs text-red-500">{errors.csoAllowance.message}</p>}
                            </div>

                            <div className="space-y-2 flex items-center md:items-end justify-start h-full">
                                <div className="flex items-center space-x-3 mb-2">
                                    <input type="checkbox" {...register('csoAccommodation')} id="csoAcc" className="w-5 h-5 rounded border-blue-300 text-blue-600 focus:ring-blue-500" />
                                    <Label htmlFor="csoAcc" className="cursor-pointer font-medium mb-0">Housing / Accommodation Confirmed</Label>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* 3. Security & Access Block */}
                <div className="bg-slate-900 border border-slate-800 rounded-xl shadow-md overflow-hidden text-slate-200">
                    <div className="bg-slate-950 border-b border-slate-800 px-6 py-4 flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                            <ShieldCheck className="h-5 w-5 text-indigo-400" />
                            <h3 className="font-semibold text-white">Access Provisioning</h3>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Label className="mr-2 text-slate-400">Account Active</Label>
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input type="checkbox" {...register('accountStatus')} className="sr-only peer" />
                              <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
                            </label>
                        </div>
                    </div>
                    <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">
                        
                        <div className="space-y-2">
                            <Label className="text-slate-400">Initial Temporary Password (Auto-Generated)</Label>
                            <div className="flex space-x-2">
                                <Input disabled {...register('initialPassword')} className="bg-slate-800 border-slate-700 text-white font-mono tracking-wider disabled:opacity-100 placeholder:text-slate-600" placeholder="Awaiting role selection..." />
                                <Button type="button" variant="outline" size="icon" onClick={onCopyPassword} disabled={!activePassword} className="shrink-0 bg-slate-800 border-slate-700 text-slate-300 hover:text-white hover:bg-slate-700">
                                    {copied ? <CheckCircle2 className="h-4 w-4 text-green-400" /> : <Copy className="h-4 w-4" />}
                                </Button>
                            </div>
                            <p className="text-[10px] text-slate-500">Automatically generated as Role@Year+Random4</p>
                        </div>

                        <div className="space-y-4 pt-1">
                            <div className="hidden md:block mb-4"></div>
                            <label className="flex items-start space-x-3 cursor-pointer group">
                                 <div className="pt-0.5">
                                     <input type="checkbox" {...register('forcePasswordChange')} className="w-5 h-5 rounded border-slate-600 bg-slate-800 text-indigo-500 focus:ring-indigo-500 focus:ring-offset-slate-900" />
                                 </div>
                                 <div className="text-sm font-medium leading-tight text-white group-hover:text-indigo-400 transition">
                                     Require Password Change
                                     <p className="text-xs text-slate-400 font-normal mt-1 leading-relaxed">Mandates the employee to update their credential hash immediately upon their first system login.</p>
                                 </div>
                            </label>
                        </div>

                    </div>
                </div>

                <div className="flex justify-end pt-4 pb-10">
                    <Button type="button" variant="ghost" onClick={() => router.back()} className="mr-4">Cancel</Button>
                    <Button type="submit" disabled={isSubmitting} className="h-12 px-8 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold">
                         {isSubmitting ? "Provisioning..." : "Provision Internal Account"}
                    </Button>
                </div>
            </form>
            
        </MotionWrapper>
    </main>
  );
}
