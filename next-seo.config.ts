 const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

 const DefaultSeoData = {
  title: "BBC",
  titleTemplate: 'Bible Baptist Church | %s',
  description: "Bible Baptist Church: faithfulness to the Bible, love for others, serving God and people. Join us!",
  openGraph: {
    type: 'website',
    locale: 'en',
    url: `${siteUrl}`,
    siteName: 'Bible Baptist Church',
    images: [
      {
        url: `${siteUrl}/default-og-image.jpg`,
        width: 400,
        height: 300,
        alt: 'Bible Baptist Church',
        type: 'image/jpeg',
      },
    ],
  },
  twitter: {
    cardType: 'summary',
  },
  dangerouslySetAllPagesToNoIndex: true,
  dangerouslySetAllPagesToNoFollow: true,
  additionalLinkTags: [
    {
      rel: 'icon',
      href: '/Logofavicon.svg',
    },
  ],
};

export default DefaultSeoData;
