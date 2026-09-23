import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin · ContentHouse",
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: LayoutProps<"/admin">) {
  return <div className="flex flex-1 flex-col bg-black pt-24">{children}</div>;
}
