import { ThemeProvider } from "next-themes";
import './globals.css';
import Nevbar from "@/components/nevbar";

export const metadata = {
  title: 'Car Blog',
  description: 'A blog about cars',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider attribute="class">
        <Nevbar />
          <main className="max-w-4xl mx-auto px-4">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
