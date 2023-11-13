import { Prisma } from "@prisma/client";

// Mocks gerados pelo Chat GPT :D
export const mockCompanies: Prisma.CompanyUncheckedCreateInput[] = [
  {
    name: "Empresa A",
    cnpj: "12.345.678/9012-34",
    cep: "12345-678",
    state: "São Paulo",
    city: "São Paulo",
    neighborhood: "Centro",
    complement: "Andar 5, Sala 10",
  },
  {
    name: "Empresa B",
    cnpj: "98.765.432/1098-76",
    cep: "54321-876",
    state: "Rio de Janeiro",
    city: "Rio de Janeiro",
    neighborhood: "Copacabana",
    complement: "Bloco C, Apartamento 302",
  },
  {
    name: "Empresa C",
    cnpj: "55.555.555/5555-55",
    cep: "11111-111",
    state: "Minas Gerais",
    city: "Belo Horizonte",
    neighborhood: "Savassi",
    complement: "Conjunto 200",
  },
  {
    name: "Empresa D",
    cnpj: "99.999.999/9999-99",
    cep: "99999-999",
    state: "Bahia",
    city: "Salvador",
    neighborhood: "Barra",
    complement: "Torre Sul, Andar 15",
  },
  {
    name: "Empresa E",
    cnpj: "77.777.777/7777-77",
    cep: "88888-888",
    state: "Pernambuco",
    city: "Recife",
    neighborhood: "Boa Viagem",
    complement: "Loja 30",
  },
];
