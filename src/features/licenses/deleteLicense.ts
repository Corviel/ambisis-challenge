"use server";

import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";

export async function deleteLicense(formData: FormData) {
  await prisma.license.delete({
    where: {
      id: formData.get("id") ? parseInt(formData.get("id") as string) : 0,
    },
  });

  redirect("/licencas/");
}
