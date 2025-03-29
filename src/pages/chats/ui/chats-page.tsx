"use client";

import { Chat } from "@/pages/chats/ui/chat";
import { Sidebar } from "@/pages/chats/ui/sidebar";
import { auth, useAppDispatch, useAppSelector } from "@/shared/model";
import { PageLayout } from "@/shared/ui/page-layout";
import { PageLoading } from "@/shared/ui/page-loader";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function ChatsPage() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { signedIn } = useAppSelector((state) => state.auth);

  useEffect(() => {
    dispatch(auth());
  }, [dispatch]);

  useEffect(() => {
    if (signedIn === false) {
      router.push("/sign-in");
    }
  }, [signedIn, router]);

  return (
    <PageLayout>
      {!signedIn && <PageLoading />}
      <Sidebar />
      <Chat />
    </PageLayout>
  );
}
