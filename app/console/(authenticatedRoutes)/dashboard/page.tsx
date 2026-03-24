import { Heading } from "@/lib/components/ui/heading";
import { Text } from "@/lib/components/ui/text";
import { serverApiFetch } from "@/lib/api/fetch/server-api-fetch";
import { Restaurant } from "@/lib/types/restaurant";
import { CreateRestaurantForm } from "./create-restaurant-form";
import { getCurrentUser } from "@/lib/api/auth/get-current-user";





export default async function UserDashboard() {
  const user = await getCurrentUser();
  const restaurants = await serverApiFetch<Restaurant[]>(
    `/restaurant/me`
  );

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-3xl flex-col gap-6 p-8">
      <header className="space-y-3">
        <Heading as="h1" size="8" weight="bold">
          Console restaurant
        </Heading>
        <Text as="p" size="4" className="text-muted-foreground">
          Cette page charge les donnees du dashboard cote serveur depuis{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
            /console/dashboard
          </code>
          .
        </Text>
      </header>

      <section className="space-y-3 rounded-2xl border bg-card p-5">
        <Text as="p" size="2" weight="bold">
          Etat de session
        </Text>
        <Text as="p" size="3">
          Authentifie
        </Text>
      </section>

      <section className="space-y-3 rounded-2xl border bg-card p-5">
        <Text as="p" size="2" weight="bold">
          Utilisateur
        </Text>
        <pre className="overflow-x-auto rounded-xl bg-muted p-4 text-sm leading-6">
          <code>{JSON.stringify(user, null, 2)}</code>
        </pre>
      </section>


      <section className="space-y-4 rounded-2xl border bg-card p-5">
        <div className="space-y-1">
          <Text as="p" size="2" weight="bold">
            Restaurants
          </Text>
          <Text as="p" size="2" className="text-muted-foreground">
            {restaurants.length} restaurant{restaurants.length > 1 ? "s" : ""} lie
            {restaurants.length > 1 ? "s" : ""} a ce compte.
          </Text>
        </div>

        {restaurants.length > 0 ? (
          <div className="grid gap-3">
            {restaurants.map((restaurant) => (
              <article
                key={restaurant.id}
                className="rounded-xl border bg-background p-4"
              >
                <Text as="p" size="3" weight="bold">
                  {restaurant.name || "Restaurant sans nom"}
                </Text>
                <Text as="p" size="2" className="text-muted-foreground">
                  ID: {restaurant.id}
                </Text>
                {restaurant.slug ? (
                  <Text as="p" size="2" className="text-muted-foreground">
                    Slug: {restaurant.slug}
                  </Text>
                ) : null}
                {restaurant.address ? (
                  <Text as="p" size="2" className="text-muted-foreground">
                    Adresse: {restaurant.address}
                  </Text>
                ) : null}
              </article>
            ))}
          </div>
        ) : (
          <div className="rounded-xl bg-muted p-4">
            <Text as="p" size="3">
              Aucun restaurant trouve pour cet utilisateur.
            </Text>
          </div>
        )}
      </section>

      <CreateRestaurantForm />

    </main>
  );
}
