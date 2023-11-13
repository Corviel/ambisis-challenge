"use server";

import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";

export async function deleteCompany(formData: FormData) {
  await prisma.company.delete({
    where: {
      id: formData.get("id") ? parseInt(formData.get("id") as string) : 0,
    },
  });

  redirect("/");
}
