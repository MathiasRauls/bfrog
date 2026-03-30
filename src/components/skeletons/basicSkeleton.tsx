import { cn } from "@/lib/utils";

const Skeleton = async ({ className }: { className?: string }) => {
	return (<div className={cn("animate-pulse", className)}>{}</div>)
}
export default Skeleton;
