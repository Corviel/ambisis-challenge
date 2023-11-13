import CompanyForm from "@/features/companies/CompanyForm";
import LicenseForm from "@/features/licenses/LicenseForm";
import prisma from "@/lib/prisma";
import { License } from "@prisma/client";
import Link from "next/link";

export default async function LicensePage({
  params,
}: {
  params: { id: number };
}) {
  const license = await prisma.license.findUnique({
    where: { id: Number(params.id) },
  });

  const licenseOptions = await prisma.license.findMany();

  return (
    <main className="container py-16 bg-white h-full px-8">
      <div className="flex flex-wrap gap-8 justify-between items-center mb-8">
        <h1 className="text-3xl">Editar licença de número {license?.number}</h1>

        <Link
          href="/licencas/"
          className="bg-blue-400 px-4 py-2 rounded-md text-white font-semibold shadow-md hover:-translate-y-0.5 duration-200"
        >
          Voltar para a listagem
        </Link>
      </div>

      <LicenseForm license={license as License} />
    </main>
  );
}
