import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import { EyeIcon } from "../../../components/icons/EyeIcon";
import { AccountCard } from "./AccountCard";

export function Accounts() {
  return (
    <div className="flex flex-col bg-teal-900 rounded-2xl w-full h-full px-4 py-8 md:p-10">
      <div>
        <span className="text-white tracking-[-0.5px] block">Saldo total</span>

        <div className="flex items-center gap-2">
          <strong className="text-2xl tracking-[-1px] text-white">
            R$ 1000,00
          </strong>

          <button className="w-8 h-8 flex items-center justify-center">
            <EyeIcon open={true} />
          </button>
        </div>
      </div>

      <div className="flex-1 flex flex-col justify-end">
        <div className="flex items-center justify-between">
          <strong className="text-white tracking-[-1px] text-lg">
            Minhas contas
          </strong>

          <div>
            <button className="py-3 pl-2.5 pr-3.5 rounded-full enabled:hover:bg-black/10 transition-colors disabled:opacity-40 ">
              <ChevronLeftIcon className="text-white w-6 h-6" />
            </button>
            <button className="py-3 pl-2.5 pr-3.5 rounded-full enabled:hover:bg-black/10 transition-colors disabled:opacity-40 ">
              <ChevronRightIcon className="text-white w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="mt-4">
          <AccountCard
            color="#7950F2"
            name="Nubank"
            balance={1000.23}
            type="CHECKING"
          />

          <AccountCard
            color="#E56700"
            name="Inter"
            balance={1000.23}
            type="INVESTMENT"
          />

          <AccountCard
            color="#0f0"
            name="Carteira"
            balance={1000.23}
            type="CASH"
          />
        </div>
      </div>
    </div>
  );
}
