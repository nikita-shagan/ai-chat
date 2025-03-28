import { useAppSelector } from "@/shared/model";

export function Chat() {
  const { messages } = useAppSelector((state) => state.chat);
  return <div>Chat {messages.join(" ")}</div>;
}
