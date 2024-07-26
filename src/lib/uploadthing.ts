import { OurFileRouter } from "@/app/api/uploadthing/core";
import { generateReactHelpers } from "@uploadthing/react";

// file upload service provider
export const { useUploadThing, uploadFiles } =
  generateReactHelpers<OurFileRouter>();
