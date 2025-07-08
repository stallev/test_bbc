import type { MetadataRoute } from 'next';
import { RoutePath } from '@/constants';
import { DOMAIN_NAME } from '@/constants/EndpointsList';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${DOMAIN_NAME}${RoutePath.Home}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${DOMAIN_NAME}${RoutePath.AboutUs}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${DOMAIN_NAME}${RoutePath.UpcomingEvents}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${DOMAIN_NAME}${RoutePath.Contacts}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${DOMAIN_NAME}${RoutePath.Blog}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${DOMAIN_NAME}${RoutePath.Giving}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${DOMAIN_NAME}${RoutePath.LiveStreams}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.5,
    },
    {
      url: `${DOMAIN_NAME}${RoutePath.KidsMinistry}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.5,
    },
    {
      url: `${DOMAIN_NAME}${RoutePath.YouthMinistry}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.5,
    },
    {
      url: `${DOMAIN_NAME}${RoutePath.SmallGroupsMinistry}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.5,
    },
    {
      url: `${DOMAIN_NAME}${RoutePath.MissionaryMinistry}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.5,
    },
    {
      url: `${DOMAIN_NAME}${RoutePath.FamilyMinistry}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.5,
    },
    {
      url: `${DOMAIN_NAME}${RoutePath.WorshipMinistry}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.5,
    },
    {
      url: `${DOMAIN_NAME}${RoutePath.WomenMinistry}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.5,
    },
    {
      url: `${DOMAIN_NAME}${RoutePath.Staff}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.5,
    },
    {
      url: `${DOMAIN_NAME}${RoutePath.Terms}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.5,
    },
    {
      url: `${DOMAIN_NAME}${RoutePath.PrivacyPolicy}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.5,
    },
  ];
}
