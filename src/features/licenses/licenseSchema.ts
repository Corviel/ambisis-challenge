import { z } from "zod";

export const LicenseSchema = z.object({
  id: z.string().nullable(),
  number: z.string(),
  environmentalAgency: z.string(),
  emission: z.date(),
  validity: z.date(),
});
