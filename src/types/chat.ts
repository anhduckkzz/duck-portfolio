
export type Message = {
  role: "user" | "bot" | "assistant";
  content: string;
};

export type SystemMessage = {
  role: "system";
  content: string;
};
