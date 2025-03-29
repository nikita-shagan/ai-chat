"use client";

import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";
import { Stack } from "@/shared/ui/stack";
import { FormEvent, useState } from "react";
import styled from "styled-components";

const SignInFormWrapper = styled.div`
  & form {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
`;

export function SignInForm(props: {
  onSubmit: (name: string, password: string) => void;
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    props.onSubmit(email, password);
  };

  return (
    <SignInFormWrapper>
      <form onSubmit={handleSubmit} id="sign-in-form">
        <Stack>
          <Label>Имя</Label>
          <Input
            name="name"
            placeholder="Ваше имя"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </Stack>
        <Stack>
          <Label>Пароль</Label>
          <Input
            name="password"
            placeholder="Ваш пароль"
            required
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Stack>
        <Button type="submit">Войти</Button>
      </form>
    </SignInFormWrapper>
  );
}
