import { changeChatModel, sendMessage } from "@/pages/chats/model/chats-slice";
import { ChatMessageAssistant } from "@/pages/chats/ui/chat-message-assistant";
import { ChatMessageUser } from "@/pages/chats/ui/chat-message-user";
import chatGpt from "@/shared/assets/images/chat-gpt.svg";
import planeIcon from "@/shared/assets/images/plane.svg";
import { useAppDispatch, useAppSelector } from "@/shared/model";
import { IconButton } from "@/shared/ui/icon-button";
import { Input } from "@/shared/ui/input";
import { Select } from "@/shared/ui/select";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";

const ChatWrapper = styled.div`
  display: flex;
  padding: 20px;
  background-color: rgba(18, 24, 37, 1);
  border-radius: 18px;
  gap: 20px;
  flex-grow: 1;
  justify-content: center;
  @media (max-width: 720px) {
    padding: 8px;
  }
`;

const ChatBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
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
  @media (max-width: 720px) {
    & input {
      padding-left: 8px;
      padding-right: 0;
    }
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
  const chatRef = useRef<HTMLUListElement>(null);
  const [isUserScrolling, setIsUserScrolling] = useState(false);

  useEffect(() => {
    const handleUserScrollStart = () => {
      setIsUserScrolling(true);
    };
    const element = chatRef.current;
    if (!element) {
      return;
    }
    element.addEventListener("wheel", handleUserScrollStart);
    element.addEventListener("touchmove", handleUserScrollStart);
    element.addEventListener("pointerdown", handleUserScrollStart);
    return () => {
      element.removeEventListener("wheel", handleUserScrollStart);
      element.removeEventListener("touchmove", handleUserScrollStart);
      element.removeEventListener("pointerdown", handleUserScrollStart);
    };
  }, [selectedChat]);

  useEffect(() => {
    const container = chatRef.current;
    console.log(isUserScrolling);
    if (container && !isUserScrolling) {
      container.scrollTop = container.scrollHeight;
    }
  }, [isUserScrolling, messages]);

  useEffect(() => {
    setIsUserScrolling(false);
  }, [messages.length]);

  const handleSendMessage = () => {
    if (input) {
      dispatch(
        sendMessage({
          chat: selectedChat,
          message: input,
          existingChats: chats,
        }),
      );
      setInput("");
    }
  };

  return (
    <ChatWrapper>
      <ChatBody>
        {selectedChat && !chatsLoading ? (
          <>
            <ChatMessages ref={chatRef}>
              {[...messages]
                .sort(
                  (a, b) =>
                    new Date(a.createdAt).valueOf() -
                    new Date(b.createdAt).valueOf(),
                )
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
                        <Image src={chatGpt} alt={"chatGpt"} />
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
                      <Image src={planeIcon} alt={"plane"} />
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
