import { ChatMessageContent } from "@/pages/chats/ui/chat-message-content";
import avatar from "@/shared/assets/images/avatar-default.svg";
import { CopyButton } from "@/shared/ui/copy-button";
import dayjs from "dayjs";
import Image from "next/image";
import styled from "styled-components";

const Wrapper = styled.li`
  display: flex;
  gap: 8px;
  margin-left: auto;
  align-items: flex-end;
`;

const WrapperBody = styled.div`
  padding: 7px 8px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  border-bottom-left-radius: 10px;
  background: rgba(71, 133, 255, 0.5);
  display: flex;
  gap: 4px;
  position: relative;
  @media (max-width: 540px) {
    padding: 2px;
  }
`;

const WrapperBodyMessage = styled.div`
  padding: 10px;
  font-weight: 400;
  font-size: 18px;
  @media (max-width: 540px) {
    padding: 2px 2px 14px;
  }
`;

const WrapperBodyTime = styled.div`
  font-weight: 400;
  font-size: 12px;
  line-height: 11px;
  margin-left: auto;
  margin-top: auto;
  @media (max-width: 540px) {
    position: absolute;
    right: 5px;
    bottom: 5px;
  }
`;

const WrapperAvatar = styled(Image)`
  @media (max-width: 540px) {
    display: none;
  }
`;

export function ChatMessageUser(props: { content: string; createdAt: string }) {
  return (
    <Wrapper>
      <CopyButton text={props.content} />
      <WrapperBody>
        <WrapperBodyMessage>
          <ChatMessageContent>
            <p>{props.content}</p>
          </ChatMessageContent>
        </WrapperBodyMessage>
        <WrapperBodyTime>
          {dayjs(props.createdAt).format("HH:MM")}
        </WrapperBodyTime>
      </WrapperBody>
      <WrapperAvatar src={avatar} alt={"avatar"} />
    </Wrapper>
  );
}
