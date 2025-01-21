import { ActionIcon, TextInput } from "@mantine/core";
import {
  IconArrowLeft,
  IconArrowRight,
  IconProgressX,
  IconRefresh,
} from "@tabler/icons-react";
import { type FormEvent, useRef } from "react";

export type AddressBarProps = {
  query: string;
  loading: boolean;
  canGoBack: boolean;
  canGoForward: boolean;

  onQueryChange: (query: string) => void;
  onGoBack: () => void;
  onGoForward: () => void;
  onRefresh: () => void;
  onStop: () => void;
  onSubmit: (query: string) => void;
};

export default function AddressBar({
  query,
  loading,
  canGoBack,
  canGoForward,

  onQueryChange,
  onGoBack,
  onGoForward,
  onRefresh,
  onStop,
  onSubmit,
}: AddressBarProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(query);
    inputRef.current?.blur();
  };

  return (
    <div className="flex items-center gap-2 border-gray-200 border-b border-solid px-4 py-2">
      <ActionIcon
        classNames={{ root: "disabled:bg-transparent" }}
        color="dark"
        variant="subtle"
        radius="xl"
        onClick={onGoBack}
        disabled={!canGoBack}
      >
        <IconArrowLeft size={18} />
      </ActionIcon>

      <ActionIcon
        classNames={{ root: "disabled:bg-transparent" }}
        color="dark"
        variant="subtle"
        radius="xl"
        onClick={onGoForward}
        disabled={!canGoForward}
      >
        <IconArrowRight size={18} />
      </ActionIcon>

      <ActionIcon
        classNames={{ root: "disabled:bg-transparent" }}
        color="dark"
        variant="subtle"
        radius="xl"
        onClick={loading ? onStop : onRefresh}
      >
        {loading ? <IconProgressX size={18} /> : <IconRefresh size={18} />}
      </ActionIcon>

      <form className="flex-grow" onSubmit={handleSubmit}>
        <TextInput
          ref={inputRef}
          radius="xl"
          type="text"
          value={query}
          onChange={(e) => onQueryChange(e.currentTarget.value)}
        />
      </form>
    </div>
  );
}
