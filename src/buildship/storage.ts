import { Storage } from "@google-cloud/storage";

export const bucket = process.env.BUCKET
  ? new Storage().bucket(process.env.BUCKET)
  : null;
