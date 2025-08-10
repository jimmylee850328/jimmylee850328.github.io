export type PhotoSize = '1inch' | '2inch';

export interface PhotoConfig {
  size: PhotoSize;
  photosPerSheet: number;
  photoWidth: number; // mm
  photoHeight: number; // mm
  sheetWidth: number; // mm
  sheetHeight: number; // mm
}

export interface CropArea {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface GeneratedPhoto {
  id: string;
  dataUrl: string;
  downloadUrl?: string;
}
