
export type Message = {
  role: "user" | "bot";
  content: string;
};

export type SystemMessage = {
  role: "system";
  content: string;
};
