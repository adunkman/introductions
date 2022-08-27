import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { InputText } from "~/components/InputText";
import type { UserAttrs } from "~/models/user";
import User from "~/models/user";
import { createUserSession, getUserSession } from "~/utils/session.server";

export const loader: LoaderFunction = async ({ request }) => {
  const user = await getUserSession(request);
  const { searchParams } = new URL(request.url);

  return json({
    name: user?.name || searchParams.get("name"),
    pronouns: user?.pronouns || searchParams.get("pronouns")
  } as UserAttrs);
}

export default function NewSession() {
  const user = new User(useLoaderData<UserAttrs>());

  return (
    <main>
      <h1>Welcome!</h1>
      <p>We’ll share your name and pronouns with others attending today.</p>
      <p>As a reminder, you have agreed to our <Link to="/code-of-conduct" target="_blank">Code of Conduct</Link>.</p>

      <form method="post">
        <InputText name="name" defaultValue={user.name} required>
          What is your first name?
        </InputText>

        <InputText name="pronouns" defaultValue={user.pronouns} required>
          What pronouns do you use?
        </InputText>

        <button type="submit">Continue</button>
      </form>
    </main>
  );
}

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const user = new User({
    name: formData.get("name") as string,
    pronouns: formData.get("pronouns") as string,
  });

  return createUserSession(user, "/introductions/new");
};
