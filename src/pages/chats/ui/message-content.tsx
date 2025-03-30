import styled from "styled-components";

export const ChatMessageContent = styled.div`
  font-weight: 400;
  font-size: 18px;
  overflow-wrap: break-word;
  line-height: 150%;
  color: #e6e6e6;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  height: 100%;
  gap: 16px;
  & pre {
    font-size: 14px;
  }
  @media (max-width: 960px) {
    font-size: 14px;
    & pre {
      max-width: 320px;
      overflow: auto;
      font-size: 12px;
    }
  }
`;
