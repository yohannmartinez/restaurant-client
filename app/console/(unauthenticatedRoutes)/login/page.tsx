"use client";

import { useState } from "react";
import {
  IconBrandGoogleFilled,
  IconSparkles,
} from "@tabler/icons-react";

import { Button } from "@/lib/components/ui/button";
import { Heading } from "@/lib/components/ui/heading";
import { Text } from "@/lib/components/ui/text";

const GOOGLE_LOGIN_URL =
  "http://localhost:3000/auth/google?redirect_path=/console/dashboard";

export default function ConsoleLoginPage() {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.98),rgba(245,244,240,0.98)_45%,rgba(236,233,226,1)_100%)] text-foreground dark:bg-[radial-gradient(circle_at_top_left,rgba(38,35,31,1),rgba(19,18,17,1)_45%,rgba(10,10,10,1)_100%)]">
      <div className="grid min-h-screen lg:grid-cols-[1fr_1.5fr]">
        <section className="relative hidden overflow-hidden border-r border-black/8 lg:flex dark:border-white/8">
          test
        </section>

        <section className="flex items-center justify-center p-5 sm:p-8 lg:p-10">
          <div className="w-full max-w-md">
            <div className="rounded-[2rem] border border-black/8 bg-white/82 p-6 shadow-[0_24px_80px_rgba(19,19,18,0.08)] backdrop-blur-xl sm:p-8 dark:border-white/10 dark:bg-black/30 dark:shadow-[0_24px_80px_rgba(0,0,0,0.35)]">
              <div className="space-y-6">
                <div className="space-y-3">
                  <Text
                    as="p"
                    size="2"
                    className="uppercase tracking-[0.24em] text-muted-foreground"
                  >
                    Console
                  </Text>
                  <Heading as="h1" size="8" weight="bold" wrap="balance">
                    Connexion a l&apos;espace d&apos;administration
                  </Heading>
                  <Text
                    as="p"
                    size="3"
                    wrap="pretty"
                    className="text-muted-foreground"
                  >
                    Connecte-toi avec Google pour acceder au back-office de ton
                    restaurant.
                  </Text>
                </div>

                <div className="rounded-2xl border border-black/6 bg-stone-50 p-4 dark:border-white/8 dark:bg-white/4">
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 flex size-9 items-center justify-center rounded-xl bg-white shadow-sm dark:bg-white/10 dark:shadow-none">
                      <IconSparkles className="size-4 text-stone-700 dark:text-stone-200" />
                    </div>
                    <div className="space-y-1">
                      <Text as="p" size="2" weight="medium">
                        Connexion unique
                      </Text>
                      <Text as="p" size="2" className="text-muted-foreground">
                        Pour l&apos;instant, la connexion se fait uniquement avec
                        ton compte Google autorise.
                      </Text>
                    </div>
                  </div>
                </div>

                <Button
                  size="lg"
                  className="h-12 w-full justify-center rounded-2xl bg-stone-950 text-white hover:bg-stone-800 dark:bg-white dark:text-black dark:hover:bg-white/90"
                  isLoading={isLoading}
                  onClick={() => {
                    setIsLoading(true);
                    window.location.href = GOOGLE_LOGIN_URL;
                  }}
                >
                  {!isLoading && <IconBrandGoogleFilled className="size-4" />}
                  <Text as="span" size="2" weight="medium" className="text-current">
                    {isLoading ? "Redirection en cours..." : "Continuer avec Google"}
                  </Text>
                </Button>

                <Text
                  as="p"
                  size="2"
                  className="text-center text-muted-foreground"
                >
                  En continuant, tu accedes a la console privee de gestion de ton
                  restaurant.
                </Text>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
