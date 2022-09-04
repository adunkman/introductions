import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { useState } from "react";
import { InputCheckbox } from "~/components/InputCheckbox";
import { InputText } from "~/components/InputText";
import { InputTextarea } from "~/components/InputTextarea";
import { Toggle } from "~/components/Toggle";
import Introduction from "~/models/introduction";
import type { UserAttrs } from "~/models/user";
import User from "~/models/user";
import { requireUserSession } from "~/utils/session.server";

export const loader: LoaderFunction = async ({ request }) => {
  const user = await requireUserSession(request);
  return json(user.asJSON());
}

export default function NewIntroduction() {
  const user = new User(useLoaderData<UserAttrs>());
  const [ jobNeeded, setJobNeeded ] = useState<boolean>(false);
  const [ jobOffered, setJobOffered ] = useState<boolean>(false);
  const [ jobNeededDetails, setJobNeededDetails ] = useState<string>("");
  const [ jobOfferedDetails, setJobOfferedDetails ] = useState<string>("");

  return (
    <main>
      <h1>Welcome {user.name}!</h1>
      <p>We’ll share your answers here with others attending today to help you make meaningful connections.</p>
      <p>As a reminder, you have agreed to our <Link to="/code-of-conduct" target="_blank">Code of Conduct</Link>.</p>
      <form method="post" action="/introductions/new">
        <InputText name="working-on">
          What are you working on today?
        </InputText>

        <InputText name="help-needed">
          What can <strong>others help you</strong> with?
        </InputText>

        <InputText name="help-offered">
          What can <strong>you help others</strong> with?
        </InputText>

        <InputCheckbox name="job-needed" checked={jobNeeded} onChecked={setJobNeeded}>
          I am looking for a job.
        </InputCheckbox>

        <Toggle visible={jobNeeded}>
          <div className="indent">
            <InputTextarea name="job-needed-details" value={jobNeededDetails} onChange={setJobNeededDetails}>
              Tell us about what you’re looking for (companies, titles, areas of work).
            </InputTextarea>
          </div>
        </Toggle>

        <InputCheckbox name="job-offered" checked={jobOffered} onChecked={setJobOffered}>
          My organization is hiring.
        </InputCheckbox>

        <Toggle visible={jobOffered}>
          <div className="indent">
            <InputTextarea name="job-offered-details" value={jobOfferedDetails} onChange={setJobOfferedDetails}>
              Tell us about the company and role(s) available.
            </InputTextarea>
          </div>
        </Toggle>

        <button type="submit">Send</button>
      </form>
    </main>
  );
}

export const action: ActionFunction = async ({ request }) => {
  const user = await requireUserSession(request);
  const formData = await request.formData();
  const introduction = new Introduction({
    user: user,
    workingOn: formData.get("working-on") as string,
    helpNeeded: formData.get("help-needed") as string,
    helpOffered: formData.get("help-offered") as string,
    jobNeeded: formData.get("job-needed") === "on",
    jobNeededDetails: formData.get("job-needed-details") as string,
    jobOffered: formData.get("job-offered") === "on",
    jobOfferedDetails: formData.get("job-offered-details") as string,
  });

  console.log(introduction);
  throw new Error("saving not yet implemented");
};
