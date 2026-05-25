import { motion } from "framer-motion";
export default function StatCard({ title, value, icon: Icon, hint }) {
  return (
    <motion.div whileHover={{ y: -4 }} className="glass rounded-3xl p-5">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-slate-500 dark:text-slate-400">{title}</p>
          <h3 className="mt-2 text-3xl font-bold">{value}</h3>
        </div>
        <div className="rounded-2xl bg-brand/10 p-3 text-brand">
          <Icon className="h-6 w-6" />
        </div>
      </div>
      <p className="mt-4 text-xs text-emerald-600">{hint}</p>
    </motion.div>
  );
}
