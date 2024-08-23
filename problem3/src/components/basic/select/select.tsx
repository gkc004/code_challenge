import * as SelectPrimitive from '@radix-ui/react-select';
import { ChevronDownIcon } from '@radix-ui/react-icons';

type Option = {
  iconUrl: string;
  label: string;
  value: string;
};

type SelectProps = {
  label: string;
  options: Option[];
  onValueChange: (value: string) => void;
  value: string;
  error?: string;
};

export const Select = ({ label, options, onValueChange, value, error }: SelectProps) => {
  const selectedOption = options.find(option => option.value === value);

  return (
    <div className="mb-4">
      <label className="block text-gray-700 mb-1">{label}</label>
      <SelectPrimitive.Root value={value} onValueChange={onValueChange}>
        <SelectPrimitive.Trigger
          className="inline-flex items-center justify-between w-full mt-1 border border-gray-300 rounded-md p-2 bg-white shadow-sm"
        >
          {selectedOption ? (
            <div className="inline-flex items-center">
              <img src={selectedOption.iconUrl} alt={selectedOption.label} className="w-6 h-6 mr-2" />
              <SelectPrimitive.Value asChild>
                <span>{selectedOption.label}</span>
              </SelectPrimitive.Value>
            </div>
          ) : (
            <SelectPrimitive.Value placeholder="Select a currency" />
          )}
          <SelectPrimitive.Icon className="ml-2">
            <ChevronDownIcon />
          </SelectPrimitive.Icon>
        </SelectPrimitive.Trigger>

        <SelectPrimitive.Content className="overflow-hidden bg-white border border-gray-300 rounded-md shadow-lg">
          <SelectPrimitive.ScrollUpButton className="flex items-center justify-center h-6 bg-gray-100 text-gray-500">
            ▲
          </SelectPrimitive.ScrollUpButton>
          <SelectPrimitive.Viewport className="p-1">
            {options.map((option) => (
              <SelectPrimitive.Item
                key={option.value}
                value={option.value}
                className="flex items-center p-2 rounded cursor-pointer hover:bg-gray-100"
              >
                <img src={option.iconUrl} alt={option.label} className="w-6 h-6 mr-2" />
                <SelectPrimitive.ItemText>{option.label}</SelectPrimitive.ItemText>
              </SelectPrimitive.Item>
            ))}
          </SelectPrimitive.Viewport>
          <SelectPrimitive.ScrollDownButton className="flex items-center justify-center h-6 bg-gray-100 text-gray-500">
            ▼
          </SelectPrimitive.ScrollDownButton>
        </SelectPrimitive.Content>
      </SelectPrimitive.Root>
      {error && <span className="text-red-500 text-sm">{error}</span>}
    </div>
  );
};
