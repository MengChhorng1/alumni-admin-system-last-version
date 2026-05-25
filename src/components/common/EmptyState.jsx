import { Inbox } from "lucide-react";
export default function EmptyState({
  title = "No data found",
  description = "Try changing your search or filters.",
}) {
  return (
    <div className="rounded-3xl border border-dashed border-slate-300 p-10 text-center dark:border-slate-700">
      <Inbox className="mx-auto mb-3 h-10 w-10 text-slate-400" />
      <h3 className="font-semibold">{title}</h3>
      <p className="text-sm text-slate-500">{description}</p>
    </div>
  );
}
