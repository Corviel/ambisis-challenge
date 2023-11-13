import Link from "next/link";
import CompanyForm from "@/features/companies/CompanyForm";

export default async function CreateCompanyPage() {
  return (
    <main className="container py-16 bg-white h-full px-8">
      <div className="flex justify-between items-center mb-16">
        <h1 className="text-3xl">Crie sua empresa</h1>

        <Link
          href="/"
          className="bg-blue-400 px-4 py-2 rounded-md text-white font-semibold shadow-md hover:-translate-y-0.5 duration-200"
        >
          Voltar para listagem
        </Link>
      </div>

      <section className="max-w-5xl mx-auto shadow-md border p-8 rounded-lg">
        <h2 className="text-xl mb-8 font-medium">
          Preencha os dados da sua empresa
        </h2>

        <CompanyForm />
      </section>
    </main>
  );
}
