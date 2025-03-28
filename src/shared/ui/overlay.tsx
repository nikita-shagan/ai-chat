import styled from "styled-components";

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 1);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;
