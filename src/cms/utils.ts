import { format, isSameMonth } from 'date-fns';

export function getImageSrc(src: string): string {
  return `${process.env.NEXT_PUBLIC_CMS_UPLOADS}${src}`;
}

export function formatDateRange(startDate: Date, endDate: Date): string {
  if (isSameMonth(startDate, endDate)) {
    return `${format(startDate, 'dd.')} - ${format(endDate, 'dd.MM.yyyy')}`;
  } else {
    return `${format(startDate, 'dd.MM.')} - ${format(endDate, 'dd.MM.yyyy')}`;
  }
}

export function getDomain(url: string): string {
  const parsedUrl = new URL(url);
  return `${parsedUrl.protocol}//${parsedUrl.hostname}/`;
}
