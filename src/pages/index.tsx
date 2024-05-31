import HandleBar from "@/components/HandleBar";
import UserList from "@/components/UserList";
import { UserProvider } from "@/lib/context";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>User Management</title>
      </Head>
      <UserProvider>
        <h1 className="text-center font-bold text-2xl text-primary mb-5">User Management Application</h1>
        <HandleBar />
        <UserList />
      </UserProvider>

    </>
  )
}
