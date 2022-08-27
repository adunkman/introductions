import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";

type LoaderData = {
  APP_NAME: string
}

export const loader: LoaderFunction = () => {
  return json({
    APP_NAME: process.env.APP_NAME,
  } as LoaderData);
}

export default function Index() {
  const { APP_NAME } = useLoaderData<LoaderData>();
  invariant(APP_NAME, "APP_NAME environmental variable is missing");

  return (
    <main>
      <h1>Welcome to {APP_NAME}!</h1>
      <p>Use the next few pages to introduce yourself and let us know what you’ll be working on today.</p>
      <Link to="/sessions/new">Continue</Link>
    </main>
  );
}
