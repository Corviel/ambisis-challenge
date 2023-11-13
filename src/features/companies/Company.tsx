import type { Company } from "@prisma/client";

type Props = {
  company: Company;
};

export function Company({ company }: Props) {
  return (
    <article className="hover:shadow-md border rounded-lg p-4">
      <h2 className="font-semibold mb-2">{company.name}</h2>
      <p className="text-sm mb-4">
        <span className="text-neutral-400 font-medium">CNPJ: </span>
        <strong>{company.cnpj}</strong>
      </p>

      <h3 className="font-medium mb-2">Localização</h3>
      <p className="text-sm mb-2">
        <span className="text-neutral-400 font-medium">CEP: </span>
        <strong>{company.cep}</strong>
      </p>

      <p className="text-sm">
        <span className="text-neutral-400 font-medium">Estado: </span>
        <strong>{company.state}</strong>
      </p>

      <p className="text-sm">
        <span className="text-neutral-400 font-medium">Cidade: </span>
        <strong>{company.city}</strong>
      </p>

      <p className="text-sm">
        <span className="text-neutral-400 font-medium">Bairro: </span>
        <strong>{company.neighborhood}</strong>
      </p>

      <p className="text-sm">
        <span className="text-neutral-400 font-medium">Complemento: </span>
        <strong>{company.complement}</strong>
      </p>
    </article>
  );
}
