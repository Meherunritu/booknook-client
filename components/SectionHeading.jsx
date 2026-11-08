export default function SectionHeading({ title, text, className = "" }) {
  return (
    <div className={`mx-auto mb-10 max-w-2xl text-center ${className}`}>
      <h2 className="text-3xl font-bold md:text-4xl">{title}</h2>
      {text && <p className="mt-3 opacity-75">{text}</p>}
    </div>
  );
}
