"use client";
import "bootstrap/dist/css/bootstrap.min.css";
import BootstrapJSLoad from "./Loaders/BootstrapJSLoad";
import "./globals.css";
import { ChatAppProvider } from "@/context/ChatAppContext";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ChatAppProvider>{children}</ChatAppProvider>
        <BootstrapJSLoad />
      </body>
    </html>
  );
}
