import type React from "react";

interface SectionTitleProps {
  eyebrow: string;
  title: string;
  description?: string;
  className?: string;
}

export const SectionTitle: React.FC<SectionTitleProps> = ({
  eyebrow,
  title,
  description,
  className = "",
}) => {
  // Garante que o eyebrow venha envelopado entre colchetes
  const formattedEyebrow =
    eyebrow.startsWith("[") && eyebrow.endsWith("]")
      ? eyebrow
      : `[ ${eyebrow} ]`;

  return (
    <div className={`flex flex-col gap-6 max-w-[85ch] ${className}`}>
      <span className="font-mono uppercase tracking-[0.2em] text-sm text-concreto">
        {formattedEyebrow}
      </span>
      <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter leading-[0.95] text-grafite max-w-[22ch]">
        {title}
      </h2>
      {description && (
        <p className="text-base md:text-lg text-concreto/85 leading-relaxed max-w-[65ch] mt-2">
          {description}
        </p>
      )}
    </div>
  );
};

export default SectionTitle;
