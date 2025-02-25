

import { Route as rootRoute } from './routes/__root'
import { Route as LoginImport } from './routes/login'
import { Route as ForgotPasswordImport } from './routes/forgot-password'
import { Route as DashboardImport } from './routes/dashboard'
import { Route as IndexImport } from './routes/index'
import { Route as DashboardIndexImport } from './routes/dashboard/index'
import { Route as DashboardUsersImport } from './routes/dashboard/users'
import { Route as DashboardProfileImport } from './routes/dashboard/profile'
import { Route as DashboardLocationsImport } from './routes/dashboard/locations'

// Create/Update Routes

const LoginRoute = LoginImport.update({
  id: '/login',
  path: '/login',
  getParentRoute: () => rootRoute,
} as any)

const ForgotPasswordRoute = ForgotPasswordImport.update({
  id: '/forgot-password',
  path: '/forgot-password',
  getParentRoute: () => rootRoute,
} as any)

const DashboardRoute = DashboardImport.update({
  id: '/dashboard',
  path: '/dashboard',
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const DashboardIndexRoute = DashboardIndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => DashboardRoute,
} as any)

const DashboardUsersRoute = DashboardUsersImport.update({
  id: '/users',
  path: '/users',
  getParentRoute: () => DashboardRoute,
} as any)

const DashboardProfileRoute = DashboardProfileImport.update({
  id: '/profile',
  path: '/profile',
  getParentRoute: () => DashboardRoute,
} as any)

const DashboardLocationsRoute = DashboardLocationsImport.update({
  id: '/locations',
  path: '/locations',
  getParentRoute: () => DashboardRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/dashboard': {
      id: '/dashboard'
      path: '/dashboard'
      fullPath: '/dashboard'
      preLoaderRoute: typeof DashboardImport
      parentRoute: typeof rootRoute
    }
    '/forgot-password': {
      id: '/forgot-password'
      path: '/forgot-password'
      fullPath: '/forgot-password'
      preLoaderRoute: typeof ForgotPasswordImport
      parentRoute: typeof rootRoute
    }
    '/login': {
      id: '/login'
      path: '/login'
      fullPath: '/login'
      preLoaderRoute: typeof LoginImport
      parentRoute: typeof rootRoute
    }
    '/dashboard/locations': {
      id: '/dashboard/locations'
      path: '/locations'
      fullPath: '/dashboard/locations'
      preLoaderRoute: typeof DashboardLocationsImport
      parentRoute: typeof DashboardImport
    }
    '/dashboard/profile': {
      id: '/dashboard/profile'
      path: '/profile'
      fullPath: '/dashboard/profile'
      preLoaderRoute: typeof DashboardProfileImport
      parentRoute: typeof DashboardImport
    }
    '/dashboard/users': {
      id: '/dashboard/users'
      path: '/users'
      fullPath: '/dashboard/users'
      preLoaderRoute: typeof DashboardUsersImport
      parentRoute: typeof DashboardImport
    }
    '/dashboard/': {
      id: '/dashboard/'
      path: '/'
      fullPath: '/dashboard/'
      preLoaderRoute: typeof DashboardIndexImport
      parentRoute: typeof DashboardImport
    }
  }
}

// Create and export the route tree

interface DashboardRouteChildren {
  DashboardLocationsRoute: typeof DashboardLocationsRoute
  DashboardProfileRoute: typeof DashboardProfileRoute
  DashboardUsersRoute: typeof DashboardUsersRoute
  DashboardIndexRoute: typeof DashboardIndexRoute
}

const DashboardRouteChildren: DashboardRouteChildren = {
  DashboardLocationsRoute: DashboardLocationsRoute,
  DashboardProfileRoute: DashboardProfileRoute,
  DashboardUsersRoute: DashboardUsersRoute,
  DashboardIndexRoute: DashboardIndexRoute,
}

const DashboardRouteWithChildren = DashboardRoute._addFileChildren(
  DashboardRouteChildren,
)

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '/dashboard': typeof DashboardRouteWithChildren
  '/forgot-password': typeof ForgotPasswordRoute
  '/login': typeof LoginRoute
  '/dashboard/locations': typeof DashboardLocationsRoute
  '/dashboard/profile': typeof DashboardProfileRoute
  '/dashboard/users': typeof DashboardUsersRoute
  '/dashboard/': typeof DashboardIndexRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '/forgot-password': typeof ForgotPasswordRoute
  '/login': typeof LoginRoute
  '/dashboard/locations': typeof DashboardLocationsRoute
  '/dashboard/profile': typeof DashboardProfileRoute
  '/dashboard/users': typeof DashboardUsersRoute
  '/dashboard': typeof DashboardIndexRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexRoute
  '/dashboard': typeof DashboardRouteWithChildren
  '/forgot-password': typeof ForgotPasswordRoute
  '/login': typeof LoginRoute
  '/dashboard/locations': typeof DashboardLocationsRoute
  '/dashboard/profile': typeof DashboardProfileRoute
  '/dashboard/users': typeof DashboardUsersRoute
  '/dashboard/': typeof DashboardIndexRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | '/'
    | '/dashboard'
    | '/forgot-password'
    | '/login'
    | '/dashboard/locations'
    | '/dashboard/profile'
    | '/dashboard/users'
    | '/dashboard/'
  fileRoutesByTo: FileRoutesByTo
  to:
    | '/'
    | '/forgot-password'
    | '/login'
    | '/dashboard/locations'
    | '/dashboard/profile'
    | '/dashboard/users'
    | '/dashboard'
  id:
    | '__root__'
    | '/'
    | '/dashboard'
    | '/forgot-password'
    | '/login'
    | '/dashboard/locations'
    | '/dashboard/profile'
    | '/dashboard/users'
    | '/dashboard/'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  DashboardRoute: typeof DashboardRouteWithChildren
  ForgotPasswordRoute: typeof ForgotPasswordRoute
  LoginRoute: typeof LoginRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  DashboardRoute: DashboardRouteWithChildren,
  ForgotPasswordRoute: ForgotPasswordRoute,
  LoginRoute: LoginRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/dashboard",
        "/forgot-password",
        "/login"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/dashboard": {
      "filePath": "dashboard.tsx",
      "children": [
        "/dashboard/locations",
        "/dashboard/profile",
        "/dashboard/users",
        "/dashboard/"
      ]
    },
    "/forgot-password": {
      "filePath": "forgot-password.tsx"
    },
    "/login": {
      "filePath": "login.tsx"
    },
    "/dashboard/locations": {
      "filePath": "dashboard/locations.tsx",
      "parent": "/dashboard"
    },
    "/dashboard/profile": {
      "filePath": "dashboard/profile.tsx",
      "parent": "/dashboard"
    },
    "/dashboard/users": {
      "filePath": "dashboard/users.tsx",
      "parent": "/dashboard"
    },
    "/dashboard/": {
      "filePath": "dashboard/index.tsx",
      "parent": "/dashboard"
    }
  }
}
ROUTE_MANIFEST_END */
