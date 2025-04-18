import { ChatMessageContent } from "@/pages/chats/ui/chat-message-content";
import chatGptBig from "@/shared/assets/images/chat-gpt-big.svg";
import { CopyButton } from "@/shared/ui/copy-button";
import dayjs from "dayjs";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import styled from "styled-components";

const Wrapper = styled.li`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Header = styled.div`
  display: flex;
  justify-content: flex-start;
  padding-left: 56px;
  gap: 10px;
  font-weight: 400;
  font-size: 16px;
  line-height: 22px;
  align-items: center;
  @media (max-width: 540px) {
    padding-left: 0;
  }
`;

const Badge = styled.div`
  border-radius: 14px;
  padding: 4px 12px;
  background: rgba(34, 43, 68, 1);
  font-weight: 500;
  font-size: 14px;
  line-height: 18px;
`;

const Body = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 16px;
`;

const Footer = styled.div`
  display: flex;
  align-items: center;
`;

const Cost = styled.div`
  display: flex;
  gap: 14px;
  padding-left: 52px;
  font-weight: 400;
  font-size: 16px;
  line-height: 22px;
  color: rgba(156, 163, 175, 1);
  letter-spacing: 0;
  @media (max-width: 540px) {
    padding-left: 0;
  }
`;

const Time = styled.div`
  font-weight: 400;
  font-size: 12px;
  line-height: 11px;
  margin-left: auto;
`;

const ModelLogo = styled.div`
  @media (max-width: 540px) {
    display: none;
  }
`;

export function ChatMessageAssistant(props: {
  modelId: string;
  content: string;
  tokens: number;
  createdAt: string;
  parentModel: { id: string; label: string } | null;
}) {
  return (
    <Wrapper>
      <Header>
        {props.parentModel?.label}
        <Badge>{props.modelId}</Badge>
      </Header>
      <Body>
        <ModelLogo>
          <Image src={chatGptBig} alt={"chatGpt"} />
        </ModelLogo>
        <ChatMessageContent>
          <ReactMarkdown>{props.content || "..."}</ReactMarkdown>
        </ChatMessageContent>
      </Body>
      <Footer>
        {!!props.tokens && (
          <Cost>
            {props.tokens} CAPS <CopyButton text={props.content} />
          </Cost>
        )}
        {!!props.tokens && (
          <Time>{dayjs(props.createdAt).format("HH:MM")}</Time>
        )}
      </Footer>
    </Wrapper>
  );
}
