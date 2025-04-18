import { pdfBlockMappingForDefaultSchema } from "./blocks.js";
import { pdfInlineContentMappingForDefaultSchema } from "./inlinecontent.js";
import { pdfStyleMappingForDefaultSchema } from "./styles.js";

export const pdfDefaultSchemaMappings: {
  blockMapping: typeof pdfBlockMappingForDefaultSchema;
  inlineContentMapping: typeof pdfInlineContentMappingForDefaultSchema;
  styleMapping: typeof pdfStyleMappingForDefaultSchema;
} = {
  blockMapping: pdfBlockMappingForDefaultSchema,
  inlineContentMapping: pdfInlineContentMappingForDefaultSchema,
  styleMapping: pdfStyleMappingForDefaultSchema,
};
