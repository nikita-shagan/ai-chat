import PlaneIcon from "@/shared/assets/images/plane.svg";
import { IconButton } from "@/shared/ui/icon-button";
import { Input } from "@/shared/ui/input";
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
`;

export function Chat() {
  const [input, setInput] = useState("");

  return (
    <ChatWrapper>
      <ChatBody>
        <ChatMessages />
        <ChatControls>
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
