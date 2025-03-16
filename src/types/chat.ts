
export type Message = {
  role: "user" | "bot";
  content: string;
  imageUrl?: string;
};

export type SystemMessage = {
  role: "system";
  content: string;
};
