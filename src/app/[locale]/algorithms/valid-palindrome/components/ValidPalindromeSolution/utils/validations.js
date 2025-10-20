import { z } from "zod";

export const stringValidationSchema = (t) =>
  z.object({
    string: z
      .string()
      .min(1, t('validation.palindromeRequired'))
      .max(200, t('validation.palindromeLength'))
      .refine((val) => {
        return /^[ -~]*$/.test(val);
      }, t('validation.palindromeInvalidChars'))
  });
