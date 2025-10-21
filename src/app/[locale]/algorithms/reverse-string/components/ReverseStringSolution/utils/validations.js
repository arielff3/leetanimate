import { z } from "zod";

export const stringValidationSchema = (t) =>
  z.object({
    string: z
      .string()
      .min(1, t('validation.stringRequired'))
      .refine((val) => {
        const chars = val.split(',').map(c => c.trim());
        return chars.every(c => c.length === 1 && /^[a-zA-Z]$/.test(c));
      }, t('validation.stringInvalidChars'))
      .refine((val) => {
        const chars = val.split(',').map(c => c.trim());
        return chars.length >= 1 && chars.length <= 1000;
      }, t('validation.stringLength'))
  });
