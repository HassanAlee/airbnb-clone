import { createReservation } from "@/app/actions";
import { getCountryByValue } from "@/app/lib/getCountries";
import { CategoryShowcase } from "@/components/shared/category-showcase";
import { HomeMap } from "@/components/shared/home-map";
import { SelectCalendar } from "@/components/shared/select-calendar";
import { ReservationSubmitButton } from "@/components/shared/submit-buttons";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { prisma } from "@/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { Link } from "lucide-react";
import Image from "next/image";
// TODO: fetch data in separate file
export const dynamic = "force-dynamic";
async function getData(homeid: string) {
  const data = await prisma.home.findUnique({
    where: {
      id: homeid,
    },
    select: {
      photo: true,
      description: true,
      guests: true,
      bedrooms: true,
      bathrooms: true,
      title: true,
      categoryName: true,
      price: true,
      country: true,
      Reservation: {
        select: {
          startDate: true,
          endDate: true,
        },
        orderBy: {
          createdAt: "asc",
        },
      },
      User: {
        select: {
          profileImage: true,
          firstName: true,
        },
      },
    },
  });

  return data;
}
export default async function HomeDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const data = await getData(id);
  const country = getCountryByValue(data?.country as string);
  const { getUser } = await getKindeServerSession();
  const user = await getUser();
  return (
    <div className="w-[75%] mx-auto mt-10 mb-12">
      <h1 className="font-medium text-2xl mb-5">{data?.title}</h1>
      <div className="relative h-[550px]">
        <Image
          alt="Image of Home"
          src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/images/${data?.photo}`}
          fill
          className="rounded-lg h-full object-cover w-full"
        />
      </div>

      <div className="flex justify-between gap-x-24 mt-8">
        <div className="w-2/3">
          <h3 className="text-xl font-medium">
            {country?.flag} {country?.label} / {country?.region}
          </h3>
          <div className="flex gap-x-2 text-muted-foreground">
            <p>{data?.guests} Guests</p> * <p>{data?.bedrooms} Bedrooms</p> *{" "}
            {data?.bathrooms} Bathrooms
          </div>

          <div className="flex items-center mt-6">
            {/* eslint-disable @next/next/no-img-element */}
            <img
              src={
                data?.User?.profileImage ??
                "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg"
              }
              alt="User Profile"
              className="w-11 h-11 rounded-full"
            />
            <div className="flex flex-col ml-4">
              <h3 className="font-medium">Hosted by {data?.User?.firstName}</h3>
              {/* TODO: fix hard coded value */}
              <p className="text-sm text-muted-foreground">Host since 2015</p>
            </div>
          </div>
          <Separator className="my-7" />
          <CategoryShowcase categoryName={data?.categoryName as string} />
          <Separator className="my-7" />
          <p className="text-muted-foreground">{data?.description}</p>
          <Separator className="my-7" />
          <HomeMap locationValue={data?.country as string} />
        </div>
        <form action={createReservation}>
          <input type="hidden" name="homeId" value={id} />
          <input type="hidden" name="userId" value={user?.id} />
          <SelectCalendar reservation={data?.Reservation} />
          {user?.id ? (
            <ReservationSubmitButton />
          ) : (
            <Button className="w-full" asChild>
              <Link href="/api/auth/login">Make a Reservation</Link>
            </Button>
          )}
        </form>
      </div>
    </div>
  );
}
