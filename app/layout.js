'use client'
import { Inter, Poppins,DM_Serif_Display,Dancing_Script,Noto_Sans,Roboto } from 'next/font/google'
import { ContextProvider } from "./context/context";
import EditDrawer from './components/UI/EditDrawer/EditDrawer';
import './globals.css'
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ['latin'], variable: '--inter' })
const popins = Poppins({ subsets: ['latin'], weight: ['400', '500', '600', '700'], variable: '--poppins' })
const roboto = Roboto({ subsets: ['latin'], weight: ['400', '500', '700'], variable: '--roboto' })
const DSD = DM_Serif_Display({ subsets: ['latin'], weight: ['400'], variable: '--dsd' })
const DS = Dancing_Script({ subsets: ['latin'], weight: ['400'], variable: '--ds' })
const noto = Noto_Sans({ subsets: ['latin'], weight: ['400'], variable: '--noto' })

export default function RootLayout({ children }) {

    return (

        <html lang="en">


                <body className={`${inter.variable} ${popins.variable}  ${DSD.variable} ${DS.variable} ${noto.variable} ${roboto.variable}`}>
                <ContextProvider>

                            {children}

                    <EditDrawer />

                </ContextProvider>
                <Toaster/>
                </body>

        </html>

    );
}
