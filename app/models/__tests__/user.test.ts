import { describe, expect, it } from "vitest";
import type { UserAttrs } from "../user";
import User, { UserType } from "../user";

describe.concurrent("User", () => {
  it("can be rehydrated from JSON representation", () => {
    const user = new User();
    const newUser = new User(user.asJSON() as UserAttrs);

    expect(newUser).toBeTruthy();
  });

  it("defaults to anonymous type if not set", () => {
    const user = new User();
    expect(user.type).toBe(UserType.Anonymous);
  })
});
