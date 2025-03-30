import { deleteChat, selectChat } from "@/pages/chats/model/chats-slice";
import chatImage from "@/shared/assets/images/chat.svg";
import deleteImage from "@/shared/assets/images/delete.svg";
import { useAppDispatch, useAppSelector } from "@/shared/model";
import Image from "next/image";
import styled from "styled-components";

const ChatsListWrapper = styled.div<{ $isActive: boolean }>`
  display: flex;
  gap: 8px;
  align-items: center;
  padding: 10px;
  cursor: pointer;
  opacity: ${({ $isActive }) => ($isActive ? "1" : "0.5")};
  &:hover {
    opacity: 0.8;
  }
`;

const ChatsListItemDelete = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  margin-left: auto;
  &:hover {
    opacity: 0.6;
  }
`;

const ChatsListItemName = styled.span`
  font-weight: 500;
  font-size: 16px;
  line-height: 22px;
  letter-spacing: 0%;
`;

export function ChatsListItem(props: { chat: { id: string; name: string } }) {
  const { selectedChat } = useAppSelector((state) => state.chats);
  const dispatch = useAppDispatch();
  const isActive = selectedChat?.id === props.chat?.id;

  return (
    <ChatsListWrapper
      $isActive={isActive}
      onClick={() => dispatch(selectChat(props.chat))}
    >
      <Image src={chatImage} alt={"chatImage"} />
      <ChatsListItemName>{props.chat.name}</ChatsListItemName>
      <ChatsListItemDelete
        onClick={(e) => {
          e.stopPropagation();
          dispatch(deleteChat(props.chat.id));
        }}
      >
        <Image src={deleteImage} alt={"chatImage"} />
      </ChatsListItemDelete>
    </ChatsListWrapper>
  );
}
