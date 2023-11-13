"use server";

import prisma from "@/lib/prisma";
import { CompanySchema } from "./companySchema";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function upsertCompany(previousState: any, formData: FormData) {
  const companyData = {
    id: formData.get("id") ?? null,
    name: formData.get("name"),
    cnpj: formData.get("cnpj"),
    cep: formData.get("cep"),
    state: formData.get("state"),
    city: formData.get("city"),
    neighborhood: formData.get("neighborhood"),
    complement: formData.get("complement"),
    license: formData.getAll("license"),
  };

  const parsedResult = CompanySchema.safeParse(companyData);

  if (!parsedResult.success) {
    let errorMessage = "";

    parsedResult.error.issues.forEach((issue) => {
      errorMessage = errorMessage + issue.message + "\n";
    });

    return { error: errorMessage };
  }

  const { id, license, ...rest } = parsedResult.data;

  const filteredLicenses = license.filter(Boolean);

  const hasLicenses = filteredLicenses.length > 0;

  const licenseRelation = (action: "set" | "connect") => {
    if (!hasLicenses) {
      return;
    }

    return {
      [action]: license?.map((license) => {
        return { id: parseInt(license) };
      }),
    };
  };

  try {
    await prisma.company.upsert({
      where: { id: id },
      create: { ...rest, license: licenseRelation("connect") },
      update: { ...rest, license: licenseRelation("set") },
    });

    if (hasLicenses) {
      await prisma.license.updateMany({
        where: { id: { in: license?.map((license) => parseInt(license)) ?? [] } },
        data: { companyId: { set: id } },
      });
    } else {
      await prisma.license.updateMany({
        where: { companyId: id },
        data: { companyId: { set: null } },
      });
    }
  } catch (error) {
    return {
      company: previousState.company,
      error: "Algo deu errado no servidor, tente novamente mais tarde!",
    };
  }

  revalidatePath("/");
  redirect("/");
}
