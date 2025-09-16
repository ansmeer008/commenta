import { Badge } from "@/components/ui/badge";

export interface Filter {
  id: string;
  title: string;
  isSelected: boolean;
}

interface CommentaryFilterProps {
  filterList: Filter[];
  onToggle: (id: string) => void;
}

export const CommentaryFilter = ({ filterList, onToggle }: CommentaryFilterProps) => {
  return (
    <div className="flex overflow-x-auto gap-2 pb-4 px-4">
      <Badge
        size="lg"
        variant={filterList.every(f => f.isSelected) ? "highlight" : "outline"}
        className="cursor-pointer font-bold"
        onClick={() => onToggle("all")}
      >
        All
      </Badge>

      {filterList.map(filter => (
        <Badge
          key={filter.id}
          size="lg"
          className="cursor-pointer"
          variant={filter.isSelected ? "default" : "outline"}
          onClick={() => onToggle(filter.id)}
        >
          {filter.title}
        </Badge>
      ))}
    </div>
  );
};
