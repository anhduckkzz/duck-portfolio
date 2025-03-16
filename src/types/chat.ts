
export type Message = {
  role: "user" | "bot" | "assistant";
  content: string;
  imageUrl?: string;
};

export type SystemMessage = {
  role: "system";
  content: string;
};
