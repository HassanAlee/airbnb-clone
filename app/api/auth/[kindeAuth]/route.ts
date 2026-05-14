// app/api/auth/[kindeAuth]/route.ts
import { handleAuth } from "@kinde-oss/kinde-auth-nextjs/server";

export const dynamic = "force-dynamic";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function GET(request: Request, ctx: any) {
  console.log("cookies:", request.headers.get("cookie"));
  return handleAuth()(request, ctx);
}
