"use server";

import { prisma } from "@/lib/db";
import { redirect } from "next/navigation";
import { supabase } from "./lib/supabase";

// create home
export async function createAirbnbHome({ userId }: { userId: string }) {
  const data = await prisma.home.findFirst({
    where: {
      userId: userId,
    },
    orderBy: {
      createdAT: "desc",
    },
  });
  if (data === null) {
    const data = await prisma.home.create({
      data: { userId },
    });
    return redirect(`/create/${data.id}/structure`);
  } else if (
    !data.addedCategory &&
    !data.addedDescription &&
    !data.addedLoaction
  ) {
    return redirect(`/create/${data.id}/structure`);
  } else if (data.addedCategory && !data.addedDescription) {
    return redirect(`/create/${data.id}/description`);
  } else if (
    data.addedCategory &&
    data.addedDescription &&
    !data.addedLoaction
  ) {
    return redirect(`/create/${data.id}/location`);
  }
}

// create category
export async function createCategory(formData: FormData) {
  const homeId = formData.get("homeId") as string;
  const categoryName = formData.get("categoryName") as string;
  await prisma.home.update({
    where: {
      id: homeId,
    },
    data: {
      categoryName: categoryName,
      addedCategory: true,
    },
  });
  return redirect(`/create/${homeId}/description`);
}

// create description
export async function createDescription(formData: FormData) {
  const homeId = formData.get("homeId") as string;
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const price = formData.get("price");
  const image = formData.get("image") as File;
  const guest = formData.get("guest") as string;
  const room = formData.get("room") as string;
  const bathroom = formData.get("bathroom") as string;
  let imageUrl: string = "";
  if (image) {
    const { data } = await supabase.storage
      .from("images")
      .upload(`images/${image.name}-${new Date()}`, image, {
        cacheControl: "2592000",
        contentType: "image/png",
      });
    // TODO: implement proper error handling for images
    // if (error) {
    //   throw error;
    // }
    imageUrl = data?.path as string;
  }

  await prisma.home.update({
    where: {
      id: homeId,
    },
    data: {
      title: title,
      description: description,
      price: Number(price),
      guests: guest,
      bedrooms: room,
      bathrooms: bathroom,
      photo: imageUrl,
      addedDescription: true,
    },
  });
  return redirect(`/create/${homeId}/location`);
}
