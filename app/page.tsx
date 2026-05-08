import FilterItems from "@/components/shared/filter-items";
import ListingCard from "@/components/shared/listing-card";
import { prisma } from "@/lib/db";
// TODO: move to service file
const getData = async () => {
  const data = await prisma.home.findMany({
    where: {
      addedCategory: true,
      addedDescription: true,
      addedLoaction: true,
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
export default async function page() {
  const data = await getData();
  return (
    <div className="container mx-auto px-5 lg:px-10">
      <FilterItems />
      <div className="grid lg:grid-cols-4 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-8">
        {data.map((item) => (
          <ListingCard
            key={item.id}
            homeId={item.id}
            imagePath={item.photo as string}
            price={item.price as number}
            description={item.description as string}
            location={item.country as string}
          />
        ))}
      </div>
    </div>
  );
}
