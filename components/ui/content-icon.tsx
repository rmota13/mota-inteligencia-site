import {
  Activity,
  BarChart3,
  Bot,
  BrainCircuit,
  CloudCog,
  CodeXml,
  Database,
  DollarSign,
  Eye,
  FileText,
  Globe,
  Layers3,
  Network,
  PlugZap,
  Server,
  ShieldCheck,
  Sparkles,
  Workflow,
} from "lucide-react";
import type { LucideIcon, LucideProps } from "lucide-react";
import type { HomeIconName } from "@/types/home";

const icons: Record<HomeIconName, LucideIcon> = {
  activity: Activity,
  api: CodeXml,
  "bar-chart": BarChart3,
  bot: Bot,
  brain: BrainCircuit,
  cloud: CloudCog,
  database: Database,
  "dollar-sign": DollarSign,
  eye: Eye,
  "file-text": FileText,
  globe: Globe,
  layers: Layers3,
  network: Network,
  plug: PlugZap,
  server: Server,
  shield: ShieldCheck,
  sparkles: Sparkles,
  workflow: Workflow,
};

type ContentIconProps = LucideProps & {
  name: HomeIconName;
};

export function ContentIcon({ name, ...props }: ContentIconProps) {
  const Icon = icons[name];
  return <Icon aria-hidden="true" {...props} />;
}
