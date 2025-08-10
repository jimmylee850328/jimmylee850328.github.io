import { PhotoSize, PhotoConfig } from '@/types/id-photo';

// All measurements are defined in millimeters (mm) and converted to pixels using DPI before drawing
// 4x6 postcard (machine display 14.8cm x 10cm, landscape)
const SHEET_WIDTH_MM = 148; // 14.8 cm
const SHEET_HEIGHT_MM = 100; // 10 cm

// Recommended output DPI
export const DEFAULT_DPI = 300;
const MM_PER_INCH = 25.4;
const pxPerMm = (dpi: number) => dpi / MM_PER_INCH;
const mmToPx = (mm: number, dpi: number) => Math.round(mm * pxPerMm(dpi));

// Printing sheet configuration (unit: mm)
const PHOTO_CONFIGS: Record<PhotoSize, PhotoConfig> = {
  '2inch': {
    size: '2inch',
    photosPerSheet: 8,
    photoWidth: 35,
    photoHeight: 45,
    sheetWidth: SHEET_WIDTH_MM,
    sheetHeight: SHEET_HEIGHT_MM,
  },
  '1inch': {
    size: '1inch',
    photosPerSheet: 10,
    photoWidth: 25,
    photoHeight: 35,
    sheetWidth: SHEET_WIDTH_MM,
    sheetHeight: SHEET_HEIGHT_MM,
  },
};

interface PhotoPosition {
  x: number;
  y: number;
  width: number;
  height: number;
}

/**
 * Calculate photo positions on the canvas
 */
export function calculatePhotoPositions(
  photoSize: PhotoSize,
  dpi: number = DEFAULT_DPI
): PhotoPosition[] {
  const positions: PhotoPosition[] = [];

  const config = PHOTO_CONFIGS[photoSize];

  const columns = photoSize === '2inch' ? 4 : 5;
  const rows = 2;

  const photoWidthPx = mmToPx(config.photoWidth, dpi);
  const photoHeightPx = mmToPx(config.photoHeight, dpi);

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < columns; col++) {
      positions.push({
        x: col * photoWidthPx,
        y: row * photoHeightPx,
        width: photoWidthPx,
        height: photoHeightPx,
      });
    }
  }

  return positions;
}

/**
 * Generate ID photos sheet
 */
export async function generateIDPhotos(
  croppedImageUrl: string,
  photoSize: PhotoSize,
  dpi: number = DEFAULT_DPI
): Promise<string> {
  const config = PHOTO_CONFIGS[photoSize];
  const positions = calculatePhotoPositions(photoSize, dpi);

  // Convert canvas size by DPI to ensure exact physical output size
  const sheetWidthPx = mmToPx(config.sheetWidth, dpi);
  const sheetHeightPx = mmToPx(config.sheetHeight, dpi);

  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  if (!ctx) {
    throw new Error('Cannot create canvas context');
  }

  canvas.width = sheetWidthPx;
  canvas.height = sheetHeightPx;

  ctx.fillStyle = '#FFFFFF';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const img = new Image();
  img.crossOrigin = 'anonymous';

  await new Promise((resolve, reject) => {
    img.onload = resolve as () => void;
    img.onerror = reject as (err: unknown) => void;
    img.src = croppedImageUrl;
  });

  positions.forEach(({ x, y, width, height }) => {
    ctx.drawImage(img, x, y, width, height);

    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 1;
    ctx.setLineDash([3, 3]);
    ctx.strokeRect(x, y, width, height);
  });

  ctx.setLineDash([]);

  return canvas.toDataURL('image/jpeg', 1.0);
}

/**
 * Download photo
 */
export function downloadPhoto(
  photoUrl: string,
  photoSize: PhotoSize,
  index: number = 0
): void {
  const link = document.createElement('a');
  link.download = `id-photo_${photoSize}_${index + 1}.jpg`;
  link.href = photoUrl;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

/**
 * Get photo configuration
 */
export function getPhotoConfig(photoSize: PhotoSize): PhotoConfig {
  return PHOTO_CONFIGS[photoSize];
}

/**
 * Validate image file type
 */
export function validateImageFormat(file: File): boolean {
  return file.type.startsWith('image/');
}

/**
 * Validate image file size (max 10MB)
 */
export function validateImageSize(file: File): boolean {
  const maxSize = 10 * 1024 * 1024; // 10MB
  return file.size <= maxSize;
}
