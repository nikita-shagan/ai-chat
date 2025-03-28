import Avatar from "@/shared/assets/images/avatar.svg";
import LogoutIcon from "@/shared/assets/images/logout.svg";
import { logout, useAppDispatch, useAppSelector } from "@/shared/model";
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
  font-weight: 500;
  font-size: 14px;
  line-height: 18px;
`;

const LogoutButton = styled(LogoutIcon)`
  cursor: pointer;
  margin-left: auto;
`;

export function Logout() {
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  return (
    <LogoutWrapper>
      <Avatar />
      <LogoutUser>
        <div>{user?.name}</div>
        <div>9 012 TKN</div>
      </LogoutUser>
      <LogoutButton onClick={() => dispatch(logout())} />
    </LogoutWrapper>
  );
}
