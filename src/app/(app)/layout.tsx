"use client"

import { useEffect } from "react"
import { AppSidebar } from "./components/admin-sidebar"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { DynamicBreadcrumb } from "./components/dynamic-breadcrumb"
import { useUser } from "@/lib/hooks/use-user"
import { authService } from "@/lib/services/auth.service"
import { handleUnauthorized } from "@/lib/utils/handle-unauthorized"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { setUser } = useUser()

  useEffect(() => {
    async function fetchUserProfile() {
      try {
        const response = await authService.getProfile()
        if (response.ok()) {
          const profile = response.data()
          setUser({
            name: profile.username,
            email: profile.email,
            avatar: `/avatars/${profile.username}.jpg`
          })
        } else {
          handleUnauthorized({ status: 401 })
        }
      } catch (error) {
        console.error('Error fetching user profile:', error)
        handleUnauthorized({ status: 401 })
      }
    }

    fetchUserProfile()
  }, [setUser])

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <DynamicBreadcrumb />
          </div>
        </header>
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
