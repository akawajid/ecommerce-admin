import Layout from "@/components/Layout";
import { useSession, signIn, signOut } from "next-auth/react"
import Link from "next/link";

export default function Products() {
  return (
    <Layout>
        <Link href={'/products/new'} className="bg-blue-900 m-4 mx-6 inline-block rounded-md text-white p-2">Add New Product</Link>
  </Layout>
  );
}
