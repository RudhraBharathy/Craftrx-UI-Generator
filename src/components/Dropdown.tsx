import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface DropdownProps {
  dropdownvalue: string[];
  onChange: (value: string) => void;
  value: string;
  className?: string;
}

export function Dropdown({
  dropdownvalue,
  onChange,
  value,
  className,
}: DropdownProps) {
  return (
    <Select onValueChange={onChange} value={value}>
      <SelectTrigger className={className}>
        <SelectValue placeholder="Select AI Model" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {dropdownvalue.map((item) => (
            <SelectItem key={item} value={item}>
              {item}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
