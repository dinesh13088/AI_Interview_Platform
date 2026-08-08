import { SidebarProvider, SidebarTrigger } from "@/Components/ui/sidebar"
import { AppSidebar } from "@/Components/AppSidebar"
import { Outlet } from "react-router";

export default function Home() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main>
        <SidebarTrigger />
        <Outlet/>
      </main>
    </SidebarProvider>
  )
}