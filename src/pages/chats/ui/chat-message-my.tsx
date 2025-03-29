import Avatar from "@/shared/assets/images/avatar-default.svg";
import { CopyButton } from "@/shared/assets/images/copy-button";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  gap: 8px;
  max-width: 294px;
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
  line-height: 100%;
`;

const Time = styled.div`
  font-weight: 400;
  font-size: 12px;
  line-height: 11px;
  margin-left: auto;
  margin-top: auto;
`;

export function ChatMessageMy() {
  return (
    <Wrapper>
      <CopyButton text="Привет! Чем я могу помочь?" />
      <Body>
        <Message>Привет бот</Message>
        <Time>09:54</Time>
      </Body>
      <Avatar />
    </Wrapper>
  );
}
