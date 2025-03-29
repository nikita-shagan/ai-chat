import styled from "styled-components";

export const IconButton = styled.button<{ $active?: boolean }>`
  background-color: ${({ $active }) =>
    $active ? "rgba(28, 100, 242, 1)" : "transparent"};
  color: white;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  text-align: center;
  border-radius: 8px;
  gap: 10px;
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid rgba(49, 62, 98, 1);
  &:hover {
    opacity: 0.8;
  }
`;
