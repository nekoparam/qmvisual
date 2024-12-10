export interface RouteItem {
  path: string
  title: string
  children?: RouteItem[]
  unknown?: boolean  // 标记是否为未知路由
}

export const routes: RouteItem[] = [
  {
    path: "/",
    title: "首页",
    children: [
      {
        path: "/dashboard",
        title: "仪表盘",
      },
      {
        path: "/chat",
        title: "聊天",
      },
      {
        path: "/documents",
        title: "文档",
        children: [
          {
            path: "/documents/recent",
            title: "最近文档"
          },
          {
            path: "/documents/shared",
            title: "共享文档"
          }
        ]
      },
      {
        path: "/settings",
        title: "设置",
        children: [
          {
            path: "/settings/profile",
            title: "个人信息"
          },
          {
            path: "/settings/security",
            title: "安全设置"
          }
        ]
      }
    ]
  }
]

export function findRouteByPath(path: string): RouteItem[] {
  const segments = path.split("/").filter(Boolean)
  const result: RouteItem[] = []
  
  let currentRoutes = routes
  let currentPath = ""
  let foundAll = true
  
  // Always add home page
  result.push(routes[0])
  if (routes[0].children) {
    currentRoutes = routes[0].children
  }
  
  for (const segment of segments) {
    currentPath += "/" + segment
    
    // Find matching route in current level
    const matchingRoute = currentRoutes?.find(route => {
      // Remove trailing slash if exists
      const routePath = route.path.endsWith("/") 
        ? route.path.slice(0, -1) 
        : route.path;

      return routePath === currentPath
    })
    
    if (matchingRoute) {
      result.push(matchingRoute)
      currentRoutes = matchingRoute.children
    } else {
      // 如果找不到匹配的路由，添加一个未知路由项
      foundAll = false
      result.push({
        path: currentPath,
        title: "未知页面",
        unknown: true
      })
      break
    }
  }
  
  return result
}
