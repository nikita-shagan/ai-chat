import { ChatMessageContent } from "@/pages/chats/ui/message-content";
import avatar from "@/shared/assets/images/avatar-default.svg";
import { CopyButton } from "@/shared/ui/copy-button";
import dayjs from "dayjs";
import Image from "next/image";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  gap: 8px;
  max-width: 700px;
  margin-left: auto;
  align-items: flex-end;
`;

const Body = styled.div`
  max-width: 300px;
  padding: 7px 8px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  border-bottom-left-radius: 10px;
  background: rgba(71, 133, 255, 0.5);
  display: flex;
  gap: 4px;
`;

const Message = styled.div`
  padding: 10px;
  font-weight: 400;
  font-size: 18px;
`;

const Time = styled.div`
  font-weight: 400;
  font-size: 12px;
  line-height: 11px;
  margin-left: auto;
  margin-top: auto;
`;

export function ChatMessageUser(props: { content: string; createdAt: string }) {
  return (
    <Wrapper>
      <CopyButton text={props.content} />
      <Body>
        <Message>
          <ChatMessageContent>{props.content}</ChatMessageContent>
        </Message>
        <Time>{dayjs(props.createdAt).format("HH:MM")}</Time>
      </Body>
      <Image src={avatar} alt={"avatar"} />
    </Wrapper>
  );
}
