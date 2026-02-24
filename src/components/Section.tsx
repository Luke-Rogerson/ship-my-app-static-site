const maxWidthClass = {
  "4xl": "max-w-4xl",
  "5xl": "max-w-5xl",
  "6xl": "max-w-6xl",
} as const;

export function Section({
  id,
  title,
  shaded,
  centerTitle,
  maxWidth = "4xl",
  children,
}: {
  id?: string;
  title: string;
  shaded?: boolean;
  centerTitle?: boolean;
  maxWidth?: keyof typeof maxWidthClass;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className={`px-4 py-16 sm:px-6${shaded ? " bg-gray-50 dark:bg-void-900" : ""}`}
    >
      <div className={`mx-auto ${maxWidthClass[maxWidth]}`}>
        <h2
          className={`text-2xl font-bold text-gray-900 sm:text-3xl dark:text-white${centerTitle ? " text-center" : ""}`}
        >
          {title}
        </h2>
        {children}
      </div>
    </section>
  );
}
