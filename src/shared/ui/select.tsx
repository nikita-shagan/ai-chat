import Arrow from "@/shared/assets/images/arrow.svg";
import { ReactNode, useEffect, useRef, useState } from "react";
import styled from "styled-components";

const DropdownWrapper = styled.div`
  position: relative;
`;

const DropdownButton = styled.button<{ $outlined: boolean }>`
  border: ${({ $outlined }) =>
    $outlined ? "1px solid rgba(49, 62, 98, 1)" : "none"};
  padding: ${({ $outlined }) => ($outlined ? "11px 16px" : "0")};
  background: none;
  color: inherit;
  font-size: 16px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 6px;
  border-radius: 6px;
  font-weight: 600;
  line-height: 22px;
  min-width: 70px;

  &:focus {
    outline: none;
  }

  &:hover {
    opacity: 0.8;
  }
`;

const DropdownMenu = styled.div<{ open: boolean }>`
  min-width: 68px;
  border-radius: 8px;
  border: 1px solid rgba(49, 62, 98, 1);
  padding: 8px;
  position: absolute;
  top: calc(100% + 8px);
  left: 0;
  flex-direction: column;
  gap: 2px;
  background: rgba(18, 24, 37, 0.75);
  overflow: hidden;
  display: ${({ open }) => (open ? "flex" : "none")};
`;

const DropdownMenuItem = styled.div<{ selected: boolean }>`
  padding: 10px 16px;
  cursor: pointer;
  border-radius: 8px;
  background: ${({ selected }) =>
    selected ? "rgba(49, 62, 98, 1)" : "transparent"};
  &:hover {
    background: rgba(49, 62, 98, 1);
  }
`;

const Overlay = styled.div<{ open: boolean }>`
  display: ${({ open }) => (open ? "block" : "none")};
  position: fixed;
  inset: 0;
  z-index: 0;
`;

const Toggle = styled.div<{ open: boolean }>`
  width: 16px;
  height: 16px;
  top: 10px;
  left: 13px;
  border-width: 2px;
  transform: ${({ open }) => (open ? "rotate(360deg)" : "rotate(180deg)")};
  display: flex;
  justify-content: center;
  align-items: center;
`;

export function Select(props: {
  items: { value: string; content: ReactNode }[];
  onChange: (value: string) => void;
  value: string;
  buttonIcon?: ReactNode;
  outlined?: boolean;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleSelect = (value: string) => {
    props.onChange(value);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  return (
    <>
      <Overlay open={isOpen} onClick={() => setIsOpen(false)} />
      <DropdownWrapper ref={dropdownRef}>
        <DropdownButton
          onClick={() => setIsOpen(!isOpen)}
          $outlined={props.outlined ?? false}
        >
          {props.buttonIcon}
          {props.items.find((item) => item.value === props.value)?.content}
          <Toggle open={isOpen}>
            <Arrow />
          </Toggle>
        </DropdownButton>
        <DropdownMenu open={isOpen}>
          {props.items.map((item) => (
            <DropdownMenuItem
              key={item.value}
              selected={item.value === props.value}
              onClick={() => handleSelect(item.value)}
            >
              {item.content}
            </DropdownMenuItem>
          ))}
        </DropdownMenu>
      </DropdownWrapper>
    </>
  );
}
