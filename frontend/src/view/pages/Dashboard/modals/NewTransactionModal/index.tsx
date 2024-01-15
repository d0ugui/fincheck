import { Controller } from "react-hook-form";
import { Button } from "../../../../components/Button";
import { DatePickerInput } from "../../../../components/DatePickerInput";
import { Input } from "../../../../components/Input";
import { InputCurrency } from "../../../../components/InputCurrency";
import { Modal } from "../../../../components/Modal";
import { Select } from "../../../../components/Select";
import { useNewTransactionModalController } from "../NewTransactionModal/useNewTransactionModalController";

export function NewTransactionModal() {
  const {
    register,
    control,
    errors,
    handleSubmit,
    isNewTransactionModalOpen,
    closeNewTransactionModal,
    newTransactionType,
    accounts,
    categories,
    isLoading,
  } = useNewTransactionModalController();

  const isExpense = newTransactionType === "EXPENSE";

  return (
    <Modal
      open={isNewTransactionModalOpen}
      title={isExpense ? "Nova Despesa" : "Nova Receita"}
      onClose={closeNewTransactionModal}
    >
      <form onSubmit={handleSubmit}>
        <div>
          <span className="text-gray-600 text-xs tracking-[-0.5px]">Valor {isExpense ? 'da despesa' : 'da receita'}</span>

          <div className="flex items-center gap-2">
            <span className="text-gray-600 text-lg tracking-[-0.5px]">R$</span>
            <Controller
              control={control}
              name="value"
              defaultValue="0"
              render={({ field: { onChange, value } }) => (
                <InputCurrency
                  error={errors.value?.message}
                  onChange={onChange}
                  value={value}
                />
              )}
            />
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-4">
          <Input
            type="text"
            placeholder={isExpense ? 'Nova da Despesa': 'Nome da Receita'}
            error={errors.name?.message}
            {...register('name')}
          />

          <Controller
            control={control}
            defaultValue=""
            name="categoryId"
            render={({ field: { onChange, value }}) => (
              <Select
                placeholder="Categoria"
                onChange={onChange}
                value={value}
                error={errors.categoryId?.message}
                options={categories.map(category => ({
                  value: category.id,
                  label: category.name,
                }))}
              />
            )}
          />

          <Controller
            control={control}
            name="bankAccountId"
            defaultValue=""
            render={({ field: { onChange, value }}) => (
              <Select
                onChange={onChange}
                value={value}
                placeholder={isExpense ? 'Pagar com' : 'Receber com'}
                error={errors.bankAccountId?.message}
                options={accounts.map(account => ({
                  value: account.id,
                  label: account.name
                }))}
              />
            )}
          />

          <Controller
            control={control}
            name="date"
            defaultValue={new Date()}
            render={({ field: { value, onChange }}) => (
              <DatePickerInput
                value={value}
                error={errors.date?.message}
                onChange={onChange}
              />
            )}
          />

          <Button type="submit" className="w-full mt-6" isLoading={isLoading}>
            Criar
          </Button>
        </div>
      </form>
    </Modal>
  );
}
