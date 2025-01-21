import { TextInput } from "@mantine/core";
import { type FormEvent, useRef } from "react";

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
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(query);
    inputRef.current?.blur();
  };

  return (
    <div className="border-gray-200 border-b border-solid px-4 py-2">
      <form onSubmit={handleSubmit}>
        <TextInput
          ref={inputRef}
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
