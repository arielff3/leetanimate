import { z } from "zod";

export const pricesValidationSchema = (t) =>
  z.object({
    prices: z
      .string()
      .min(1, t('validation.pricesRequired'))
      .refine((val) => {
        const nums = val.split(',').map(n => n.trim());
        return nums.every(n => !isNaN(n) && Number(n) >= 0);
      }, t('validation.pricesInvalidNumbers'))
      .refine((val) => {
        const nums = val.split(',').map(n => n.trim());
        return nums.length >= 1 && nums.length <= 100;
      }, t('validation.pricesLength'))
  });
