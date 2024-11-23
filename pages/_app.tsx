import "@/styles/globals.css";
import { Spline_Sans_Mono, Spline_Sans } from "next/font/google";
import type { AppProps } from "next/app";

const splineSansMono = Spline_Sans_Mono({
  variable: "--font-spline-sans-mono",
  subsets: ["latin"],
});
const splineSans = Spline_Sans({
  variable: "--font-spline-sans",
  subsets: ["latin"],
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={`${splineSansMono.variable} sans-serif`}>
      <Component {...pageProps} />
      <style jsx global>{`
        :root {
          --font-spline-sans-mono: ${splineSansMono.style.fontFamily};
          --font-spline-sans: ${splineSans.style.fontFamily};
        }
      `}</style>
    </main>
  );
}
