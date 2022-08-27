export type UserAttrs = {
  name?: string,
  pronouns?: string,
};

export default class User implements UserAttrs {
  name: string | undefined;
  pronouns: string | undefined;

  constructor(attrs?: UserAttrs) {
    this.name = attrs?.name || undefined;
    this.pronouns = attrs?.pronouns || undefined;
  }

  asJSON(): UserAttrs {
    return {
      name: this.name,
      pronouns: this.pronouns,
    }
  }
}
