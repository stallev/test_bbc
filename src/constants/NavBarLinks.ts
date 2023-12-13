import { RoutePath } from "./RoutePath";

export const NavBarLinksNames = {
  HomeLinkName: 'Home',
  MinistersLinkName: 'ministers_nav_link_text',
  BroadcastsLinkName: 'Broadcasts',
  SermonsLinkName: 'sermons_nav_link_text',
  ContactUsLinkName: 'contact_us_nav_link_text',
  BlogLinkName: 'blog_nav_link_text',
  AboutUsLinkName: 'about_us_nav_link_text',
  LiveStreamsLinkName: 'live_streams_nav_link_text',
}

export const NavBarLinks = {
  // HomeLink: {
  //   link: RoutePath.Home,
  //   label: NavBarLinksNames.HomeLinkName,
  // },
  MinistersLink: {
    link: RoutePath.Ministers,
    label: NavBarLinksNames.MinistersLinkName,
  },
  // BroadcastsLink: {
  //   link: RoutePath.Broadcasts,
  //   label: NavBarLinksNames.BroadcastsLinkName,
  // },
  LiveStreamsLink: {
    link: RoutePath.LiveStreams,
    label: NavBarLinksNames.LiveStreamsLinkName
  },
  // SermonsLink: {
  //   link: RoutePath.Sermons,
  //   label: NavBarLinksNames.SermonsLinkName
  // },
  ContactUsLink: {
    link: RoutePath.ContactUs,
    label: NavBarLinksNames.ContactUsLinkName
  },
  // BlogLink: {
  //   link: RoutePath.Blog,
  //   label: NavBarLinksNames.BlogLinkName,
  // },
  // AboutUsLink: {
  //   link: RoutePath.AboutUs,
  //   label: NavBarLinksNames.AboutUsLinkName,
  // },
};
