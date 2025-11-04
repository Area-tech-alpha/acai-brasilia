const IMAGE_EXTENSION_REGEX = /\.(png|jpe?g|webp|gif|avif|svg|bmp|arw)$/i;

export const isSupportedImageUrl = (url?: string) => {
    if (!url) return false;
    try {
        const parsedUrl = new URL(url);
        return IMAGE_EXTENSION_REGEX.test(parsedUrl.pathname);
    } catch {
        const sanitizedPath = url.split("?")[0] || "";
        return IMAGE_EXTENSION_REGEX.test(sanitizedPath);
    }
};
