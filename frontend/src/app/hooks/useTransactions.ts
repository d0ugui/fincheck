import { useQuery } from "@tanstack/react-query";
import { transactionsService } from "../services/transactionsService";

export function useTransactions() {
  const { data } = useQuery({
    queryKey: ["transactions"],
    queryFn: () =>
      transactionsService.getAll({
        month: 0,
        year: 2024,
      }),
  });

  return {
    transactions: data ?? [],
  };
}
