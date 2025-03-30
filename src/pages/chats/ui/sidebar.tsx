import { addChat } from "@/pages/chats/model/chats-slice";
import { ChatsList } from "@/pages/chats/ui/chats-list";
import { Logout } from "@/pages/chats/ui/logout";
import addChatImage from "@/shared/assets/images/add-chat.svg";
import globe from "@/shared/assets/images/globe.svg";
import logo from "@/shared/assets/images/logo.svg";
import search from "@/shared/assets/images/search.svg";
import { useAppDispatch, useAppSelector } from "@/shared/model";
import { IconButton } from "@/shared/ui/icon-button";
import { Select } from "@/shared/ui/select";
import Image from "next/image";
import { useState } from "react";
import styled from "styled-components";

const SidebarWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 250px;
  max-width: 324px;
  padding: 20px 16px;
  background-color: rgba(18, 24, 37, 1);
  border-radius: 18px;
  gap: 20px;
  flex-grow: 1;
`;

const SidebarHeading = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const SidebarMain = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  flex-grow: 1;
`;

const SidebarMainControls = styled.div`
  display: flex;
  gap: 10px;
`;

export function Sidebar() {
  const dispatch = useAppDispatch();
  const { chats } = useAppSelector((state) => state.chats);
  const [lang, setLang] = useState<string>("RU");

  return (
    <SidebarWrapper>
      <SidebarHeading>
        <Image src={logo} alt={"logo"} />
        <Select
          items={[
            { value: "RU", content: "RU" },
            { value: "EN", content: "EN" },
          ]}
          onChange={(value) => setLang(value)}
          value={lang}
          buttonIcon={<Image src={globe} alt={"globe"} />}
        />
      </SidebarHeading>
      <SidebarMain>
        <SidebarMainControls>
          <IconButton
            $active={true}
            onClick={() => dispatch(addChat({ existingChats: chats }))}
          >
            <Image src={addChatImage} alt={"addChat"} />
          </IconButton>
          <IconButton $active={false}>
            <Image src={search} alt={"search"} />
          </IconButton>
        </SidebarMainControls>
        <ChatsList />
      </SidebarMain>
      <Logout />
    </SidebarWrapper>
  );
}
