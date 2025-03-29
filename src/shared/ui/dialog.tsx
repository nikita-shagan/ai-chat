import closeImage from "@/shared/assets/images/close.svg";
import Image from "next/image";
import { MouseEvent, ReactNode } from "react";
import styled from "styled-components";

const DialogOverlay = styled.div<{ $isOpened: boolean }>`
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  padding: 19px;
  display: flex;
  justify-content: center;
  align-items: center;
  visibility: ${({ $isOpened }) => ($isOpened ? "visible" : "hidden")};
  opacity: ${({ $isOpened }) => ($isOpened ? 1 : 0)};
  transition:
    visibility 0.2s linear,
    opacity 0.2s linear;
`;

const DialogBody = styled.div`
  width: 100%;
  min-width: 150px;
  max-width: 460px;
  min-height: 150px;
  border-radius: 12px;
  background-color: rgba(49, 62, 98, 1);
  padding: 20px;
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const DialogClose = styled(Image).attrs({ priority: true })`
  position: absolute;
  top: -40px;
  right: -40px;
  display: block;
  cursor: pointer;
  width: 32px;
  height: 32px;
  background-color: transparent;
  margin: 0;
  padding: 0;
  border: none;

  &:hover {
    opacity: 0.6;
  }

  @media screen and (max-width: 720px) {
    right: 0;
    top: -36px;
    width: 20px;
    height: 20px;
  }
`;

const DialogTitle = styled.div`
  font-weight: 600;
  font-size: 22px;
  line-height: 29px;
  padding-bottom: 4px;
`;

export function Dialog(props: {
  isOpened?: boolean;
  onClose?: () => void;
  title?: string;
  children?: ReactNode;
}) {
  const handleOverlayClick = (e: MouseEvent<HTMLDivElement>) => {
    if (props.onClose && e.target === e.currentTarget) {
      props.onClose();
    }
  };

  return (
    <DialogOverlay
      $isOpened={props.isOpened ?? true}
      onClick={handleOverlayClick}
    >
      <DialogBody>
        {props.onClose && (
          <DialogClose src={closeImage} alt="close" onClick={props.onClose} />
        )}
        <DialogTitle>{props.title}</DialogTitle>
        {props.children}
      </DialogBody>
    </DialogOverlay>
  );
}
