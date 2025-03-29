import Copy from "@/shared/assets/images/copy.svg";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
`;

export function CopyButton(props: { text?: string }) {
  return (
    <Wrapper onClick={() => navigator.clipboard.writeText(props.text ?? "")}>
      <Copy />
    </Wrapper>
  );
}
