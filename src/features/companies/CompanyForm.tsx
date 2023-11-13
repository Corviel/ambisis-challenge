"use client";

import { TextFieldset } from "@/components/TextFieldset";
import { upsertCompany } from "./upsertCompany";
import toast from "react-hot-toast";
import { SubmitButton } from "./SubmitButton";
import { useRef } from "react";
import { Company, License } from "@prisma/client";
import { useFormState } from "react-dom";
import { deleteCompany } from "./deleteCompany";
import ReactSelect from "react-select";
import Link from "next/link";

type Props = {
  company?: Company & { license?: License[] };
  licenseOptions?: License[];
};

export default function CompanyForm({ company, licenseOptions }: Props) {
  const [state, formAction] = useFormState(upsertCompany, {
    company,
    error: "",
  });

  const dialogRef = useRef<HTMLDialogElement>(null);

  if (state?.error) {
    toast.error(state?.error);
  }

  function onDeleteModalOpen() {
    dialogRef.current?.showModal();
  }

  function onDeleteModalClose() {
    dialogRef.current?.close();
  }

  const options = licenseOptions?.map((license) => ({
    value: license.id,
    label: `${license.number} - ${license.environmentalAgency}`,
    selected: company?.license?.some(
      (companyLicense) => companyLicense.id === license.id,
    ),
  }));

  return (
    <>
      <form action={formAction}>
        <div className="grid lg:grid-cols-12 gap-8 mb-4">
          <input
            type="text"
            name="id"
            className="sr-only"
            defaultValue={company?.id ?? ""}
          />
          <TextFieldset
            defaultValue={state?.company?.name ?? ""}
            className="lg:col-span-4"
            label="Nome"
            inputName="name"
            placeholder="Ambisis"
            maxlength={20}
            required
          />
          <TextFieldset
            defaultValue={state?.company?.cnpj}
            className="lg:col-span-4"
            label="CNPJ"
            inputName="cnpj"
            placeholder="XX.XXX.XXX/0001-XX"
            mask="99.999.999/9999-99"
            required
          />
          <TextFieldset
            defaultValue={state?.company?.cep}
            className="lg:col-span-4"
            label="CEP"
            inputName="cep"
            placeholder="XXXXX-XXX"
            mask="99999-999"
            required
          />

          <TextFieldset
            defaultValue={state?.company?.state}
            className="lg:col-span-3"
            label="Estado"
            inputName="state"
            placeholder="Santa Catarina"
            maxlength={20}
            required
          />
          <TextFieldset
            defaultValue={state?.company?.city}
            className="lg:col-span-3"
            label="Cidade"
            inputName="city"
            placeholder="Blumenau"
            maxlength={20}
            required
          />
          <TextFieldset
            defaultValue={state?.company?.neighborhood}
            className="lg:col-span-3"
            label="Bairro"
            inputName="neighborhood"
            placeholder="Centro"
            maxlength={20}
            required
          />
          <TextFieldset
            defaultValue={state?.company?.complement ?? ""}
            className="lg:col-span-3"
            label="Complemento"
            inputName="complement"
            placeholder="Centro de Inovação"
            maxlength={20}
          />
        </div>

        <div className="mb-4">
          <label
            className="block w-fit text-sm font-medium text-gray-900 leading-none mb-2"
            htmlFor="licenses"
          >
            Licenças desta empresa
          </label>
          <ReactSelect
            isMulti
            options={options}
            defaultValue={options?.filter((option) => option.selected) ?? []}
            name="license"
            id="license"
          />
        </div>

        <Link
          href="/licencas/criar"
          className="inline-block bg-green-400 px-4 py-2 rounded-md text-white font-semibold shadow-md hover:bg-white hover:text-blue-400 disabled:opacity-50"
        >
          Criar licença
        </Link>

        {/* O componente com loading tem que ser um componente próprio. Referência: https://react.dev/reference/react-dom/hooks/useFormStatus */}
        <SubmitButton
          company={company}
          text={company ? "Editar empresa" : "Criar empresa"}
          onDeleteModalOpen={onDeleteModalOpen}
        />
      </form>

      <dialog ref={dialogRef} id="delete_modal" className="modal">
        <div className="modal-box rounded-md">
          <h3 className="font-bold text-lg">
            Deseja realmente deletar esta empresa?
          </h3>
          <p className="py-4">Ao clicar confirmar, esta ação não terá volta.</p>
          <div className="modal-action">
            <form className="flex flex-wrap gap-4" action={deleteCompany}>
              <input
                type="hidden"
                name="id"
                className="sr-only"
                defaultValue={company?.id}
              />
              <button
                type="button"
                className="btn"
                onClick={onDeleteModalClose}
              >
                Cancelar
              </button>
              <button className="btn bg-red-400 text-white">Confirmar</button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
}
