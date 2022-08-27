import User from "./user";
import type { UserAttrs } from "./user";

export type IntroductionAttrs = {
  user: UserAttrs | User
  workingOn?: string
  helpNeeded?: string
  helpOffered?: string
  jobNeeded?: boolean
  jobNeededDetails?: string
  jobOffered?: boolean
  jobOfferedDetails?: string
};

export default class Introduction implements IntroductionAttrs {
  user: User;
  workingOn?: string | undefined;
  helpNeeded?: string | undefined;
  helpOffered?: string | undefined;
  jobNeeded: boolean;
  jobNeededDetails?: string | undefined;
  jobOffered: boolean;
  jobOfferedDetails?: string | undefined;

  constructor(attrs: IntroductionAttrs) {
    this.user =  attrs.user instanceof User ? attrs.user : new User(attrs.user);
    this.workingOn = attrs.workingOn;
    this.helpNeeded = attrs.helpNeeded;
    this.helpOffered = attrs.helpOffered;
    this.jobNeeded = !!attrs.jobNeeded;
    this.jobNeededDetails = attrs.jobNeeded ? attrs.jobNeededDetails : undefined;
    this.jobOffered = !!attrs.jobOffered;
    this.jobOfferedDetails = attrs.jobOffered ? attrs.jobOfferedDetails : undefined;
  }

  asJSON(): IntroductionAttrs {
    return {
      user: this.user.asJSON(),
      workingOn: this.workingOn,
      helpNeeded: this.helpNeeded,
      helpOffered: this.helpOffered,
      jobNeeded: this.jobNeeded,
      jobNeededDetails: this.jobNeededDetails,
      jobOffered: this.jobOffered,
      jobOfferedDetails: this.jobOfferedDetails,
    }
  }
}
