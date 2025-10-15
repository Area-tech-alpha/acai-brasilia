import { ALLOWED_IMAGE_HOSTS } from "./constants";

const IMAGE_EXTENSION_REGEX = /\.(png|jpe?g|webp|gif|avif|svg|bmp|arw)$/i;

export const isSupportedImageUrl = (url?: string) => {
    if (!url) return false;
    try {
        const parsedUrl = new URL(url);
        if (ALLOWED_IMAGE_HOSTS.includes(parsedUrl.hostname as (typeof ALLOWED_IMAGE_HOSTS)[number])) {
            return true;
        }
        return IMAGE_EXTENSION_REGEX.test(parsedUrl.pathname);
    } catch {
        const sanitizedPath = url.split("?")[0] || "";
        return IMAGE_EXTENSION_REGEX.test(sanitizedPath);
    }
};
