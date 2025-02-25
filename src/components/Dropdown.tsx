import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function Dropdown({ dropdownvalue }: any) {
  return (
    <Select defaultValue={dropdownvalue[0]}>
      <SelectTrigger className="text-white border-zinc-600 w-[180px]">
        <SelectValue placeholder={dropdownvalue[0]} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel></SelectLabel>
          {dropdownvalue.map((value: any) => (
            <SelectItem key={value} value={value}>{value}</SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
