"use client"

import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/Components/ui/sidebar"
import {
  Home, User, FileText, BriefcaseBusiness, Pin, Bot,
  MailOpen, Target, ChartColumn, Bell, Settings, LogOut, Sparkles,
} from "lucide-react"
import { useNavigate } from "react-router";
import { logout } from "@/store/AuthSlice"





const NAV_GROUPS = [
  {
    label: "Overview",
    items: [{ icon: Home, label: "Dashboard",route:"dashboard"}],
  },
  {
    label: "Career",
    items: [
      { icon: User, label: "My Profile" ,route:'profile' },
      { icon: FileText, label: "My Resume",route:'resume' },
      { icon: BriefcaseBusiness, label: "Jobs" ,route:'jobs'},
      { icon: Pin, label: "Saved Jobs",route:'savedjobs' },
      { icon: MailOpen, label: "Applications" ,route:'applications' },
    ],
  },
  {
    label: "Interview prep",
    items: [
      { icon: Target, label: "Interview" ,route:'interview'},
      { icon: Bot, label: "AI Practice",route:'aipractice' },
      { icon: ChartColumn, label: "My Performance",route:'performance' },
    ],
  },
  {
    label: "General",
    items: [
      { icon: Bell, label: "Notifications" ,route:'notifications'},
      { icon: Settings, label: "Settings" ,route:'settings'},
    ],
  },
]

export function AppSidebar() {
  const [active, setActive] = useState("Dashboard")
  const navigate=useNavigate()


const email=useSelector(state=>state.auth.user.email)

const picture_url=useSelector((state)=>"http://localhost:8000"+state.auth.candidate.picture_url)

const first_name=useSelector(state=>state.auth.candidate.first_name)

const last_name=useSelector(state=>state.auth.candidate.last_name)
const fullname=first_name+" "+last_name
console.log(picture_url)

const dispatch=useDispatch()

  return (
    <Sidebar className="border-r border-border/60">
      <SidebarHeader className="px-4 py-5">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 text-white shadow-sm">
            <Sparkles className="h-4.5 w-4.5" />
          </div>
          <div className="leading-tight">
            <h1 className="text-sm font-semibold tracking-tight">AI Interview</h1>
            <p className="text-xs text-muted-foreground">Platform</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="px-2">
        {NAV_GROUPS.map((group) => (
          <SidebarGroup key={group.label}>
            <SidebarGroupLabel className="px-2 text-[11px] font-medium uppercase tracking-wider text-muted-foreground/70">
              {group.label}
            </SidebarGroupLabel>
            <SidebarMenu>
              {group.items.map(({ icon: Icon, label,route }) => {
                const isActive = active === label
                console.log(isActive)
                return (
                  <SidebarMenuItem key={label}>
                    <SidebarMenuButton
                      onClick={() => {
                        setActive(label)
                        navigate(route)
                        
                        
                      }}
                      className={`relative gap-3 rounded-lg transition-colors ${
                        isActive
                          ? "bg-violet-500/10 text-violet-600 font-medium dark:text-violet-400"
                          : "text-muted-foreground hover:bg-muted hover:text-foreground"
                      }`}
                    >
                      {isActive && (
                        <span className="absolute left-0 top-1/2 h-4 w-0.5 -translate-y-1/2 rounded-full bg-violet-600" />
                      )}
                      <Icon className="h-4 w-4" />
                      {label}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarFooter className="border-t border-border/60 p-3">
        <SidebarMenu>
          <SidebarMenuItem>
            <div className="flex items-center gap-2.5 rounded-lg px-2 py-1.5">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-violet-500/10 text-xs font-semibold text-violet-600 dark:text-violet-400 overflow-hidden">
                <img src={picture_url} alt="" className="h-full w-full object-cover object-center" />
              </div>
              <div className="min-w-0 leading-tight">
                <p className="truncate text-sm font-medium">{fullname} </p>
                <p className="truncate text-xs text-muted-foreground">{email}</p>
              </div>
            </div>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton onClick={()=>{
              dispatch(logout())
            }} className="gap-3 rounded-lg text-muted-foreground hover:bg-red-500/10 hover:text-red-500" >
              <LogOut className="h-4 w-4" />
              Logout
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}