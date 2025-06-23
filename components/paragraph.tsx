import { cn } from "@/lib/utils";
import { forwardRef } from "react";

interface ParagraphProps {
    children: React.ReactNode;
    className?: string;
}

const Paragraph = forwardRef<HTMLParagraphElement, ParagraphProps>(
    ({ children, className }, ref) => {
        return (
            <p
                ref={ref}
                className={cn("fs-var-2xl md:fs-var-3xl text-textTeal font-medium leading-normal", className)}
            >
                {children}
            </p>
        );
    }
);

Paragraph.displayName = "Paragraph";

export default Paragraph;