import type { ProjectStatus as ProjectStatusType } from "@/types/project";

const labels: Record<ProjectStatusType, string> = {
  production: "Em produção",
  rollout: "Em rollout",
  development: "Em desenvolvimento",
  completed: "Concluído",
  planned: "Planejado",
};

const styles: Record<ProjectStatusType, string> = {
  production: "border-[#2EC4B6]/30 bg-[#2EC4B6]/10 text-[#73E0D4]",
  rollout: "border-[#00B4D8]/35 bg-[#00B4D8]/10 text-[#72D7E9]",
  development: "border-amber-300/25 bg-amber-300/10 text-amber-200",
  completed: "border-white/15 bg-white/5 text-[#D5DCE2]",
  planned: "border-violet-300/25 bg-violet-300/10 text-violet-200",
};

export function ProjectStatus({ status }: { status: ProjectStatusType }) {
  return (
    <span className={`inline-flex w-fit rounded-full border px-3 py-1.5 text-xs font-bold ${styles[status]}`}>
      {labels[status]}
    </span>
  );
}
