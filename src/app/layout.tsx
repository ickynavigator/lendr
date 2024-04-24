import "~/styles/globals.css";
import "@mantine/core/styles.css";

import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

import theme from "~/theme";
import { TRPCReactProvider } from "~/trpc/react";

export const metadata = {
  title: "Create T3 App",
  description: "Generated by create-t3-app",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
      </head>

      <body>
        <MantineProvider theme={theme}>
          <TRPCReactProvider>{children}</TRPCReactProvider>
        </MantineProvider>

        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
