interface PageTitleProps {
  title: string;
  className?: string;
}

export default function PageTitle({ title, className = '' }: PageTitleProps) {
  return (
    <div className={`relative mb-8 ${className}`}>
      <h1 className="text-5xl md:text-6xl font-bold text-text-primary">
        {title}
      </h1>
      <div className="w-16 h-1 bg-accent-gold rounded-full mt-4"></div>
    </div>
  );
}
