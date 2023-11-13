import { License } from "@/features/licenses/License";
import prisma from "@/lib/prisma";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function Home() {
  const licenses = await prisma.license.findMany();

  return (
    <main className="container py-16 bg-white h-full px-8">
      <div className="flex justify-between items-center gap-8 mb-8">
        <h1 className="text-3xl">Licenças</h1>

        <Link
          href="/"
          className="ml-auto bg-black px-4 py-2 rounded-md text-white font-semibold shadow-md hover:-translate-y-0.5 duration-200"
        >
          Empresas
        </Link>

        <Link
          href="/licencas/criar"
          className="bg-green-400 px-4 py-2 rounded-md text-white font-semibold shadow-md hover:-translate-y-0.5 duration-200"
        >
          Criar licença
        </Link>
      </div>

      <section className="grid md:grid-cols-2 xl:grid-cols-4 gap-8">
        {licenses?.map((license) => {
          return (
            <Link href={`/licencas/${license.id}`} key={license.id}>
              <License license={license} />
            </Link>
          );
        })}
      </section>
    </main>
  );
}
