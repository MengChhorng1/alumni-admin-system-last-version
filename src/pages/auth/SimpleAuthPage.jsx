import { Link } from 'react-router-dom';
export default function SimpleAuthPage({ title = 'Authentication', description = 'This screen is ready for backend integration.' }) {
  return <main className="grid min-h-screen place-items-center bg-admin-gradient p-4"><div className="glass w-full max-w-md rounded-[2rem] p-8 text-center"><h1 className="text-3xl font-bold">{title}</h1><p className="mt-3 text-slate-500">{description}</p><Link to="/login" className="btn-primary mt-6 inline-flex">Back to Login</Link></div></main>;
}
