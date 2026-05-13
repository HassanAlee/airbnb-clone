import { prisma } from "@/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextResponse } from "next/server";

export async function GET() {
  const { getUser } = getKindeServerSession();
  console.log("i am in api route");
  console.log("eer", process.env.KINDE_SITE_URL!);

  const user = await getUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  let dbUser = await prisma.user.findUnique({ where: { id: user.id } });
  if (!dbUser) {
    dbUser = await prisma.user.create({
      data: {
        email: user.email!,
        id: user.id,
        firstName: user.given_name!,
        lastName: user.family_name!,
        profileImage:
          user.picture ?? `https://avatar.vercel.sh/${user.given_name}`,
      },
    });
  }

  return NextResponse.redirect(process.env.KINDE_SITE_URL!);
}
