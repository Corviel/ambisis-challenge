import type { License } from "@prisma/client";
import { format } from "date-fns";

type Props = {
  license: License;
};

export function License({ license }: Props) {
  return (
    <article className="hover:shadow-md border rounded-lg p-4">
      <p className="text-sm mb-4">
        <span className="text-neutral-400 font-medium">Órgão Ambiental: </span>
        <strong>{license.environmentalAgency}</strong>
      </p>
      <p className="text-sm mb-4">
        <span className="text-neutral-400 font-medium">
          Número da licença:{" "}
        </span>
        <strong>{license.number}</strong>
      </p>

      <p className="text-sm mb-2">
        <span className="text-neutral-400 font-medium">Data de emissão: </span>
        <strong>{format(license.emission, "dd/MM/yyyy")}</strong>
      </p>

      <p className="text-sm mb-2">
        <span className="text-neutral-400 font-medium">Data de emissão: </span>
        <strong>{format(license.validity, "dd/MM/yyyy")}</strong>
      </p>
    </article>
  );
}
