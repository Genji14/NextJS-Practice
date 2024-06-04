import HandleBar from "@/components/HandleBar";
import { UserProvider } from "@/lib/context";
import dynamic from "next/dynamic";
import Head from "next/head";

const UserList = dynamic(() => import("@/components/UserList"), {
  loading: () => <p className="text-center">Loading...</p>,
  ssr: false,
});


export default function Home() {
  return (
    <>
      <Head>
        <title>User Management</title>
      </Head>
      <UserProvider>
        <h1 className="text-center font-bold text-2xl text-primary mb-5">User Management Dashboard</h1>
        <HandleBar />
        <UserList />
      </UserProvider>

    </>
  )
}
