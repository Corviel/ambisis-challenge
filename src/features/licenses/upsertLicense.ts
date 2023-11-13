"use server";

import prisma from "@/lib/prisma";
import { LicenseSchema } from "./licenseSchema";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function upsertLicense(previousState: any, formData: FormData) {
  const licenseData = {
    id: formData.get("id") ?? null,
    number: formData.get("number"),
    environmentalAgency: formData.get("environmentalAgency"),
    emission: formData.get("emission")
      ? new Date(formData.get("emission") as string)
      : null,
    validity: formData.get("validity")
      ? new Date(formData.get("validity") as string)
      : null,
  };

  const parsedResult = LicenseSchema.safeParse(licenseData);

  if (!parsedResult.success) {
    let errorMessage = "";

    parsedResult.error.issues.forEach((issue) => {
      errorMessage = errorMessage + issue.message + "\n";
    });

    return { error: errorMessage };
  }

  const { id, ...rest } = parsedResult.data;

  try {
    await prisma.license.upsert({
      where: { id: id ? parseInt(id) : 0 },
      create: rest,
      update: rest,
    });
  } catch (error) {
    return {
      license: previousState.license,
      error: "Algo deu errado no servidor, tente novamente mais tarde!",
    };
  }

  revalidatePath("/");
  redirect("/");
}
