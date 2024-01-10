import { CrossCircledIcon } from "@radix-ui/react-icons";
import CurrencyInput from "react-currency-input-field";
import { cn } from "../../app/utils/cn";

interface InputCurrencyProps {
  error?: string;
  value?: string | number;
  onChange?(value: string): void;
}

export function InputCurrency({ error, value, onChange }: InputCurrencyProps) {
  function handleTransform(value: string) {
    return value.length === 0 ? '0' : value
  }


  return (
    <div>
      <CurrencyInput
        groupSeparator="."
        decimalSeparator=","
        decimalScale={2}
        value={value}
        onValueChange={(value) => value && onChange?.(value)}
        transformRawValue={handleTransform}
        className={cn(
          'w-full text-gray-800 text-[32px] font-bold tracking-[-1px] outline-none',
          error && 'text-red-900',
        )}
      />

      {error && (
        <div className="flex gap-2 items-center mt-2 text-red-900">
          <CrossCircledIcon />
          <span className="text-xs">{error}</span>
        </div>
      )}
    </div>
  )
}
