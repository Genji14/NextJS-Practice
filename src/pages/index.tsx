import HandleBar from "@/components/HandleBar";
import { UserProvider } from "@/lib/context";
import { User } from "@/types/interface";
import axios from "axios";
import dynamic from "next/dynamic";
import Head from "next/head";
import { columns } from "./columns";
import UserList from "@/components/UserList";

const DataTable = dynamic(() => import("./DataTable"), {
  loading: () => <p className="text-center">Loading...</p>,
  ssr: false,
});


export default function Home({ data }: { data: User[] }) {
  return (
    <>
      <Head>
        <title>User Management</title>
      </Head>
      <UserProvider>
        <h1 className="text-center font-bold text-2xl text-primary mb-5">User Management Dashboard</h1>
        <HandleBar />
        <UserList data={data} />
      </UserProvider>
    </>
  )
}

export async function getServerSideProps() {
  try {
    const res = await axios.get(process.env.NEXT_PUBLIC_SERVER_URL! + "/users/search");
    const data = res.data.data;
    return { props: { data } }
  } catch (ex) {
    console.log(ex);
  }
}


