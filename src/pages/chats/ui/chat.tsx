import { changeChatModel, sendMessage } from "@/pages/chats/model/chats-slice";
import { ChatMessageAssistant } from "@/pages/chats/ui/chat-message-assistant";
import { ChatMessageUser } from "@/pages/chats/ui/chat-message-user";
import ChatGpt from "@/shared/assets/images/chat-gpt.svg";
import PlaneIcon from "@/shared/assets/images/plane.svg";
import { useAppDispatch, useAppSelector } from "@/shared/model";
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
  gap: 14px;
  max-width: 1270px;
  flex-grow: 1;
`;

const ChatMessages = styled.ul`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  gap: 34px;
  overflow-y: auto;
  padding-right: 20px;
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

const ChatEmpty = styled.div`
  display: flex;
  flex-grow: 1;
  justify-content: center;
  align-items: center;
  font-size: 20px;
`;

export function Chat() {
  const dispatch = useAppDispatch();
  const [input, setInput] = useState("");
  const { selectedChat, messages, models, chats, chatsLoading } =
    useAppSelector((state) => state.chats);

  const handleSendMessage = () => {
    dispatch(
      sendMessage({
        chat: selectedChat,
        message: input,
        existingChats: chats,
      }),
    );
    setInput("");
  };

  return (
    <ChatWrapper>
      <ChatBody>
        {selectedChat && !chatsLoading ? (
          <>
            <ChatMessages>
              {[...messages]
                .reverse()
                .map((message) =>
                  message.role === "assistant" ? (
                    <ChatMessageAssistant key={message.id} {...message} />
                  ) : (
                    <ChatMessageUser key={message.id} {...message} />
                  ),
                )}
            </ChatMessages>
            <ChatControls>
              <ChatControlsSelect>
                <Select
                  items={models.map((model) => ({
                    value: model.id,
                    content: (
                      <ChatControlsSelectItem>
                        <ChatGpt />
                        {model.label}
                      </ChatControlsSelectItem>
                    ),
                  }))}
                  onChange={(value) =>
                    dispatch(
                      changeChatModel({
                        chat: selectedChat,
                        model:
                          models.find((model) => model.id === value) ?? null,
                      }),
                    )
                  }
                  value={selectedChat.modelId}
                  outlined={true}
                />
              </ChatControlsSelect>
              <ChatControlsInput>
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Спроси о чем-нибудь..."
                  endAdornment={
                    <IconButton $active={true} onClick={handleSendMessage}>
                      <PlaneIcon />
                    </IconButton>
                  }
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleSendMessage();
                    }
                  }}
                />
              </ChatControlsInput>
            </ChatControls>
          </>
        ) : (
          !chatsLoading && (
            <ChatEmpty>
              Создайте чат чтобы иметь возможность задать вопрос
            </ChatEmpty>
          )
        )}
      </ChatBody>
    </ChatWrapper>
  );
}
