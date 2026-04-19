'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { ShieldCheck, Scale, ArrowRight, Info } from 'lucide-react';
import { MotionWrapper } from '@/components/shared/MotionWrapper';
import { mockUsers } from '@/data/mock-users';
import { toast } from 'sonner';

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters")
});

type LoginForm = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showDemo, setShowDemo] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema)
  });

  const onSubmit = async (data: LoginForm) => {
    setIsLoading(true);
    const result = await signIn('credentials', {
      email: data.email,
      password: data.password,
      redirect: false
    });

    setIsLoading(false);

    if (result?.error) {
      toast.error("Invalid credentials.");
    } else {
       toast.success("Login Successful");
       const user = mockUsers.find(u => u.email === data.email);
       if (user?.portal === 'internal') {
           router.push('/internal/dashboard');
       } else {
           router.push('/external/dashboard');
       }
    }
  };

  const handleQuickLogin = async (user: any) => {
    setIsLoading(true);
    const result = await signIn('credentials', {
      email: user.email,
      password: user.password,
      redirect: false
    });

    setIsLoading(false);

    if (result?.error) {
      toast.error("Invalid credentials.");
    } else {
       toast.success(`Quick Login Successful: ${user.role.replace(/_/g, ' ')}`);
       if (user?.portal === 'internal') {
           router.push('/internal/dashboard');
       } else {
           router.push('/external/dashboard');
       }
    }
  };

  return (
    <div className="flex min-h-screen bg-background">
      {/* Left panel - Branding */}
      <div className="hidden lg:flex flex-col justify-between w-5/12 bg-primary text-white p-12">
        <div>
          <Link href="/" className="inline-flex items-center space-x-3 hover:opacity-80 transition">
             <img src="/logo-fcc.png" alt="FCC Logo" className="h-10 w-auto brightness-0 invert" />
             <div className="font-bold text-lg leading-tight">Fair Competition <br/><span className="text-sm font-normal text-slate-300">Commission</span></div>
          </Link>
        </div>
        <div>
          <h2 className="text-4xl font-bold mb-6 tracking-tight">Recordation &<br/>Inspection System</h2>
          <p className="text-slate-300 max-w-sm mb-8 leading-relaxed">Secure digital portal for intellectual property protection and counterfeit enforcement workflows.</p>
          <div className="flex items-center space-x-2 text-sm text-amber-400 font-medium">
             <ShieldCheck className="h-5 w-5" />
             <span>ISO 27001 Certified System</span>
          </div>
        </div>
        <div className="text-xs text-slate-400">
          © 2026 Fair Competition Commission
        </div>
      </div>

      {/* Right panel - Auth */}
      <div className="flex-1 flex flex-col justify-center items-center p-6 relative">
        <MotionWrapper className="w-full max-w-md">
           
          <div className="text-center mb-8 lg:hidden">
              <img src="/logo-fcc.png" alt="FCC Logo" className="h-12 w-auto mx-auto mb-4" />
              <h2 className="text-2xl font-bold">FCC System Login</h2>
          </div>

          <Tabs defaultValue="external" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8 bg-slate-100">
              <TabsTrigger value="external">External Portal</TabsTrigger>
              <TabsTrigger value="internal">FCC Staff</TabsTrigger>
            </TabsList>

            <TabsContent value="external">
              <Card className="border-slate-200 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-slate-900">Welcome Back</CardTitle>
                  <CardDescription>Login to manage your trademarks and applications.</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className="space-y-2">
                       <Label htmlFor="email">Email Address</Label>
                       <Input id="email" type="email" placeholder="example@company.com" {...register('email')} />
                       {errors.email && <p className="text-xs text-red-500">{errors.email.message}</p>}
                    </div>
                    <div className="space-y-2">
                       <Label htmlFor="password">Password</Label>
                       <Input id="password" type="password" {...register('password')} />
                       {errors.password && <p className="text-xs text-red-500">{errors.password.message}</p>}
                    </div>
                    <div className="pt-2">
                       <Button type="submit" className="w-full h-11" disabled={isLoading}>
                         {isLoading ? "Signing in..." : "Sign In to Portal"} <ArrowRight className="ml-2 h-4 w-4" />
                       </Button>
                    </div>
                  </form>
                </CardContent>
                <CardFooter className="flex justify-center border-t border-slate-100 pt-6">
                   <p className="text-sm text-slate-500">Don't have an account? <Link href="/register" className="text-primary font-semibold hover:underline">Register Entity</Link></p>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="internal">
              <Card className="border-slate-200 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-slate-900">Staff Access</CardTitle>
                  <CardDescription>Authorized FCC internal network access.</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className="space-y-2">
                       <Label htmlFor="internal-email">Official Email</Label>
                       <Input id="internal-email" type="email" placeholder="user@fcc.go.tz" {...register('email')} />
                       {errors.email && <p className="text-xs text-red-500">{errors.email.message}</p>}
                    </div>
                    <div className="space-y-2">
                       <Label htmlFor="internal-password">Password</Label>
                       <Input id="internal-password" type="password" {...register('password')} />
                       {errors.password && <p className="text-xs text-red-500">{errors.password.message}</p>}
                    </div>
                    <div className="pt-2">
                       <Button type="submit" variant="secondary" className="w-full h-11 bg-slate-900 hover:bg-slate-800 text-white" disabled={isLoading}>
                         {isLoading ? "Authenticating..." : "Secure Login"} <ShieldCheck className="ml-2 h-4 w-4" />
                       </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <div className="mt-8 text-center">
            <button onClick={() => setShowDemo(!showDemo)} className="text-xs text-slate-400 font-medium tracking-wide uppercase hover:text-slate-600 flex items-center justify-center mx-auto transition">
              <Info className="h-3 w-3 mr-1" /> Prototype Demo Credentials
            </button>

            {showDemo && (
              <div className="mt-4 text-left bg-transparent max-h-80 overflow-y-auto text-xs space-y-4">
                 <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
                     <h3 className="font-bold text-slate-700 mb-2 border-b pb-2">External Portal (Right Holders & Agents)</h3>
                     <table className="w-full">
                        <tbody>
                          {mockUsers.filter(u => u.portal === 'external').map(u => (
                            <tr key={u.id} className="border-b border-slate-100 last:border-0 hover:bg-slate-200 transition group">
                              <td className="py-2 text-primary font-medium">{u.role.replace(/_/g, ' ')}</td>
                              <td className="py-2 text-slate-600 truncate max-w-[140px]" title={u.email}>{u.email}</td>
                              <td className="py-2 text-right">
                                  <Button size="sm" onClick={() => handleQuickLogin(u)} disabled={isLoading} className="opacity-0 group-hover:opacity-100 transition shadow-none font-semibold h-7 px-3 text-xs">
                                      Login
                                  </Button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                     </table>
                 </div>

                 <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
                     <h3 className="font-bold text-slate-700 mb-2 border-b pb-2">Internal Portal (FCC Staff)</h3>
                     <table className="w-full">
                        <tbody>
                          {mockUsers.filter(u => u.portal === 'internal').map(u => (
                            <tr key={u.id} className="border-b border-slate-100 last:border-0 hover:bg-slate-200 transition group">
                              <td className="py-2 text-primary font-medium">{u.role.replace(/_/g, ' ')}</td>
                              <td className="py-2 text-slate-600 truncate max-w-[140px]" title={u.email}>{u.email}</td>
                              <td className="py-2 text-right">
                                  <Button size="sm" onClick={() => handleQuickLogin(u)} disabled={isLoading} variant="secondary" className="opacity-0 group-hover:opacity-100 transition shadow-none font-semibold h-7 px-3 text-xs bg-slate-800 text-white hover:bg-slate-700">
                                      Login
                                  </Button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                     </table>
                 </div>
              </div>
            )}
          </div>

        </MotionWrapper>
      </div>
    </div>
  );
}
