import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
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
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

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

  const { isPending, mutateAsync: updateAccount } = useMutation({
    mutationFn: bankAccountService.update,
  });

  const {isPending: isLoadingDelete, mutateAsync: removeAccount} = useMutation({
    mutationFn: bankAccountService.remove,
  });

  const handleSubmit = hookFormSubmit(async (data) => {
    try {
      await updateAccount({
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

  function handleOpenDeleteModal() {
    setIsDeleteModalOpen(true)
  }

  function handleCloseDeleteModal() {
    setIsDeleteModalOpen(false)
  }

  async function handleDeleteAccount() {
    try {
      await removeAccount(accountBankEdited!.id);

      queryClient.invalidateQueries({ queryKey: ['bankAccounts']})
      toast.success('A conta foi deletada com sucesso!');
      closeEditAccountModal();
    } catch {
      toast.error('Erro ao deletar a conta!')
    }
  }

  return {
    isEditAccountModalOpen,
    closeEditAccountModal,
    register,
    errors,
    handleSubmit,
    control,
    isPending,
    isDeleteModalOpen,
    handleOpenDeleteModal,
    handleCloseDeleteModal,
    handleDeleteAccount,
    isLoadingDelete
  }
}
