"use client"

import { usePathname, useRouter } from "next/navigation"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
} from "@/components/ui/breadcrumb"
import { findRouteByPath } from "@/config/routes"

export function DynamicBreadcrumb() {
  const pathname = usePathname()
  const router = useRouter()
  const routes = findRouteByPath(pathname)

  // 如果路径段超过4个，我们需要显示省略号
  const shouldShowEllipsis = routes.length > 4
  let displayRoutes = routes

  if (shouldShowEllipsis) {
    // 保留第一个和最后两个路径段，中间显示省略号
    displayRoutes = [routes[0], ...routes.slice(-2)]
  }

  if (routes.length <= 1) return null

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {displayRoutes.map((route, index) => {
          const isLast = index === displayRoutes.length - 1

          return (
            <>
              {index > 0 && (
                <BreadcrumbSeparator className="hidden md:block" />
              )}
              {shouldShowEllipsis && index === 1 && (
                <>
                  <BreadcrumbItem>
                    <BreadcrumbEllipsis />
                  </BreadcrumbItem>
                  <BreadcrumbSeparator className="hidden md:block" />
                </>
              )}
              <BreadcrumbItem key={route.path}>
                {isLast ? (
                  <BreadcrumbPage>{route.title}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink 
                    href={route.unknown ? "/" : route.path}
                    onClick={(e) => {
                      if (route.unknown) {
                        e.preventDefault()
                        router.push("/")
                      }
                    }}
                  >
                    {route.title}
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
            </>
          )
        })}
      </BreadcrumbList>
    </Breadcrumb>
  )
}
