# Slug Naming Rules for 'ministry' Posts

1. **Slug values for each page and 'ministry' post must be explicitly defined in `PagesSlugs.ts` before creating a new page or 'ministry' post.**
   - When creating or editing a 'ministry' post in Wordpress, always use the slug values from `PagesSlugs.ts` for both English (`en`) and Russian (`ru`) locales.
   - This ensures consistency between the frontend and backend, and prevents routing or data-fetching errors.

2. **Use only lowercase English letters, numbers, and hyphens.**
   - Example: `youth`, `worship`, `kids`

3. **No spaces or special characters.**
   - Do not use spaces, underscores, or any special characters other than hyphens.
   - Example: Use `family` instead of `family_ministry` or `family ministry`.

4. **No leading or trailing slashes.**
   - Correct: `youth`
   - Incorrect: `/youth/`

5. **Each slug must be unique across all pages and posts in Wordpress.**

---

## Ministry and Page Slugs from `PagesSlugs.ts`

| Name                | English (`en`)         | Russian (`ru`)           |
|---------------------|------------------------|--------------------------|
| Home                | home                   | home-ru                  |
| Ministers           | ministers              | ministers-ru             |
| Broadcasts          | broadcasts             | broadcasts-ru            |
| Sermons             | sermons                | sermons-ru               |
| Contacts            | contact-us             | contact-us-ru            |
| GetInTouch          | get-in-touch           | get-in-touch-ru          |
| AboutUs             | about-us               | about-us-ru              |
| Giving              | giving                 | giving-ru                |
| LiveStreams         | live-streams           | live-streams-ru          |
| Terms               | terms                  | terms-ru                 |
| PrivacyPolicy       | privacy                | privacy-ru               |
| Staff               | staff                  | staff-ru                 |
| UpcomingEvents      | upcoming-events        | upcoming-events-ru       |
| KidsMinistry        | kids                   | kids-ru                  |
| YouthMinistry       | youth                  | youth-ru                 |
| WorshipMinistry     | worship                | worship-ru               |
| FamilyMinistry      | family                 | family-ru                |
| MissionaryMinistry  | missionary             | missionary-ru            |
| SmallGroupsMinistry | small-groups           | small-groups-ru          |
| WomenMinistry       | women                  | women-ru                 |
| Media               | media                  | media-ru                 |
| PastorsBlog         | blog                   | blog-ru                  |

---

**Summary:**
Before creating or editing any 'ministry' post or page in Wordpress, always check and use the corresponding slug from `PagesSlugs.ts`. This guarantees correct routing and data fetching in your Next.js frontend.
