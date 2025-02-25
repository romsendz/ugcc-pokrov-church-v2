import { z } from "zod";

export const VisibilityToggleFormSchema = z.object({
  visibility: z.boolean(),
});

// Type Inference for Form Values
export type VisibilityToggleFormValues = z.infer<
  typeof VisibilityToggleFormSchema
>;
