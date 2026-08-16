"use client"

import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/Components/ui/sidebar"
import {
  LayoutDashboard, 
  Building2, 
  Briefcase, 
  Users, 
  MailOpen, 
  Target, 
  Bot, 
  BarChart3, 
  Bell, 
  Settings, 
  LogOut, 
  Sparkles,
} from "lucide-react"
import { useNavigate } from "react-router"
import { logout } from "@/store/RecruiterAuthSlice" // Make sure this path is correct

const NAV_GROUPS = [
  {
    label: "Main",
    items: [
      { icon: LayoutDashboard, label: "Dashboard", route: "rdashboard" },
    ],
  },
  {
    label: "Management",
    items: [
      { icon: Building2, label: "Company", route: "company" },
      { icon: Briefcase, label: "Jobs", route: "jobs" },
      { icon: Users, label: "Candidates", route: "candidates" },
      { icon: MailOpen, label: "Applications", route: "applications" },
    ],
  },
  {
    label: "Interview",
    items: [
      { icon: Target, label: "Interviews", route: "interviews" },
      { icon: Bot, label: "AI Interview Review", route: "ai-review" },
    ],
  },
  {
    label: "Analytics",
    items: [
      { icon: BarChart3, label: "Analytics", route: "analytics" },
    ],
  },
  {
    label: "General",
    items: [
      { icon: Bell, label: "Notifications", route: "notifications" },
      { icon: Settings, label: "Settings", route: "settings" },
    ],
  },
]

export function RecruiterSidebar() {
  const [active, setActive] = useState("Dashboard")
  const navigate = useNavigate()
  const dispatch = useDispatch()

  // Get recruiter data from Redux store
  const email = useSelector(state => state.rAuth?.user?.email)
  const companyName = useSelector(state => state.rAuth?.company?.name)
  
  // For profile picture (if you have one)
  const picture_url = useSelector(state => 
    state.rAuth?.company?.logo 
      ? "http://localhost:8000" + state.rAuth.company.logo 
      : null
  )
  
  const firstName = useSelector(state => state.rAuth?.recruiter?.first_name || "")
  const lastName = useSelector(state => state.rAuth?.recruiter?.last_name || "")
  const fullName = `${firstName} ${lastName}`.trim() || "Recruiter"

  const handleLogout = () => {
    dispatch(logout())
    navigate("/recruiter-login")
  }

  return (
    <Sidebar className="border-r border-border/60">
      <SidebarHeader className="px-4 py-5">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-teal-600 to-emerald-600 text-white shadow-sm">
            <Sparkles className="h-4.5 w-4.5" />
          </div>
          <div className="leading-tight">
            <h1 className="text-sm font-semibold tracking-tight">Recruiter</h1>
            <p className="text-xs text-muted-foreground">Dashboard</p>
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
              {group.items.map(({ icon: Icon, label, route }) => {
                const isActive = active === label
                return (
                  <SidebarMenuItem key={label}>
                    <SidebarMenuButton
                      onClick={() => {
                        setActive(label)
                        navigate(route)
                      }}
                      className={`relative gap-3 rounded-lg transition-colors ${
                        isActive
                          ? "bg-teal-500/10 text-teal-600 font-medium dark:text-teal-400"
                          : "text-muted-foreground hover:bg-muted hover:text-foreground"
                      }`}
                    >
                      {isActive && (
                        <span className="absolute left-0 top-1/2 h-4 w-0.5 -translate-y-1/2 rounded-full bg-teal-600" />
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
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-teal-500/10 text-xs font-semibold text-teal-600 dark:text-teal-400 overflow-hidden">
                {picture_url ? (
                  <img src={picture_url} alt="" className="h-full w-full object-cover object-center" />
                ) : (
                  <span>{fullName.charAt(0).toUpperCase()}</span>
                )}
              </div>
              <div className="min-w-0 leading-tight">
                <p className="truncate text-sm font-medium">{fullName}</p>
                <p className="truncate text-xs text-muted-foreground">
                  {companyName || email || "Recruiter"}
                </p>
              </div>
            </div>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton 
              onClick={handleLogout} 
              className="gap-3 rounded-lg text-muted-foreground hover:bg-red-500/10 hover:text-red-500"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}