"use client";

import { useState } from "react";
import { IconBrandGoogleFilled } from "@tabler/icons-react";

import { Button } from "@/lib/components/ui/button";
import { Heading } from "@/lib/components/ui/heading";
import { Text } from "@/lib/components/ui/text";
import { useLocale } from "@/lib/hooks/use-locale";

const GOOGLE_LOGIN_URL =
  "http://localhost:3000/auth/google?redirect_path=/console/dashboard";

export default function ConsoleLoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const { messages } = useLocale();
  const login = messages.login;

  return (
    <main className="flex min-h-screen items-center justify-center px-6 py-12">
      <div className="w-full max-w-sm space-y-6 text-center">
        <div className="space-y-3">
          <Heading as="h1" size="8" weight="bold" wrap="balance">
            {login.title}
          </Heading>
          <Text
            as="p"
            size="3"
            wrap="pretty"
            className="text-muted-foreground"
          >
            {login.description}
          </Text>
        </div>

        <Button
          size="lg"
          className="h-12 w-full justify-center rounded-xl"
          isLoading={isLoading}
          onClick={() => {
            setIsLoading(true);
            window.location.href = GOOGLE_LOGIN_URL;
          }}
        >
          {!isLoading && <IconBrandGoogleFilled className="size-4" />}
          <Text as="span" size="2" weight="medium" className="text-current">
            {isLoading ? login.loading : login.submit}
          </Text>
        </Button>

        <Text
          as="p"
          size="2"
          className="text-center text-muted-foreground"
        >
          {login.footer}
        </Text>
      </div>
    </main>
  );
}
