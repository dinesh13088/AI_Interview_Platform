import React from 'react'
import { Outlet } from "react-router";
import { SidebarProvider, SidebarTrigger } from "@/Components/ui/sidebar"
import { RecruiterSidebar } from '../components/RecruiterSidebar';
function RecruiterHome() {
  return (
    <div>
      <SidebarProvider>
        <RecruiterSidebar />
        <main>
          <SidebarTrigger />
          <Outlet />    
          </main>
      </SidebarProvider>
    </div>
  )
}
export default RecruiterHome
