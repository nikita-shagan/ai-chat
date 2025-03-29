"use client";

import { SignInForm } from "@/pages/sign-in/ui/sign-in-form";
import { auth, login, useAppDispatch, useAppSelector } from "@/shared/model";
import { Dialog } from "@/shared/ui/dialog";
import { PageLayout } from "@/shared/ui/page-layout";
import { PageLoading } from "@/shared/ui/page-loader";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function SignInPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { signedIn } = useAppSelector((state) => state.auth);

  useEffect(() => {
    dispatch(auth());
  }, [dispatch]);

  useEffect(() => {
    if (signedIn === true) {
      router.push("/");
    }
  }, [signedIn, router]);

  return (
    <PageLayout>
      {(signedIn || signedIn === null) && <PageLoading />}
      <Dialog title="Авторизация">
        <SignInForm onSubmit={(name) => dispatch(login(name))} />
      </Dialog>
    </PageLayout>
  );
}
