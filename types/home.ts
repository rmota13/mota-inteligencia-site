export type HomeIconName =
  | "activity"
  | "api"
  | "bar-chart"
  | "bot"
  | "brain"
  | "cloud"
  | "database"
  | "dollar-sign"
  | "eye"
  | "file-text"
  | "globe"
  | "layers"
  | "network"
  | "plug"
  | "server"
  | "shield"
  | "sparkles"
  | "workflow";

export type Solution = {
  title: string;
  description: string;
  icon: HomeIconName;
  outcome: string;
};

export type TechnologyItem = {
  name: string;
  role: string;
};

export type TechnologyGroup = {
  title: string;
  description: string;
  icon: HomeIconName;
  items: TechnologyItem[];
};

export type ValuePillar = {
  title: string;
  description: string;
  icon: HomeIconName;
};

export type Ecosystem = {
  title: string;
  description: string;
  examples: string[];
  icon: HomeIconName;
};

export type WorkStep = {
  number: string;
  title: string;
  description: string;
};
