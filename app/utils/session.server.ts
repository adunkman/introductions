import { createCookieSessionStorage, redirect } from "@remix-run/node";
import { Duration } from "luxon";
import invariant from "tiny-invariant";
import User from "~/models/user";

const { APP_SESSION_SECRET } = process.env;
invariant(APP_SESSION_SECRET, "APP_SESSION_SECRET environmental variable is missing")

const storage = createCookieSessionStorage({
  cookie: {
    name: "session",
    secure: process.env.NODE_ENV === "production",
    secrets: [ APP_SESSION_SECRET ],
    sameSite: "strict",
    path: "/",
    maxAge: Duration.fromObject({ months: 1 }).as("seconds"),
    httpOnly: true,
  }
});

export async function createUserSession(
  user: User,
  redirectTo: string,
) {
  const session = await storage.getSession();
  session.set("user", user.asJSON());
  return redirect(redirectTo, {
    headers: {
      "Set-Cookie": await storage.commitSession(session)
    }
  });
}

export async function getUserSession(
  request: Request
) {
  const session = await storage.getSession(request.headers.get("Cookie"));
  const data = session.get("user");

  try {
    return new User(data);
  }
  catch (err) { }

  return null;
}

export async function requireUserSession(
  request: Request
) {
  const user = await getUserSession(request);

  if (!user) {
    throw redirect(`/`);
  }

  return user;
}
