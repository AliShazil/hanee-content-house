type Feature = {
  label: string;
  heading: string;
  description: string;
  layout: "row" | "col";
  accent?: boolean;
  span: 7 | 5;
};

const FEATURES: Feature[] = [
  {
    label: "Prompt Communication",
    heading: "One direct line.",
    description:
      "The person you text is the person editing your footage. No agency, no account manager, nothing lost in between.",
    layout: "row",
    span: 7,
  },
  {
    label: "Same-Day Turnaround",
    heading: "Today.",
    description: "Your edited video lands the same day you send the footage.",
    layout: "col",
    span: 5,
  },
  {
    label: "Fast and Fully Remote",
    heading: "Anywhere.",
    description:
      "Last-minute requests are welcome, wherever you send the files from.",
    layout: "col",
    span: 5,
  },
  {
    label: "Serious Value",
    heading: "Professional quality. Lean footprint.",
    description:
      "No studio overhead on your invoice. You pay for the edit, not a team, while the quality stays fully professional.",
    layout: "row",
    accent: true,
    span: 7,
  },
];

function FeatureCard({ label, heading, description, layout, accent, span }: Feature) {
  return (
    <div
      className={`relative flex min-h-[280px] flex-col justify-between overflow-hidden rounded-[32px] p-8 sm:min-h-[320px] sm:p-10 ${
        span === 7 ? "sm:col-span-7" : "sm:col-span-5"
      } ${accent ? "bg-neutral-900" : "bg-[#181818]"}`}
    >
      {accent && (
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_0%_0%,rgba(88,28,135,0.55),transparent_70%)]" />
      )}

      <span className="relative font-montserrat text-[12px] leading-[16px] font-semibold tracking-[0.08em] text-[rgb(155,155,150)] uppercase">
        {label}
      </span>

      <div
        className={`relative mt-8 ${
          layout === "row"
            ? "flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"
            : "flex flex-col gap-2"
        }`}
      >
        <h3 className="font-montserrat text-[32px] leading-[34px] font-bold text-[rgb(244,244,242)] sm:text-[44px] sm:leading-[46px]">
          {heading}
        </h3>
        <p
          className={`font-montserrat text-[15px] leading-[24px] font-normal text-[rgb(155,155,150)] ${
            layout === "row" ? "sm:max-w-[220px]" : ""
          }`}
        >
          {description}
        </p>
      </div>
    </div>
  );
}

export function WhyChooseUs() {
  return (
    <section className="relative bg-black py-24 sm:py-32">
      <div className="mx-auto max-w-2xl px-6 text-center">
        <span className="font-montserrat text-[16px] leading-[26px] font-normal tracking-[0.2em] text-[rgb(155,155,150)] uppercase">
          Why ContentHouse
        </span>
        <h2 className="mt-4 font-montserrat text-[40px] leading-[42px] font-semibold text-[rgb(244,244,242)] sm:text-[54px] sm:leading-[55px]">
          Why people choose us.
        </h2>
      </div>

      <div className="mx-auto mt-16 max-w-6xl px-6">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-12">
          {FEATURES.map((feature) => (
            <FeatureCard key={feature.label} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
}
