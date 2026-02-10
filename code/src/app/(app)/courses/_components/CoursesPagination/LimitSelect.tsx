"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/ui/select";

type LimitSelectProps = {
  value: number;
  options: readonly number[];
};

const LimitSelect = ({ value, options }: LimitSelectProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const onValueChange = (nextValue: string) => {
    const params = new URLSearchParams(searchParams.toString());
    const parsed = Number.parseInt(nextValue, 10);

    if (Number.isNaN(parsed) || parsed <= 0) {
      return;
    }

    if (parsed === 9) {
      params.delete("limit");
    } else {
      params.set("limit", String(parsed));
    }

    params.delete("page");

    const query = params.toString();

    router.replace(query ? `${pathname}?${query}` : pathname, {
      scroll: true,
    });
  };

  return (
    <Select value={String(value)} onValueChange={onValueChange}>
      <SelectTrigger className="w-[72px]">
        <SelectValue placeholder="Limit" />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option} value={String(option)}>
            {option}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default LimitSelect;
