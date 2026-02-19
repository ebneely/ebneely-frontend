import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import { ThemeProvider } from "next-themes";
import { defaultLocale, getDictionary, Locale } from "@/i18n";
import Navbarbody from "@/components/body/navbarbody";
import Footer from "@/components/body/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const dictionary = await getDictionary(locale as Locale);

  return {
    title: dictionary.metadata.title,
    description: dictionary.metadata.description,
  };
}

export default async function RootLayout({
  children,
  params,
}: Props) {
  const { locale } = await params;
  const dictionary = await getDictionary(locale as Locale);
  
  const lang = (locale as Locale) || defaultLocale;
  const dir = lang === "ar" ? "rtl" : "ltr";

  return (
    <html lang={lang} dir={dir} suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbarbody content={dictionary.home.header} navItems={dictionary.nav} locale={locale} />
          <main className="flex-1">
            {children}
          </main>
          <Footer locale={locale} content={dictionary.footer} />
        </ThemeProvider>
      </body>
    </html>
  );
}
