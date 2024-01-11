import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import { bankAccountService } from "../../../../../app/services/bankAccountsService";
import { currencyStringToNumber } from "../../../../../app/utils/currencyStringToNumber";
import { useDashboard } from "../../components/DashboardContext/useDashboard";

const schema = z.object({
  name: z.string().min(1, 'Nome da conta é obrigatório.'),
  initialBalance: z.union([
    z.string().min(1, 'Saldo inicial é obrigatório.'),
    z.number(),
  ]),
  type: z.enum(['CHECKING', 'INVESTMENT', 'CASH']),
  color: z.string().min(1, 'Cor é obrigatória.')
})

type FormData = z.infer<typeof schema>

export function useEditAccountModalController() {
  const {
    isEditAccountModalOpen,
    closeEditAccountModal,
    accountBankEdited
  } = useDashboard();

  const {
    register,
    handleSubmit: hookFormSubmit,
    formState: { errors },
    control
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      color: accountBankEdited?.color,
      name: accountBankEdited?.name,
      type: accountBankEdited?.type,
      initialBalance: accountBankEdited?.initialBalance,
    }
  });

  const queryClient = useQueryClient();

  const { isPending, mutateAsync } = useMutation({
    mutationFn: bankAccountService.update,
  });

  const handleSubmit = hookFormSubmit(async (data) => {
    try {
      await mutateAsync({
        ...data,
        initialBalance: currencyStringToNumber(data.initialBalance),
        id: accountBankEdited!.id,
      });

      queryClient.invalidateQueries({ queryKey: ['bankAccounts']})
      toast.success('A conta foi editada com sucesso!');
      closeEditAccountModal();
    } catch {
      toast.error('Erro ao salvar as alterações!')
    }
  });

  return {
    isEditAccountModalOpen,
    closeEditAccountModal,
    register,
    errors,
    handleSubmit,
    control,
    isPending,
  }
}
