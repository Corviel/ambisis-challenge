"use client";

import { TextFieldset } from "@/components/TextFieldset";
import { upsertLicense } from "./upsertLicense";
import toast from "react-hot-toast";
import { useState, useRef } from "react";
import { License } from "@prisma/client";
import { useFormState } from "react-dom";
import { deleteLicense } from "./deleteLicense";
import { SubmitButton } from "./SubmitButton";
import DatePicker from "react-date-picker";

// Boilerplate do react-date-picker. Referência: https://www.npmjs.com/package/react-date-picker
type Emission = Date | null;
type EmissionDate = Emission | [Emission, Emission];

type Validity = Date | null;
type ValidityDate = Emission | [Validity, Validity];

type Props = {
  license?: License;
};

export default function LicenseForm({ license }: Props) {
  const [state, formAction] = useFormState(upsertLicense, {
    license,
    error: "",
  });

  const [emissionDate, setEmissionDate] = useState<EmissionDate>(new Date());
  const [validityDate, setValidityDate] = useState<ValidityDate>(new Date());

  const modalRef = useRef<HTMLDialogElement>(null);

  if (state?.error) {
    toast.error(state?.error);
  }

  function onDeleteModalOpen() {
    modalRef.current?.showModal();
  }

  function onDeleteModalClose() {
    modalRef.current?.close();
  }

  return (
    <>
      <form action={formAction}>
        <div className="grid lg:grid-cols-12 gap-8 mb-4">
          <input
            type="text"
            name="id"
            className="sr-only"
            defaultValue={license?.id ?? ""}
          />
          <TextFieldset
            defaultValue={state?.license?.number ?? ""}
            className="lg:col-span-6"
            label="Número da licença"
            inputName="number"
            placeholder="1234"
            required
          />
          <TextFieldset
            defaultValue={state?.license?.environmentalAgency}
            className="lg:col-span-6"
            label="Órgão Ambiental"
            inputName="environmentalAgency"
            placeholder="CETESB (SP)"
            required
          />

          <fieldset className="lg:col-span-6 space-y-2">
            <label
              htmlFor="emission"
              className="block w-fit text-sm font-medium text-gray-900 leading-none"
            >
              Data de emissão
            </label>
            <DatePicker
              calendarClassName="rounded-md"
              className="w-full"
              onChange={setEmissionDate}
              value={emissionDate}
              locale="pt-BR"
              name="emission"
              id="emission"
            />
          </fieldset>

          <fieldset className="lg:col-span-6 space-y-2">
            <label
              htmlFor="validity"
              className="block w-fit text-sm font-medium text-gray-900 leading-none"
            >
              Data de validade
            </label>
            <DatePicker
              calendarClassName="rounded-md"
              className="w-full"
              onChange={setValidityDate}
              value={validityDate}
              locale="pt-BR"
              name="validity"
              id="validity"
            />
          </fieldset>
        </div>

        {/* O componente com loading tem que ser um componente próprio. Referência: https://react.dev/reference/react-dom/hooks/useFormStatus */}
        <SubmitButton
          license={license}
          text={license ? "Editar licença" : "Criar licença"}
          onDeleteModalOpen={onDeleteModalOpen}
        />
      </form>

      <dialog ref={modalRef} id="delete_modal" className="modal">
        <div className="modal-box rounded-md">
          <h3 className="font-bold text-lg">
            Deseja realmente deletar esta licença?
          </h3>
          <p className="py-4">Ao clicar confirmar, esta ação não terá volta.</p>
          <div className="modal-action">
            <form className="flex flex-wrap gap-4" action={deleteLicense}>
              <input
                type="hidden"
                name="id"
                className="sr-only"
                defaultValue={license?.id}
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
