export type TDocument = { id: string; name: string; src: string };
export type DocumentContext = { doc: TDocument | undefined };

export type TChat = {
  prompt: string;
  response: string;
};
