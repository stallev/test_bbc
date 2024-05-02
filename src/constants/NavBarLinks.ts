import { RoutePath } from "./RoutePath";

export const NavBarLinksNames = {
  HomeLinkName: "home_nav_link_text",
  MinistersLinkName: "ministers_nav_link_text",
  BroadcastsLinkName: "Broadcasts",
  SermonsLinkName: "sermons_nav_link_text",
  ContactsLinkName: "contacts_nav_link_text",
  GetInTouchLinkName: "contact_us_nav_link_text",
  GivingLinkName: "giving_nav_link_text",
  PrayerRequestLinkName: "prayer_request_nav_link_text",
  AboutUsLinkName: "about_us_nav_link_text",
  LiveStreamsLinkName: "live_streams_nav_link_text",
  PrivacyPolicy: "privacy_policy_nav_link_text",
  Terms: "terms_nav_link_text",
  GospelPageLinkName: "gospel_nav_link",
  ResourcesLinkName: "resources_nav_link",
  OurBeliefs: "beliefs_nav_link",
  Staff: "staff_nav_link",
  Ministries: "ministries_page_nav_link",
  KidsMinistry: "kids_ministry_nav_link",
  YouthMinistry: "youth_ministry_nav_link",
  WorshipMinistry: "worship_ministry_nav_link",
  FamilyMinistry: "family_ministry_nav_link",
  MissionaryMinistry: "missionary_ministry_nav_link",
  SmallGroupsMinistry: "small_groups_ministry_nav_link",
  Participation: "participation_nav_link",
  Timeline: "timeline_nav_link",
  Media: "media_nav_link",
  UpcomingEvents: "upcoming_events_nav_link",
  OurPlans: "our_plans_nav_link",
  Phones: "phones_nav_link",
  SpititualLife: "spiritual_life_nav_link",
  Blog: "pastors_blog_nav_link",
  Baptism: "baptism_blog_nav_link",
  Marriage: "marriage_blog_nav_link",
};

export const MainNavBarLinks = {
  // HomeLink: {
  //   link: RoutePath.Home,
  //   label: NavBarLinksNames.HomeLinkName,
  // },
  // MinistersLink: {
  //   link: RoutePath.Ministers,
  //   label: NavBarLinksNames.MinistersLinkName,
  // },
  // BroadcastsLink: {
  //   link: RoutePath.Broadcasts,
  //   label: NavBarLinksNames.BroadcastsLinkName,
  // },
  MinistriesLink: {
    link: "",
    label: NavBarLinksNames.Ministries,
    children: {
      KidsMinistryLink: {
        link: RoutePath.KidsMinistry,
        label: NavBarLinksNames.KidsMinistry,
      },
      YouthMinistryLink: {
        link: RoutePath.YouthMinistry,
        label: NavBarLinksNames.YouthMinistry,
      },
      SmallGroupsMinistryLink: {
        link: RoutePath.SmallGroupsMinistry,
        label: NavBarLinksNames.SmallGroupsMinistry,
      },
      MissionaryMinistryLink: {
        link: RoutePath.MissionaryMinistry,
        label: NavBarLinksNames.MissionaryMinistry,
      },
      FamilyMinistryLink: {
        link: RoutePath.FamilyMinistry,
        label: NavBarLinksNames.FamilyMinistry,
      },
      WorshipMinistryLink: {
        link: RoutePath.WorshipMinistry,
        label: NavBarLinksNames.WorshipMinistry,
      },
    },
  },

  AboutUsLink: {
    link: "",
    label: NavBarLinksNames.AboutUsLinkName,
    children: {
      StaffPageLinkName: {
        link: RoutePath.Staff,
        label: NavBarLinksNames.Staff,
      },
      OurBeliefs: {
        link: RoutePath.OurBeliefs,
        label: NavBarLinksNames.OurBeliefs,
      },
      TimelineLink: {
        link: RoutePath.Timeline,
        label: NavBarLinksNames.Timeline,
      },
      GospelPageLinkName: {
        link: RoutePath.GospelPage,
        label: NavBarLinksNames.GospelPageLinkName,
      },
      // ParticipationLink: {
      //   link: RoutePath.Participation,
      //   label: NavBarLinksNames.Participation,
      // },
    },
  },

  MediaLink: {
    link: "",
    label: NavBarLinksNames.Media,
    children: {
      LiveStreamsLink: {
        link: RoutePath.LiveStreams,
        label: NavBarLinksNames.LiveStreamsLinkName,
      },
      SermonsLink: {
        link: RoutePath.Sermons,
        label: NavBarLinksNames.SermonsLinkName,
      },
    },
  },

  GivingLinkName: {
    link: RoutePath.Giving,
    label: NavBarLinksNames.GivingLinkName,
    children: {},
  },

  OurPlans: {
    link: RoutePath.UpcomingEvents,
    label: NavBarLinksNames.UpcomingEvents,
    children: {},
  },

  Contacts: {
    link: "",
    label: NavBarLinksNames.ContactsLinkName,
    children: {
      GetInTouchLink: {
        link: RoutePath.GetInTouch,
        label: NavBarLinksNames.GetInTouchLinkName,
      },
      PrayerRequestLink: {
        link: RoutePath.PrayerRequest,
        label: NavBarLinksNames.PrayerRequestLinkName,
      },
      PhonesListLink: {
        link: RoutePath.Phones,
        label: NavBarLinksNames.Phones,
      },
    },
  },

  SpiritualLife: {
    link: "",
    label: NavBarLinksNames.SpititualLife,
    children: {
      PastorsBlog: {
        link: RoutePath.Blog,
        label: NavBarLinksNames.Blog,
      },
      Baptism: {
        link: RoutePath.Baptism,
        label: NavBarLinksNames.Baptism,
      },
      Marriage: {
        link: RoutePath.Marriage,
        label: NavBarLinksNames.Marriage,
      },
    },
  },
};
