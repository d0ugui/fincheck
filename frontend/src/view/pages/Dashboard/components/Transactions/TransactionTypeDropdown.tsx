import { ChevronDownIcon } from "@radix-ui/react-icons";
import { DropdownMenu } from "../../../../components/DropdownMenu";
import { ExpensesIcon } from "../../../../components/icons/ExpensesIcon";
import { IncomeIcon } from "../../../../components/icons/IncomeIcon";
import { TransactionsIcon } from "../../../../components/icons/TransactionsIcon";

interface TransactionTypeDropdownProps {
  onSelect(type: "INCOME" | "EXPENSE" | undefined): void;
  selectType: "INCOME" | "EXPENSE" | undefined;
}

export function TransactionTypeDropdown({
  onSelect,
  selectType,
}: TransactionTypeDropdownProps) {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <button className="flex items-center gap-2">
          {selectType === "EXPENSE" && <ExpensesIcon />}
          {selectType === "INCOME" && <IncomeIcon />}
          {selectType === undefined && <TransactionsIcon />}

          <span className="text-sm text-gray-800 tracking-[-0.5px] font-medium">
            {selectType === "EXPENSE" && "Despesas"}
            {selectType === "INCOME" && "Receitas"}
            {selectType === undefined && "Transações"}
          </span>
          <ChevronDownIcon className="text-gray-900" />
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Content className="w-[279px]">
        <DropdownMenu.Item
          className="gap-2"
          onSelect={() => onSelect("INCOME")}
        >
          <IncomeIcon />
          Receitas
        </DropdownMenu.Item>
        <DropdownMenu.Item
          className="gap-2"
          onSelect={() => onSelect("EXPENSE")}
        >
          {" "}
          <ExpensesIcon />
          Despesas
        </DropdownMenu.Item>
        <DropdownMenu.Item
          className="gap-2"
          onSelect={() => onSelect(undefined)}
        >
          <TransactionsIcon />
          Transações
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}
