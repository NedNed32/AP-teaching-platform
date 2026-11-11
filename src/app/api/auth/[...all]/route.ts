import { getAuth } from "@/server/auth";

async function handle(request: Request): Promise<Response> {
  const auth = await getAuth();
  if (!auth) {
    return Response.json({ error: "Accounts are not enabled on this server." }, { status: 404 });
  }
  return auth.handler(request);
}

export { handle as GET, handle as POST };
