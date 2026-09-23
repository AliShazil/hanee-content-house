// Hard limits for the admin dashboard. The server enforces every one of these;
// the dashboard only reads them to show friendly messages up front.

const MB = 1024 * 1024;

export const MIN_REELS = 1;
export const MAX_REELS = 10;
export const MAX_VIDEO_BYTES = 20 * MB;

export const MAX_TESTIMONIALS = 20;
export const MAX_PHOTO_BYTES = 5 * MB;
export const MAX_NAME_LENGTH = 80;
export const MAX_QUOTE_LENGTH = 1000;

export const REELS_FOLDER = "reels/";
export const PHOTOS_FOLDER = "testimonials/";

export function formatMB(bytes: number) {
  return `${Math.round(bytes / MB)} MB`;
}
