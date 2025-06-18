import { z } from "zod";

export const arraySchema = z
  .string()
  .min(1, "validation.arrayRequired")
  .refine((value) => {
    const parts = value.split(',').map(part => part.trim()).filter(part => part !== '');
    return parts.every(part => !isNaN(Number(part)) && part !== '');
  }, "validation.arrayInvalidNumbers")
  .refine((value) => {
    const parts = value.split(',').map(part => part.trim()).filter(part => part !== '');
    return parts.length >= 2;
  }, "validation.arrayMinElements");

export const targetSchema = z
  .string()
  .min(1, "validation.targetRequired")
  .refine((value) => {
    const num = Number(value.trim());
    return !isNaN(num);
  }, "validation.targetInvalid");

export const customExampleSchema = z.object({
  nums: arraySchema,
  target: targetSchema,
});

export const parseArrayString = (arrayString) => {
  return arrayString
    .split(',')
    .map(part => part.trim())
    .filter(part => part !== '')
    .map(part => Number(part));
}; 