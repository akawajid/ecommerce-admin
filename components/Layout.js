import Nav from "@/components/Nav";
import { useSession, signIn, signOut } from "next-auth/react"
import Head from "next/head";

export default function Layout({ children }) {
  const { data: session } = useSession();

  if (!session) {
    return (
      <div className="bg-blue-900 w-screen h-screen flex items-center align-middle">
        <Head><title>NextJS Ecommerce - Admin Panel</title></Head>
        <div className="text-center w-full">
          <button
            onClick={() => signIn("google")}
            className="bg-white p-2 px-4 rounded-lg"
          >
            Login with Google
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-blue-900 w-screen h-screen flex items-center align-middle">
      <div className="w-full min-h-screen flex">
        <Nav />
        <div className="bg-white flex-grow m-2 -ml-1 rounded-lg">
          {children}
        </div>
      </div>
    </div>
  );
}
