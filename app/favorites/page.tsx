// TODO: orgnize this code

import ListingCard from "@/components/shared/listing-card";
import { NoItems } from "@/components/shared/no-items";
import { prisma } from "@/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

async function getData(userId: string) {
  const data = await prisma.favorite.findMany({
    where: {
      userId: userId,
    },
    select: {
      Home: {
        select: {
          photo: true,
          id: true,
          Favorite: true,
          price: true,
          country: true,
          description: true,
        },
      },
    },
  });

  return data;
}
export default async function page() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!user) redirect("/");
  const favorites = await getData(user.id);
  return (
    <>
      <section className="container mx-atuo px-5 lg:px-10 mt-10">
        <h2 className="text-3xl font-semibold tracking-tight mb-6">
          Your Favorites
        </h2>
        {favorites.length === 0 ? (
          <NoItems
            title="Hey you dont have any favorites"
            description="Please add favorites to see them right here..."
          />
        ) : (
          <div className="grid lg:grid-cols-4 sm:grid-cols-2 md:grid-cols-3 grid-cols-1 gap-8 mt-8">
            {favorites.map((item) => (
              <ListingCard
                key={item.Home?.id}
                description={item.Home?.description as string}
                location={item.Home?.country as string}
                pathName="/favorites"
                homeId={item.Home?.id as string}
                imagePath={item.Home?.photo as string}
                price={item.Home?.price as number}
                userId={user.id}
                favoriteId={item.Home?.Favorite[0].id as string}
                isInFavoriteList={
                  (item.Home?.Favorite.length as number) > 0 ? true : false
                }
              />
            ))}
          </div>
        )}
      </section>
    </>
  );
}
