import { httpClient } from "../httpClient";

type BankAccountsResponse = Array<{
  id: string;
  name: string;
  initialBalance: number;
  type: "CHECKING" | "INVESTMENT" | "CASH";
  color: string;
  currentBalance: number;
}>

export async function getAll() {
  const { data } = await httpClient.get<BankAccountsResponse>('/bank-accounts');

  return data;
}
