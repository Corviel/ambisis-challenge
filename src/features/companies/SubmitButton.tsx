import prisma from "@/lib/prisma";
import { Company } from "@prisma/client";
import { useFormStatus } from "react-dom";

export function SubmitButton({
  text,
  company,
  onDeleteModalOpen,
}: {
  text: string;
  company?: Company;
  onDeleteModalOpen: () => void;
}) {
  const { pending } = useFormStatus();

  return (
    <div className="flex flex-wrap gap-4 justify-end mt-8">
      {company && (
        <>
          <button
            type="button"
            onClick={onDeleteModalOpen}
            className="bg-red-400 px-4 py-2 rounded-md text-white font-semibold shadow-md hover:bg-white hover:text-red-400"
          >
            Deletar empresa
          </button>
        </>
      )}

      <button
        disabled={pending}
        type="submit"
        className="bg-blue-400 px-4 py-2 rounded-md text-white font-semibold shadow-md hover:bg-white hover:text-blue-400 disabled:opacity-50"
      >
        {text}
      </button>
    </div>
  );
}
