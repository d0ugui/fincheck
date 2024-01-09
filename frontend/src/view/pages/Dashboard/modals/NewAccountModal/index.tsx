import { Button } from "../../../../components/Button";
import { ColorsDropdownInput } from "../../../../components/ColorsDropdownInput";
import { Input } from "../../../../components/Input";
import { InputCurrency } from "../../../../components/InputCurrency";
import { Modal } from "../../../../components/Modal";
import { Select } from "../../../../components/Select";
import { useNewAccountModalController } from "./useNewAccountModalController";

export function NewAccountModal() {
  const { isNewAccountModalOpen, closeNewAccountModal } =
    useNewAccountModalController();

  return (
    <Modal
      open={isNewAccountModalOpen}
      title="Nova conta"
      onClose={closeNewAccountModal}
    >
      <form action="">
        <div>
          <span className="text-gray-600 text-xs tracking-[-0.5px]">Saldo</span>

          <div className="flex items-center gap-2">
            <span className="text-gray-600 text-lg tracking-[-0.5px]">R$</span>
            <InputCurrency />
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-4">
          <Input type="text" name="name" placeholder="Nome da conta" />
          <Select
            placeholder="Selecione o tipo"
            options={[
              {
                value: "CHECKING",
                label: "Conta Corrente",
              },
              {
                value: "INVESTMENT",
                label: "Investimentos",
              },
              {
                value: "CASH",
                label: "Dinheiro Físico",
              },
            ]}
          />
          <ColorsDropdownInput />
        </div>

        <Button type="submit" className="w-full mt-6" isLoading={false}>
          Criar
        </Button>
      </form>
    </Modal>
  );
}
