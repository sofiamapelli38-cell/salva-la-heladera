import type { Metadata } from "next";
import "./globals.css";
export const metadata:Metadata={title:"Salvá la Heladera",description:"Organizá tus comidas, aprovechá lo que tenés y comprá solo lo necesario.",icons:{icon:"/favicon.svg",shortcut:"/favicon.svg"}};
export default function RootLayout({children}:Readonly<{children:React.ReactNode}>){return <html lang="es"><body>{children}</body></html>}
