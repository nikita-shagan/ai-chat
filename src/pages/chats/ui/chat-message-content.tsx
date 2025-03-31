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
  max-width: 700px;
  & p {
    line-height: 150%;
  }
  & pre {
    max-width: 700px;
    overflow: auto;
  }
  @media (max-width: 1280px) {
    max-width: 360px;
    & pre {
      max-width: 360px;
    }
  }
  @media (max-width: 960px) {
    font-size: 16px;
    & pre {
      font-size: 14px;
    }
  }
  @media (max-width: 540px) {
    font-size: 14px;
    max-width: 270px;
    & pre {
      font-size: 12px;
      max-width: 270px;
    }
  }
`;
