import avatar from "@/shared/assets/images/avatar-gradient.svg";
import logoutImage from "@/shared/assets/images/logout.svg";
import { logout, useAppDispatch, useAppSelector } from "@/shared/model";
import Image from "next/image";
import styled from "styled-components";

const LogoutWrapper = styled.div`
  min-height: 72px;
  border-radius: 18px;
  gap: 10px;
  padding: 16px;
  border: 1px solid rgba(49, 62, 98, 1);
  display: flex;
  align-items: center;
`;

const LogoutUser = styled.div`
  font-weight: 600;
  font-size: 16px;
  line-height: 22px;
  letter-spacing: 0%;
`;

const LogoutUserBalance = styled.div`
  font-weight: 500;
  font-size: 14px;
  line-height: 18px;
  letter-spacing: 0%;
`;

const LogoutButton = styled.div`
  cursor: pointer;
  margin-left: auto;
`;

export function Logout() {
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  return (
    <LogoutWrapper>
      <Image src={avatar} alt={"avatar"} />
      <LogoutUser>
        {user?.name}
        <LogoutUserBalance>9 012 TKN</LogoutUserBalance>
      </LogoutUser>
      <LogoutButton onClick={() => dispatch(logout())}>
        <Image src={logoutImage} alt={"logout"} />
      </LogoutButton>
    </LogoutWrapper>
  );
}
