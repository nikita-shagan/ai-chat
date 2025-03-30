import Arrow from "@/shared/assets/images/arrow.svg";
import { ReactNode, useEffect, useRef, useState } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  position: relative;
`;

const Button = styled.button<{ $outlined: boolean }>`
  border: ${({ $outlined }) =>
    $outlined ? "1px solid rgba(49, 62, 98, 1)" : "none"};
  padding: ${({ $outlined }) => ($outlined ? "9px 16px" : "0")};
  background: none;
  color: inherit;
  font-size: 16px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 6px;
  border-radius: 10px;
  font-weight: 600;
  line-height: 22px;
  min-width: 150px;
  min-height: 40px;

  &:focus {
    outline: none;
  }

  &:hover {
    opacity: 0.8;
  }
`;

const DropdownMenu = styled.ul<{ $open: boolean; $openUp: boolean }>`
  min-width: 68px;
  border-radius: 8px;
  border: 1px solid rgba(49, 62, 98, 1);
  padding: 8px;
  position: absolute;
  ${({ $openUp }) =>
    $openUp ? "bottom: calc(100% + 8px);" : "top: calc(100% + 8px);"}
  left: 0;
  flex-direction: column;
  gap: 2px;
  background: #121825;
  max-height: 360px;
  overflow-y: auto;
  display: ${({ $open }) => ($open ? "flex" : "none")};
`;

const DropdownMenuItem = styled.li<{ selected: boolean }>`
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

const Toggle = styled.div<{ $open: boolean; $openUp: boolean }>`
  width: 16px;
  height: 16px;
  top: 10px;
  left: 13px;
  border-width: 2px;
  transform: ${({ $open, $openUp }) =>
    $open
      ? $openUp
        ? "rotate(180deg)"
        : "rotate(0)"
      : $openUp
        ? "rotate(0)"
        : "rotate(180deg)"};
  display: flex;
  justify-content: center;
  align-items: center;
`;

export function Select(props: {
  items: { value: string; content: ReactNode }[];
  onChange: (value: string) => void;
  value: string | null;
  buttonIcon?: ReactNode;
  outlined?: boolean;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [openUp, setOpenUp] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (dropdownRef.current) {
      const rect = dropdownRef.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom;
      const spaceAbove = rect.top;
      setOpenUp(spaceBelow < 150 && spaceAbove > spaceBelow);
    }
  }, [isOpen]);

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

  const handleSelect = (value: string) => {
    props.onChange(value);
    setIsOpen(false);
  };

  return (
    <>
      <Overlay open={isOpen} onClick={() => setIsOpen(false)} />
      <Wrapper ref={dropdownRef}>
        <Button
          onClick={() => setIsOpen(!isOpen)}
          $outlined={props.outlined ?? false}
        >
          {props.buttonIcon}
          {props.items.find((item) => item.value === props.value)?.content}
          <Toggle $open={isOpen} $openUp={openUp}>
            <Arrow />
          </Toggle>
        </Button>
        <DropdownMenu $open={isOpen} $openUp={openUp}>
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
      </Wrapper>
    </>
  );
}
