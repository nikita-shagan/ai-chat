import styled from "styled-components";

export const ChatMessageContent = styled.div`
  font-weight: 400;
  font-size: 18px;
  color: #e6e6e6;
  flex-direction: column;
  align-items: flex-start;
  height: 100%;
  gap: 16px;
  text-overflow: ellipsis;
  white-space: pre-wrap;
  overflow-wrap: break-word;
  max-width: 600px;
  & p {
    line-height: 150%;
  }
  & pre {
    max-width: 600px;
    overflow: auto;
  }
  @media (max-width: 1280px) {
    max-width: 350px;
  }
  @media (max-width: 960px) {
    max-width: 400px;
    font-size: 16px;
  }
  @media (max-width: 450px) {
    max-width: 250px;
    font-size: 14px;
    & pre {
      max-width: 320px;
      font-size: 12px;
    }
  }
`;
