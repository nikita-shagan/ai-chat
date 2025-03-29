import { DetailedHTMLProps, InputHTMLAttributes, ReactNode } from "react";
import styled from "styled-components";

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  background: rgba(18, 24, 37, 1);
  border: 1px solid rgba(49, 62, 98, 1);
  border-radius: 8px;
  overflow: hidden;
  height: 54px;
`;

const InputComponent = styled.input`
  padding: 16px;
  font-weight: 400;
  font-size: 16px;
  line-height: 22px;
  color: #fff;
  background: transparent;
  border: none;
  flex-grow: 1;

  &::placeholder {
    color: rgba(97, 109, 141, 1);
  }

  &:focus {
    outline: none;
  }
`;

const InputAdornment = styled.div`
  padding: 0 20px 0 0;
`;

type htmlInputProps = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

export function Input(props: htmlInputProps & { endAdornment?: ReactNode }) {
  const inputComponentProps = { ...props };
  delete inputComponentProps.endAdornment;
  return (
    <InputWrapper>
      <InputComponent {...inputComponentProps} />
      {props.endAdornment && (
        <InputAdornment>{props.endAdornment}</InputAdornment>
      )}
    </InputWrapper>
  );
}
