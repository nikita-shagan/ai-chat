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
  max-width: 1280px;
  flex-grow: 1;
`;

const ChatMessages = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

const ChatControls = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

const ChatControlsSelect = styled.div`
  & button {
    min-width: 170px;
  }
  & ul {
    min-width: 272px;
  }
`;

export function Chat() {
  const [input, setInput] = useState("");
  const [model, setModel] = useState("chatgpt");

  return (
    <ChatWrapper>
      <ChatBody>
        <ChatMessages />
        <ChatControls>
          <ChatControlsSelect>
            <Select
              items={[
                {
                  value: "ChatGPT",
                  content: (
                    <div>
                      <ChatGpt /> ChatGPT
                    </div>
                  ),
                },
                {
                  value: "DALL-E",
                  content: (
                    <div>
                      <DallE /> DALL-E
                    </div>
                  ),
                },
                {
                  value: "Midjourney",
                  content: (
                    <div>
                      <Midjourney /> Midjourney
                    </div>
                  ),
                },
              ]}
              onChange={(value) => setModel(value)}
              value={model}
              outlined={true}
            />
          </ChatControlsSelect>
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
        </ChatControls>
      </ChatBody>
    </ChatWrapper>
  );
}
