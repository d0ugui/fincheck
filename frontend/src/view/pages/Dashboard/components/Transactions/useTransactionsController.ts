import { useState } from "react";
import { useTransactions } from "../../../../../app/hooks/useTransactions";
import { useDashboard } from "../DashboardContext/useDashboard";

export function useTransactionsController() {
  const { areValuesVisible } = useDashboard();
  const [isFiltersModalOpen, setIsFiltersModalOpen] = useState(false);

  const { transactions } = useTransactions();

  function handleOpenFiltersModal() {
    setIsFiltersModalOpen(true);
  }

  function handleCloseFiltersModal() {
    setIsFiltersModalOpen(false);
  }

  return {
    areValuesVisible,
    transactions,
    isInitialLoading: false,
    isLoading: false,
    isFiltersModalOpen,
    handleOpenFiltersModal,
    handleCloseFiltersModal,
  };
}
