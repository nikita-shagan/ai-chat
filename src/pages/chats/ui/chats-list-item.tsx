import ChatActive from "@/shared/assets/images/chat-active.svg";
import ChatDisabled from "@/shared/assets/images/chat-disabled.svg";
import DeleteActive from "@/shared/assets/images/delete-active.svg";
import DeleteDisabled from "@/shared/assets/images/delete-disabled.svg";
import styled from "styled-components";

const ChatsListWrapper = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  padding: 8px;
`;

const ChatsListItemDelete = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  margin-left: auto;
  &:hover {
    opacity: 0.8;
  }
`;

const ChatsListItemName = styled.span`
  font-weight: 500;
  font-size: 16px;
  line-height: 22px;
  letter-spacing: 0%;
`;

export function ChatsListItem(props: {
  active: boolean;
  chat: { id: string; name: string };
}) {
  return (
    <ChatsListWrapper>
      {props.active ? <ChatActive /> : <ChatDisabled />}
      <ChatsListItemName>{props.chat.name}</ChatsListItemName>
      <ChatsListItemDelete>
        {props.active ? <DeleteActive /> : <DeleteDisabled />}{" "}
      </ChatsListItemDelete>
    </ChatsListWrapper>
  );
}
