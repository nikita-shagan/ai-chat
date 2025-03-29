import { ChatMessageAssistant } from "@/pages/chats/ui/chat-message-assistant";
import { ChatMessageMy } from "@/pages/chats/ui/chat-message-my";
import ChatGpt from "@/shared/assets/images/chat-gpt.svg";
import DallE from "@/shared/assets/images/dalle.svg";
import Midjourney from "@/shared/assets/images/midjourney.svg";
import PlaneIcon from "@/shared/assets/images/plane.svg";
import { IconButton } from "@/shared/ui/icon-button";
import { Input } from "@/shared/ui/input";
import { Select } from "@/shared/ui/select";
import { useState } from "react";
import styled from "styled-components";

const ChatWrapper = styled.div`
  display: flex;
  padding: 20px;
  background-color: rgba(18, 24, 37, 1);
  border-radius: 18px;
  gap: 20px;
  flex-grow: 1;
  justify-content: center;
`;

const ChatBody = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 1250px;
  flex-grow: 1;
`;

const ChatMessages = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  gap: 16px;
`;

const ChatControls = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

const ChatControlsSelect = styled.div`
  & ul {
    min-width: 272px;
    padding: 5px;
    border-radius: 10px;
  }
  & li {
    padding: 14px;
  }
`;

const ChatControlsSelectItem = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 500;
  font-size: 15px;
  line-height: 20px;
`;

const ChatControlsInput = styled.div`
  & input {
    padding: 22px;
  }
`;

export function Chat() {
  const [input, setInput] = useState("");
  const [model, setModel] = useState("ChatGPT");

  return (
    <ChatWrapper>
      <ChatBody>
        <ChatMessages>
          <ChatMessageMy />
          <ChatMessageAssistant />
        </ChatMessages>
        <ChatControls>
          <ChatControlsSelect>
            <Select
              items={[
                {
                  value: "ChatGPT",
                  content: (
                    <ChatControlsSelectItem>
                      <ChatGpt /> ChatGPT
                    </ChatControlsSelectItem>
                  ),
                },
                {
                  value: "DALL-E",
                  content: (
                    <ChatControlsSelectItem>
                      <DallE /> DALL-E
                    </ChatControlsSelectItem>
                  ),
                },
                {
                  value: "Midjourney",
                  content: (
                    <ChatControlsSelectItem>
                      <Midjourney /> Midjourney
                    </ChatControlsSelectItem>
                  ),
                },
              ]}
              onChange={(value) => setModel(value)}
              value={model}
              outlined={true}
            />
          </ChatControlsSelect>
          <ChatControlsInput>
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Спроси о чем-нибудь..."
              endAdornment={
                <IconButton $active={true}>
                  <PlaneIcon />
                </IconButton>
              }
            />
          </ChatControlsInput>
        </ChatControls>
      </ChatBody>
    </ChatWrapper>
  );
}
