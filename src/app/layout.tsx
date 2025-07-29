import localFont from 'next/font/local';
import './global.css';

const acciaReg = localFont({
  src: './fonts/AcciaFlareRegular.woff',
  variable: '--font-accia-reg',
  weight: '400',
  display: 'swap',
  preload: true,
});

const gilroySemibold = localFont({
  src: './fonts/GilroySemibold.woff',
  variable: '--font-gilroy-semibold',
  weight: '600',
  display: 'swap',
  preload: true,
});

const gilroyMedium = localFont({
  src: './fonts/GilroyMedium.woff',
  variable: '--font-gilroy-medium',
  weight: '500',
  display: 'swap',
  preload: true,
});

const gilroyRegular = localFont({
  src: './fonts/GilroyRegular.woff',
  variable: '--font-gilroy-regular',
  weight: '400',
  display: 'swap',
  preload: true,
});

const ttLivretDisplay = localFont({
  src: './fonts/TTLivretDisplayTrialLightItalic.woff',
  variable: '--font-livret-display',
  weight: '300',
  style: 'italic',
  display: 'swap',
  preload: true,
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html suppressHydrationWarning={true} lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
      </head>
      <body
        suppressHydrationWarning={true}
        className={`${acciaReg.variable} ${gilroyMedium.variable} ${gilroyRegular.variable} ${ttLivretDisplay.variable} ${gilroySemibold.variable}`}
      >
        {children}
      </body>
    </html>
  );
}
