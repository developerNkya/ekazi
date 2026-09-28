import { LucideIcon } from "lucide-react";
import { ReactNode } from "react";

interface Props {
  icon: LucideIcon;
  title: string;
  description: string;
  action?: ReactNode;
}

export function EmptyState({ icon: Icon, title, description, action }: Props) {
  return (
    <div className="card p-12 text-center animate-slide-up">
      <div className="mx-auto w-14 h-14 rounded-2xl bg-gradient-to-br from-brand-50 to-brand-100 text-brand-600 flex items-center justify-center mb-4">
        <Icon className="w-6 h-6" strokeWidth={1.75} />
      </div>
      <h3 className="font-semibold text-slate-900 mb-1.5 text-[15px]">{title}</h3>
      <p className="text-sm text-slate-500 max-w-sm mx-auto mb-6 leading-relaxed">{description}</p>
      {action}
    </div>
  );
}