import styled from "styled-components";

export const Button = styled.button`
  background-color: rgba(28, 100, 242, 1);
  box-shadow: 0 1px 1px 0 rgba(255, 255, 255, 0.4) inset;
  color: white;
  font-size: 16px;
  font-weight: bold;
  border: none;
  cursor: pointer;
  text-align: center;
  height: 52px;
  border-radius: 8px;
  gap: 10px;
  padding: 14px 24px;
  &:hover {
    background-color: rgb(23, 86, 211);
  }
  &:active {
    background-color: rgb(23, 86, 211);
  }
`;
