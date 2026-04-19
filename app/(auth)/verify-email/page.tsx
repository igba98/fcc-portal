'use client';

import { Mail, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { MotionWrapper } from '@/components/shared/MotionWrapper';
import { useState } from 'react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

export default function VerifyEmailPage() {
    const [status, setStatus] = useState('pending');
    const router = useRouter();

    const handleResend = () => {
        toast.info("Resending email...");
        setTimeout(() => toast.success("Verification email sent!"), 2000);
    };

    const handleConfirm = () => {
        setStatus('verified');
        toast.success("Account Verified Successfully!");
        setTimeout(() => router.push('/login'), 2000);
    };

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col justify-center items-center p-6">
            <MotionWrapper className="max-w-md w-full bg-white rounded-2xl shadow-xl border border-border p-8 text-center">
                {status === 'pending' ? (
                    <>
                        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 text-primary">
                            <Mail className="w-8 h-8" />
                        </div>
                        <h2 className="text-2xl font-bold text-slate-900 mb-2">Check your inbox</h2>
                        <p className="text-slate-500 mb-8">We've sent a verification link to your email address. Please follow the link to activate your account.</p>
                        
                        <div className="space-y-4">
                            <Button onClick={handleConfirm} className="w-full h-12 bg-primary">Simulate Verification <CheckCircle2 className="ml-2 h-4 w-4" /></Button>
                            <Button onClick={handleResend} variant="outline" className="w-full h-12 text-slate-600">Resend Email</Button>
                        </div>
                    </>
                ) : (
                    <>
                        <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6 text-green-500">
                            <CheckCircle2 className="w-8 h-8" />
                        </div>
                        <h2 className="text-2xl font-bold text-slate-900 mb-2">Email Verified</h2>
                        <p className="text-slate-500 mb-8">Your account is now active. Redirecting to portal...</p>
                    </>
                )}
            </MotionWrapper>
        </div>
    );
}
