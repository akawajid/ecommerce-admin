import Layout from "@/components/Layout";
import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";

export default function Home() {
  const { data: session } = useSession();

  return (
    <Layout>
      <div className="flex text-blue-900 justify-between p-4">
        <h2>Hello, <b>{session?.user?.name}</b></h2>
        <div className="flex gap-2pr-2 rounded-lg text-black bg-gray-300 overflow-hidden">
          <Image
            src={session?.user?.image}
            alt="Profile picture"
            width={24}
            height={24}
            className="w-6 h-6"
          />
          <span className="px-2">{session?.user?.name}</span>
        </div>
      </div>
    </Layout>
  );
}
