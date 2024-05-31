import HandleBar from "@/components/HandleBar";
import UserList from "@/components/UserList";

export default function Home() {
  return (
    <>
      <h1 className="text-center font-bold text-2xl text-primary">User Management Application</h1>
      <HandleBar />
      <UserList />
    </>
  )
}
