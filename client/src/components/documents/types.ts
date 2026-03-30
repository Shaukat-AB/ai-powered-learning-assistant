export type TDocument = {
  id: string;
  name: string;
  url: string;
  sizeBytes: number | undefined;
  createdAt: string | null;
  updatedAt: string | null;
};

export type DocumentContext = { doc: TDocument | undefined };

export type TChat = {
  prompt: string;
  response: string;
};
