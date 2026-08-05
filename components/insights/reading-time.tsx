import { Clock3 } from "lucide-react";
import { getReadingTimeLabel } from "@/lib/editorial";
import type { Insight } from "@/types/insight";

export function ReadingTime({ content }: { content: Insight }) {
  return (
    <span className="inline-flex items-center gap-2">
      <Clock3 aria-hidden="true" size={15} />
      {getReadingTimeLabel(content)}
    </span>
  );
}
