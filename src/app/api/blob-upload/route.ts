import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";
import { isAdmin } from "@/lib/auth";
import { getContent } from "@/lib/content";
import { MAX_PHOTO_BYTES, MAX_REELS, MAX_VIDEO_BYTES, PHOTOS_FOLDER, REELS_FOLDER } from "@/lib/limits";

export async function POST(request: Request) {
  if (!(await isAdmin())) {
    return Response.json({ error: "Not signed in." }, { status: 401 });
  }

  const body = (await request.json()) as HandleUploadBody;

  try {
    const result = await handleUpload({
      body,
      request,
      // clientPayload is "add" when uploading a brand-new video slot.
      onBeforeGenerateToken: async (pathname, clientPayload) => {
        if (pathname.startsWith(REELS_FOLDER)) {
          if (clientPayload === "add") {
            const { reels } = await getContent();
            if (reels.length >= MAX_REELS) throw new Error(`You can have at most ${MAX_REELS} videos.`);
          }
          return {
            allowedContentTypes: ["video/*"],
            maximumSizeInBytes: MAX_VIDEO_BYTES,
            addRandomSuffix: true,
          };
        }
        if (pathname.startsWith(PHOTOS_FOLDER)) {
          return {
            allowedContentTypes: ["image/*"],
            maximumSizeInBytes: MAX_PHOTO_BYTES,
            addRandomSuffix: true,
          };
        }
        throw new Error("Unsupported upload path.");
      },
    });

    return Response.json(result);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Upload failed.";
    return Response.json({ error: message }, { status: 400 });
  }
}
