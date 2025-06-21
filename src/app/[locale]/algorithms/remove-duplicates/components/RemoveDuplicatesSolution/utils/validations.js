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
      return parts.length >= 1;
    }, "Array deve ter pelo menos 1 elemento");

  const customExampleSchema = z.object({
    nums: arraySchema
  });

  return { arraySchema, customExampleSchema };
};

export const parseArrayString = (arrayString) => {
  return arrayString
    .split(',')
    .map(part => part.trim())
    .filter(part => part !== '')
    .map(part => Number(part));
};

export const sortArray = (nums) => {
  return [...nums].sort((a, b) => a - b);
}; 