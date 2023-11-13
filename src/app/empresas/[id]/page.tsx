import CompanyForm from "@/features/companies/CompanyForm";
import prisma from "@/lib/prisma";
import { Company } from "@prisma/client";
import Link from "next/link";

export default async function CompanyPage({
  params,
}: {
  params: { id: number };
}) {
  const company = await prisma.company.findUnique({
    where: { id: Number(params.id) },
    include: { license: true },
  });

  const licenseOptions = await prisma.license.findMany();

  return (
    <main className="container py-16 bg-white h-full px-8">
      <div className="flex flex-wrap gap-8 justify-between items-center mb-8">
        <h1 className="text-3xl">Editar empresa {company?.name}</h1>

        <Link
          href="/"
          className="bg-blue-400 px-4 py-2 rounded-md text-white font-semibold shadow-md hover:-translate-y-0.5 duration-200"
        >
          Voltar para a listagem
        </Link>
      </div>

      <CompanyForm
        company={company as Company}
        licenseOptions={licenseOptions}
      />
    </main>
  );
}
