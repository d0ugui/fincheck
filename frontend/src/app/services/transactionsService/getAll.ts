import { Transaction } from "../../entities/Transaction";
import { httpClient } from "../httpClient";

type TransactionsResponse = Array<Transaction>;

export async function getAll() {
  const { data } = await httpClient.get<TransactionsResponse>("/bank-accounts");

  return data;
}
