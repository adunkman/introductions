import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import type { UserAttrs } from "~/models/user";
import User from "~/models/user";
import { requireUserSession } from "~/utils/session.server";

type LoaderData = {
  userAttrs: UserAttrs;
}

export const loader: LoaderFunction = async ({ request }) => {
  const data: LoaderData = {
    userAttrs: (await requireUserSession(request)).asJSON()
  };

  return json(data);
}

export default function WizardName() {
  const { userAttrs } = useLoaderData<LoaderData>();
  const user = new User(userAttrs);

  return (
    <main>
      <h1>Introductions</h1>
      <form>
        <label htmlFor="name">What is your first name?</label>
        <input type="text" name="name" id="name" value={user.name} />

        <label htmlFor="pronouns">What pronouns do you use?</label>
        <input type="text" name="pronouns" id="pronouns" value={user.pronouns} />

        <button type="submit">Continue</button>
      </form>
    </main>
  );
}
