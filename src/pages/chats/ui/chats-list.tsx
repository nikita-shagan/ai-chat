import { ChatsListItem } from "@/pages/chats/ui/chats-list-item";
import styled from "styled-components";

const ChatsListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  border-top: 1px solid rgba(49, 62, 98, 1);
  padding-top: 8px;
`;

export function ChatsList(props: { chats: { id: string; name: string }[] }) {
  return (
    <ChatsListWrapper>
      {props.chats.map((chat) => (
        <ChatsListItem key={chat.id} active={true} chat={chat} />
      ))}
    </ChatsListWrapper>
  );
}
