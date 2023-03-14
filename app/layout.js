import "../styles/globals.css";
import Sidebar from "./sidebar";
import { getServerSession } from "next-auth";
import Login from "../components/Login";
//import { SessionProvider } from "next-auth/react";
import SessionProvider from "../components/SessionProvider";
import { authOptions } from "../pages/api/auth/[...nextauth]";
import ClientProvider from "../components/SessionProvider";

export default async function RootLayout({ children }) {
  const session = await getServerSession(authOptions);
  //console.log("the session is ", session);
  return (
    <html>
      <head />
      <body>
        <SessionProvider session={session}>
          {!session ? (
            <Login />
          ) : (
            <div className="flex">
              {/* sidebar */}
              <div className="bg-[#202123] overflow-y-auto md:min-w-[20rem] max-w-xs group">
                <Sidebar session={session} />
              </div>
              {/* ClientProvider */}
              <ClientProvider />
              {/* content */}
              <div className="bg-[#343541] w-full overflow-y-auto md:min-w-[20rem]">
                {children}
              </div>
            </div>
          )}
        </SessionProvider>
      </body>
    </html>
  );
}
