import { FileUpload } from 'graphql-upload-minimal';
import path from 'path';
import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';
import sanitize from 'sanitize-filename';
import sharp from 'sharp';

const UPLOADS_PATH =
  process.env.NODE_ENV === 'production' ? '/var/www/html/uploads' : path.join(__dirname, 'uploads');

const MAX_SIZE = 10 * 1024 * 1024;
const ALLOWED_EXTENSIONS = ['.jpg', '.jpeg', '.gif', '.png'];
const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/png', 'image/gif'];
const MAX_WIDTH = 4000;
const MAX_HEIGHT = 4000;
const MIN_ASPECT_RATIO = 0.2;
const MAX_ASPECT_RATIO = 5;

export const uploadFile = async (
  file: FileUpload,
  username?: string
): Promise<{ success: boolean; message: string; url?: string }> => {
  try {
    const { createReadStream, filename, mimetype } = await file;

    const sanitizedFilename = sanitize(filename);
    if (!sanitizedFilename) {
      return { success: false, message: 'Invalid filename.' };
    }

    const fileExtension = path.extname(sanitizedFilename).toLowerCase();

    if (!ALLOWED_EXTENSIONS.includes(fileExtension)) {
      return {
        success: false,
        message: `Invalid file type. Only ${ALLOWED_EXTENSIONS.join(', ')} are allowed.`,
      };
    }

    if (!ALLOWED_MIME_TYPES.includes(mimetype)) {
      return {
        success: false,
        message: `Invalid MIME type. Allowed types are: ${ALLOWED_MIME_TYPES.join(', ')}.`,
      };
    }

    const stream = createReadStream();
    const chunks: Buffer[] = [];
    let totalBytes = 0;

    return new Promise<{ success: boolean; message: string; url?: string }>((resolve, reject) => {
      stream.on('data', (chunk: Buffer) => {
        totalBytes += chunk.length;
        if (totalBytes > MAX_SIZE) {
          stream.destroy(new Error('File size exceeds the 10MB limit.'));
          return;
        }
        chunks.push(chunk);
      });

      stream.on('error', (err) => {
        reject({ success: false, message: err.message || 'File upload failed.' });
      });

      stream.on('end', async () => {
        try {
          const buffer = Buffer.concat(chunks);

          const metadata = await sharp(buffer).metadata();

          if (!metadata.width || !metadata.height) {
            return resolve({ success: false, message: 'Unable to determine image dimensions.' });
          }

          if (metadata.width > MAX_WIDTH || metadata.height > MAX_HEIGHT) {
            return resolve({
              success: false,
              message: `Image dimensions exceed the allowed limit of ${MAX_WIDTH}x${MAX_HEIGHT} pixels.`,
            });
          }

          const aspectRatio = metadata.width / metadata.height;

          if (aspectRatio < MIN_ASPECT_RATIO || aspectRatio > MAX_ASPECT_RATIO) {
            return resolve({
              success: false,
              message: `Image aspect ratio (${aspectRatio.toFixed(
                2
              )}:1) is outside the allowed range of ${MIN_ASPECT_RATIO}:1 to ${MAX_ASPECT_RATIO}:1.`,
            });
          }

          const uniqueFilename = username
            ? `${sanitize(username)}-${uuidv4()}${fileExtension}`
            : `${uuidv4()}-${sanitizedFilename}`;

          const filepath = path.join(UPLOADS_PATH, uniqueFilename);

          fs.mkdirSync(UPLOADS_PATH, { recursive: true });

          fs.writeFile(filepath, buffer, (err) => {
            if (err) {
              return resolve({ success: false, message: 'Failed to save the file.' });
            }

            return resolve({
              success: true,
              message: 'File uploaded successfully',
              url: `/uploads/${uniqueFilename}`,
            });
          });
        } catch (error: any) {
          return resolve({ success: false, message: error.message || 'File processing failed.' });
        }
      });
    });
  } catch (error: any) {
    return { success: false, message: error.message || 'File upload failed.' };
  }
};

export const deleteFile = async (url: string): Promise<{ success: boolean; message: string }> => {
  try {
    const filename = path.basename(url);

    const filepath = path.join(UPLOADS_PATH, filename);
    if (!fs.existsSync(filepath)) {
      return { success: false, message: 'File does not exist' };
    }

    await new Promise<void>((resolve, reject) => {
      fs.unlink(filepath, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });

    return { success: true, message: 'File deleted successfully' };
  } catch (err) {
    console.error('Error deleting file:', err);
    return { success: false, message: 'Error deleting file' };
  }
};
