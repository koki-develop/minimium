import { TextInput } from "@mantine/core";
import type { FormEvent } from "react";

export type AddressBarProps = {
  query: string;
  onChange: (query: string) => void;
  onSubmit: (query: string) => void;
};

export default function AddressBar({
  query,
  onChange,
  onSubmit,
}: AddressBarProps) {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(query);
  };

  return (
    <div className="border-gray-200 border-b border-solid px-4 py-2">
      <form onSubmit={handleSubmit}>
        <TextInput
          className="w-full"
          radius="xl"
          type="text"
          value={query}
          onChange={(e) => onChange(e.currentTarget.value)}
        />
      </form>
    </div>
  );
}
