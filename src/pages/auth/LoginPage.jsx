import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { Lock, Mail } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { useAuth } from '../../context/AuthContext';

const schema = z.object({ email: z.string().email(), password: z.string().min(6), remember: z.boolean().optional() });

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({ resolver: zodResolver(schema), defaultValues: { email: 'admin@alumni.local', password: 'password', remember: true } });
  const submit = async (values) => { await login(values); navigate('/app/dashboard'); };
  return <main className="grid min-h-screen place-items-center bg-admin-gradient p-4"><motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass w-full max-w-md rounded-[2rem] p-8"><div className="mb-8 text-center"><div className="mx-auto mb-4 grid h-16 w-16 place-items-center rounded-3xl bg-brand text-2xl font-bold text-white">AA</div><h1 className="text-3xl font-bold">Admin Login</h1><p className="mt-2 text-sm text-slate-500">Sign in to manage alumni, events, jobs, donations and reports.</p></div><form onSubmit={handleSubmit(submit)} className="space-y-4"><label className="block"><span className="mb-1 block text-sm font-semibold">Email</span><div className="relative"><Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"/><input className="input input-with-icon" {...register('email')} /></div>{errors.email && <p className="mt-1 text-xs text-red-500">Valid email is required.</p>}</label><label className="block"><span className="mb-1 block text-sm font-semibold">Password</span><div className="relative"><Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"/><input type="password" className="input input-with-icon" {...register('password')} /></div>{errors.password && <p className="mt-1 text-xs text-red-500">Password must be at least 6 characters.</p>}</label><div className="flex items-center justify-between text-sm"><label className="flex items-center gap-2"><input type="checkbox" {...register('remember')} /> Remember me</label><Link className="font-semibold text-brand" to="/forgot-password">Forgot password?</Link></div><button disabled={isSubmitting} className="btn-primary w-full">Login</button></form><p className="mt-6 text-center text-sm text-slate-500">No account? <Link to="/register" className="font-semibold text-brand">Create one</Link></p></motion.div></main>;
}
