import { z } from "zod";

// Schema para validar array de números
export const arraySchema = z
  .string()
  .min(1, "Array não pode estar vazio")
  .refine((value) => {
    // Remover espaços e dividir por vírgula
    const parts = value.split(',').map(part => part.trim());
    
    // Verificar se todos os elementos são números válidos
    return parts.every(part => {
      const num = Number(part);
      return !isNaN(num) && isFinite(num);
    });
  }, "Array deve conter apenas números separados por vírgula")
  .refine((value) => {
    // Verificar se tem pelo menos 2 elementos
    const parts = value.split(',').map(part => part.trim()).filter(part => part !== '');
    return parts.length >= 2;
  }, "Array deve ter pelo menos 2 elementos");

// Schema para validar target
export const targetSchema = z
  .string()
  .min(1, "Target não pode estar vazio")
  .refine((value) => {
    const num = Number(value);
    return !isNaN(num) && isFinite(num);
  }, "Target deve ser um número válido");

// Schema completo para o formulário
export const customExampleSchema = z.object({
  nums: arraySchema,
  target: targetSchema,
});

// Função helper para converter string de array em array de números
export const parseArrayString = (arrayString) => {
  return arrayString
    .split(',')
    .map(part => part.trim())
    .filter(part => part !== '')
    .map(part => Number(part));
}; 