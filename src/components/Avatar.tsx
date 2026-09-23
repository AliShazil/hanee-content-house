import Image from "next/image";

export function Avatar({ name, image, size = 44 }: { name: string; image: string; size?: number }) {
  if (image) {
    return (
      <Image
        src={image}
        alt=""
        width={size}
        height={size}
        className="shrink-0 rounded-full object-cover"
        style={{ width: size, height: size }}
      />
    );
  }

  return (
    <span
      aria-hidden="true"
      className="flex shrink-0 items-center justify-center rounded-full bg-violet-600 font-montserrat font-semibold text-white"
      style={{ width: size, height: size, fontSize: size * 0.4 }}
    >
      {name.trim().charAt(0).toUpperCase() || "?"}
    </span>
  );
}
