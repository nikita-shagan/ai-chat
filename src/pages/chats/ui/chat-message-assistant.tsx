import ChatGPT from "@/shared/assets/images/chat-gpt-big.svg";
import { CopyButton } from "@/shared/assets/images/copy-button";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  max-width: 294px;
`;

const Header = styled.div`
  display: flex;
  justify-content: center;
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
  justify-content: center;
  align-items: center;
  gap: 16px;
  font-weight: 400;
  font-size: 18px;
  line-height: 100%;
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

export function ChatMessageAssistant() {
  return (
    <Wrapper>
      <Header>
        ChatGPT
        <Badge>gpt-3.5-turbo</Badge>
      </Header>
      <Body>
        <ChatGPT />
        Привет! Чем я могу помочь?
      </Body>
      <Footer>
        <Cost>
          -223 CAPS <CopyButton text="Привет! Чем я могу помочь?" />
        </Cost>
        <Time>09:54</Time>
      </Footer>
    </Wrapper>
  );
}
