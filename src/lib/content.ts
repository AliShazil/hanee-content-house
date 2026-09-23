import { del, list, put } from "@vercel/blob";
import { MAX_REELS, MAX_TESTIMONIALS } from "@/lib/limits";

export type Reel = {
  id: string;
  src: string;
};

export type Testimonial = {
  id: string;
  name: string;
  quote: string;
  // Empty string means no photo; the card falls back to the name's initial.
  image: string;
};

export type SiteContent = {
  reels: Reel[];
  testimonials: Testimonial[];
};

const CONTENT_PREFIX = "site-content/";

export const DEFAULT_CONTENT: SiteContent = {
  reels: [
    { id: "1", src: "https://zdccaqftbogey5lb.public.blob.vercel-storage.com/HV1.mp4" },
    { id: "2", src: "https://zdccaqftbogey5lb.public.blob.vercel-storage.com/HV2.mp4" },
    { id: "3", src: "https://zdccaqftbogey5lb.public.blob.vercel-storage.com/HV3.mp4" },
    { id: "4", src: "https://zdccaqftbogey5lb.public.blob.vercel-storage.com/HV4.mp4" },
    { id: "5", src: "https://zdccaqftbogey5lb.public.blob.vercel-storage.com/HV5.mp4" },
  ],
  testimonials: [
    {
      id: "alex",
      name: "Alex",
      image: "/Alex.png",
      quote:
        "My work with Hanee is amazing! He delivered the videos that I wanted just in time and brought me good results. I would definitely recommend him!",
    },
    {
      id: "george",
      name: "George",
      image: "/george.png",
      quote:
        "Working with Hanee was great. His editing turned out really well, he handled revisions easily, and the turnaround time was always quick. He really listened to what I wanted and made the whole process smooth. Super easy to work with and I'd recommend him to anyone looking for an editor.",
    },
    {
      id: "soocus",
      name: "Soocus",
      image: "/soocus.png",
      quote:
        "Working with Hanee has been an incredible experience. He is good at what he does! He always pays attention to the little details and makes sure the videos turn out great. He delivers on time and really knows how to bring ideas to life. I'd definitely recommend him!",
    },
  ],
};

// Every save writes a new, uniquely named JSON file and removes the older ones.
// Reading the newest file avoids the Blob CDN serving a cached copy of an
// overwritten file.
async function listContentFiles() {
  const { blobs } = await list({ prefix: CONTENT_PREFIX });
  return blobs.sort((a, b) => new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime());
}

export async function getContent(): Promise<SiteContent> {
  if (!process.env.BLOB_READ_WRITE_TOKEN) return DEFAULT_CONTENT;

  try {
    const [latest] = await listContentFiles();
    if (!latest) return DEFAULT_CONTENT;

    const res = await fetch(latest.url);
    if (!res.ok) return DEFAULT_CONTENT;

    const data = (await res.json()) as Partial<SiteContent>;
    return {
      reels: (data.reels ?? DEFAULT_CONTENT.reels).slice(0, MAX_REELS),
      testimonials: (data.testimonials ?? DEFAULT_CONTENT.testimonials).slice(0, MAX_TESTIMONIALS),
    };
  } catch (error) {
    console.error("Failed to load site content from Blob", error);
    return DEFAULT_CONTENT;
  }
}

export async function saveContent(content: SiteContent) {
  const previous = await listContentFiles();

  await put(`${CONTENT_PREFIX}content.json`, JSON.stringify(content), {
    access: "public",
    addRandomSuffix: true,
    contentType: "application/json",
  });

  if (previous.length > 0) {
    await del(previous.map((blob) => blob.url));
  }
}
