import { Star, StarHalf } from "lucide-react";
import { cn } from "@/lib/utils";

interface StarRatingProps {
  rating: number; // 0-5
  maxStars?: number;
  size?: "sm" | "md" | "lg";
  showValue?: boolean;
  className?: string;
}

export function StarRating({
  rating,
  maxStars = 5,
  size = "sm",
  showValue = false,
  className,
}: StarRatingProps) {
  const sizeMap = { sm: "h-3.5 w-3.5", md: "h-4 w-4", lg: "h-5 w-5" };
  const iconSize = sizeMap[size];

  const stars: React.ReactNode[] = [];
  for (let i = 1; i <= maxStars; i++) {
    if (rating >= i) {
      stars.push(
        <Star
          key={i}
          className={cn(iconSize, "fill-amber-400 text-amber-400")}
        />
      );
    } else if (rating >= i - 0.5) {
      stars.push(
        <StarHalf
          key={i}
          className={cn(iconSize, "fill-amber-400 text-amber-400")}
        />
      );
    } else {
      stars.push(
        <Star key={i} className={cn(iconSize, "text-muted-foreground/30")} />
      );
    }
  }

  return (
    <div className={cn("flex items-center gap-0.5", className)}>
      {stars}
      {showValue && (
        <span className="ml-1.5 text-sm font-medium">{rating.toFixed(1)}</span>
      )}
    </div>
  );
}
