import copy from "@/shared/assets/images/copy.svg";
import Image from "next/image";
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
      <Image src={copy} alt={"copy"} />
    </Wrapper>
  );
}
