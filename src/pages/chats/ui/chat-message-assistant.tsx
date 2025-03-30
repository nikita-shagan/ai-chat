import { ChatMessageContent } from "@/pages/chats/ui/message-content";
import ChatGPT from "@/shared/assets/images/chat-gpt-big.svg";
import { CopyButton } from "@/shared/ui/copy-button";
import dayjs from "dayjs";
import styled from "styled-components";

const Wrapper = styled.li`
  display: flex;
  flex-direction: column;
  gap: 8px;
  max-width: 700px;
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
  align-items: c;
`;

const Time = styled.div`
  font-weight: 400;
  font-size: 12px;
  line-height: 11px;
  margin-left: auto;
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
        <ChatGPT style={{ flexShrink: 0 }} />
        <ChatMessageContent>{props.content}</ChatMessageContent>
      </Body>
      <Footer>
        <Cost>
          {props.tokens} CAPS <CopyButton text={props.content} />
        </Cost>
        <Time>{dayjs(props.createdAt).format("HH:MM")}</Time>
      </Footer>
    </Wrapper>
  );
}
