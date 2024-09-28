export function getImageSrc(src: string): string {
  return `${process.env.NEXT_PUBLIC_CMS_UPLOADS}${src}`;
}
