import { ChatsListItem } from "@/pages/chats/ui/chats-list-item";
import { useAppSelector } from "@/shared/model";
import styled from "styled-components";

const ChatsListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  border-top: 1px solid rgba(49, 62, 98, 1);
  padding-top: 4px;
`;

export function ChatsList() {
  const { chats } = useAppSelector((state) => state.chats);

  return (
    <ChatsListWrapper>
      {[...chats]
        .sort(
          (a, b) =>
            new Date(b.createdAt).valueOf() - new Date(a.createdAt).valueOf(),
        )
        .map((chat) => (
          <ChatsListItem key={chat.id} chat={chat} />
        ))}
    </ChatsListWrapper>
  );
}
