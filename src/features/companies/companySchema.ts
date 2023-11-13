import { z } from "zod";

export const CompanySchema = z.object({
  id: z.string().transform((arg) => {
    const numberArg = Number(arg);

    if (isNaN(numberArg)) {
      return 0;
    }

    return numberArg;
  }),
  name: z
    .string()
    .min(3, { message: "O nome da empresa deve ter pelo menos 3 caracteres." }),
  cnpj: z
    .string()
    .length(18, { message: "Por favor, digite o CNPJ completo." }),
  cep: z.string().length(9, { message: "Por favor, digite o CEP completo." }),
  state: z.string(),
  city: z.string(),
  neighborhood: z.string(),
  complement: z.string().nullable(),

  license: z.array(z.string()),
});
