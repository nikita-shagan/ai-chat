import styled, { keyframes } from "styled-components";

const rotate = keyframes`
    to {
        transform: rotate(360deg);
    }
`;

export const Preloader = styled.div`
  display: flex;
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: #fff;
  animation: ${rotate} 1s ease-in-out infinite;
  width: 50px;
  height: 50px;
`;
