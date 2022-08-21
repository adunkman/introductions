import type { LoaderFunction } from "@remix-run/node";
import User, { UserType } from "~/models/user";
import { createUserSession } from "~/utils/session.server";

export const loader: LoaderFunction = ({ request }) => {
  const url = new URL(request.url);
  const type = url.searchParams.get("type") === "meetup"
    ? UserType.MeetupAccount
    : UserType.Anonymous;

  switch (type) {
    case UserType.Anonymous:
      return createUserSession(new User({ type }), "/wizard/name");

    default:
      throw new Error("Unknown user type.");
  }
};
