import { z } from "zod";

export const createValidationSchemas = (t) => {
  const arraySchema = z
    .string()
    .min(1, t("validation.arrayRequired"))
    .refine((value) => {
      const parts = value.split(',').map(part => part.trim()).filter(part => part !== '');
      return parts.every(part => !isNaN(Number(part)) && part !== '');
    }, t("validation.arrayInvalidNumbers"))
    .refine((value) => {
      const parts = value.split(',').map(part => part.trim()).filter(part => part !== '');
      return parts.length >= 2;
    }, t("validation.arrayMinElements"));

  const targetSchema = z
    .string()
    .min(1, t("validation.targetRequired"))
    .refine((value) => {
      const num = Number(value.trim());
      return !isNaN(num);
    }, t("validation.targetInvalid"));

  const customExampleSchema = z.object({
    nums: arraySchema,
    target: targetSchema
  });

  return { arraySchema, targetSchema, customExampleSchema };
};

export const parseArrayString = (arrayString) => {
  return arrayString
    .split(',')
    .map(part => part.trim())
    .filter(part => part !== '')
    .map(part => Number(part));
}; 