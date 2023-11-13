import { Company } from "@/features/companies/Company";
import prisma from "@/lib/prisma";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function Home() {
  const companies = await prisma.company.findMany();

  return (
    <main className="container py-16 bg-white h-full px-8">
      <div className="flex justify-between items-center gap-8 mb-8">
        <h1 className="text-3xl">Empresas</h1>

        <Link
          href="/licencas/"
          className="ml-auto bg-green-400 px-4 py-2 rounded-md text-white font-semibold shadow-md hover:-translate-y-0.5 duration-200"
        >
          Licenças
        </Link>
        <Link
          href="/empresas/criar"
          className="bg-blue-400 px-4 py-2 rounded-md text-white font-semibold shadow-md hover:-translate-y-0.5 duration-200"
        >
          Criar empresa
        </Link>
      </div>

      <section className="grid md:grid-cols-2 xl:grid-cols-4 gap-8">
        {companies.map((company) => {
          return (
            <Link href={`/empresas/${company.id}`} key={company.id}>
              <Company company={company} />
            </Link>
          );
        })}
      </section>
    </main>
  );
}
