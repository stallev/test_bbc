import { RoutePath } from "./RoutePath";

export const NavBarLinksNames = {
  HomeLinkName: "home_nav_link_text",
  MinistersLinkName: "ministers_nav_link_text",
  BroadcastsLinkName: "Broadcasts",
  SermonsLinkName: "sermons_nav_link_text",
  ContactUsLinkName: "contact_us_nav_link_text",
  GivingLinkName: "giving_nav_link_text",
  PrayerRequestLinkName: "prayer_request_nav_link_text",
  BlogLinkName: "blog_nav_link_text",
  AboutUsLinkName: "about_us_nav_link_text",
  LiveStreamsLinkName: "live_streams_nav_link_text",
  PrivacyPolicy: "privacy_policy_nav_link_text",
  Terms: "terms_nav_link_text",
  GospelPageLinkName: "gospel_nav_link",
  ResourcesLinkName: "resources_nav_link",
  OurBeliefs: "beliefs_nav_link",
  Staff: "staff_nav_link",
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

  PrayerRequestLink: {
    link: RoutePath.PrayerRequest,
    label: NavBarLinksNames.PrayerRequestLinkName,
    children: {},
  },
  // MinistersLink: {
  //   link: RoutePath.Ministers,
  //   label: NavBarLinksNames.MinistersLinkName,
  // },
  LiveStreamsLink: {
    link: RoutePath.LiveStreams,
    label: NavBarLinksNames.LiveStreamsLinkName,
    children: {},
  },
  GivingLinkName: {
    link: RoutePath.Giving,
    label: NavBarLinksNames.GivingLinkName,
    children: {},
  },

  // SermonsLink: {
  //   link: RoutePath.Sermons,
  //   label: NavBarLinksNames.SermonsLinkName
  // },
  // ContactUsLink: {
  //   link: RoutePath.ContactUs,
  //   label: NavBarLinksNames.ContactUsLinkName
  // },
  // BlogLink: {
  //   link: RoutePath.Blog,
  //   label: NavBarLinksNames.BlogLinkName,
  // },
  AboutUsLink: {
    link: RoutePath.AboutUs,
    label: NavBarLinksNames.AboutUsLinkName,
    children: {
      OurBeliefs: {
        link: RoutePath.OurBeliefs,
        label: NavBarLinksNames.OurBeliefs,
      },
      GospelPageLinkName: {
        link: RoutePath.GospelPage,
        label: NavBarLinksNames.GospelPageLinkName,
      },
      StaffPageLinkName: {
        link: RoutePath.Staff,
        label: NavBarLinksNames.Staff,
      },
      SermonsLink: {
        link: RoutePath.Sermons,
        label: NavBarLinksNames.SermonsLinkName,
      },
      ContactUsLink: {
        link: RoutePath.ContactUs,
        label: NavBarLinksNames.ContactUsLinkName,
      },
    },
  },
};
