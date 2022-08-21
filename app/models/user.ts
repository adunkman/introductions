export type UserAttrs = {
  type: UserType,
  name?: string,
  pronouns?: string,
};

export enum UserType {
  MeetupAccount,
  Anonymous,
}

export default class User implements UserAttrs {
  type: UserType;
  name: string | undefined;
  pronouns: string | undefined;

  constructor(attrs?: UserAttrs) {
    this.type = attrs?.type || UserType.Anonymous;
    this.name = attrs?.name || undefined;
    this.pronouns = attrs?.pronouns || undefined;
  }

  asJSON(): UserAttrs {
    return {
      type: this.type,
      name: this.name,
      pronouns: this.pronouns,
    }
  }
}
