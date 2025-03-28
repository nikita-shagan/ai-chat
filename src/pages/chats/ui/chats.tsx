"use client";

import { useAppSelector } from "@/shared/model";

export function Chats() {
  const { messages } = useAppSelector((state) => state.chat);
  return <div>Chats {messages.join(" ")}</div>;
}
