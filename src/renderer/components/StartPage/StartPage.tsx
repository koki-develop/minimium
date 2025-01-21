import { ActionIcon, Text, TextInput, Title } from "@mantine/core";
import { IconBrandGithub, IconSearch } from "@tabler/icons-react";
import { type FormEvent, useState } from "react";

export type StartPageProps = {
  onGithub: () => void;
  onSubmit: (query: string) => void;
};

export default function StartPage({ onGithub, onSubmit }: StartPageProps) {
  const [query, setQuery] = useState<string>("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const url = new URL("https://duckduckgo.com");
    url.searchParams.set("q", query);
    onSubmit(url.toString());
  };

  return (
    <div className="flex flex-col items-center gap-4 py-8">
      <div className="flex flex-col items-center italic">
        <Title size="h1">Minimium</Title>
        <Text>Minimium is a minimalistic browser.</Text>
        <Text>No tabs, no bookmarks, no history.</Text>
      </div>

      <div className="flex items-center gap-2">
        <ActionIcon
          color="dark"
          variant="outline"
          radius="xl"
          size="lg"
          onClick={onGithub}
        >
          <IconBrandGithub />
        </ActionIcon>
      </div>

      <form className="flex w-full justify-center" onSubmit={handleSubmit}>
        <TextInput
          w={{
            base: "80%",
            sm: "50%",
            md: "30%",
          }}
          size="md"
          radius="xl"
          value={query}
          leftSection={<IconSearch size={18} />}
          onChange={(e) => setQuery(e.target.value)}
        />
      </form>
    </div>
  );
}
