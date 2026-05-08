import FilterItems from "@/components/shared/filter-items";
import ListingCard from "@/components/shared/listing-card";
import { NoItems } from "@/components/shared/no-items";
import { SkeltonCard } from "@/components/shared/skeleton-card";
import { prisma } from "@/lib/db";
import { Suspense } from "react";
// TODO: move to service file
// TODO: oranize components properly
const getData = async (filter?: string) => {
  const data = await prisma.home.findMany({
    where: {
      addedCategory: true,
      addedDescription: true,
      addedLoaction: true,
      categoryName: filter,
    },
    select: {
      id: true,
      price: true,
      photo: true,
      description: true,
      country: true,
    },
  });
  return data;
};
export default async function page({
  searchParams,
}: {
  searchParams?: Promise<{ filter: string }>;
}) {
  const searchParamsData = await searchParams;
  return (
    <div className="container mx-auto px-5 lg:px-10">
      <FilterItems />
      <Suspense key={searchParamsData?.filter} fallback={<SkeletonLoading />}>
        <ShowItems searchParams={searchParamsData} />
      </Suspense>
    </div>
  );
}

async function ShowItems({
  searchParams,
}: {
  searchParams?: {
    filter?: string;
    // country?: string;
    // guest?: string;
    // room?: string;
    // bathroom?: string;
  };
}) {
  // const { getUser } = getKindeServerSession();
  // const user = await getUser();
  const data = await getData(searchParams?.filter);

  return (
    <>
      {data.length === 0 ? (
        <NoItems
          title="No Listings Found"
          description="Sorry, no listings match your current filter. Please try adjusting your search criteria."
        />
      ) : (
        <div className="grid lg:grid-cols-4 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-8">
          {data.map((item) => (
            <ListingCard
              key={item.id}
              description={item.description as string}
              imagePath={item.photo as string}
              location={item.country as string}
              price={item.price as number}
              // userId={user?.id}
              // favoriteId={item.Favorite[0]?.id}
              // isInFavoriteList={item.Favorite.length > 0 ? true : false}
              homeId={item.id}
              // pathName="/"
            />
          ))}
        </div>
      )}
    </>
  );
}

function SkeletonLoading() {
  return (
    <div className="grid lg:grid-cols-4 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-8">
      <SkeltonCard />
      <SkeltonCard />
      <SkeltonCard />
      <SkeltonCard />
      <SkeltonCard />
      <SkeltonCard />
      <SkeltonCard />
      <SkeltonCard />
      <SkeltonCard />
    </div>
  );
}
