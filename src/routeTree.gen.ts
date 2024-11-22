/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

import { createFileRoute } from '@tanstack/react-router'

// Import Routes

import { Route as rootRoute } from './routes/__root'

// Create Virtual Routes

const IndexLazyImport = createFileRoute('/')()
const TrendingIndexLazyImport = createFileRoute('/trending/')()
const SsoCallbackIndexLazyImport = createFileRoute('/sso-callback/')()
const SignUpIndexLazyImport = createFileRoute('/sign-up/')()
const SignInIndexLazyImport = createFileRoute('/sign-in/')()
const MadeForYouIndexLazyImport = createFileRoute('/made-for-you/')()
const ChatIndexLazyImport = createFileRoute('/chat/')()
const AuthCallbackIndexLazyImport = createFileRoute('/auth-callback/')()
const AdminIndexLazyImport = createFileRoute('/admin/')()
const AlbumAlbumIdIndexLazyImport = createFileRoute('/album/$albumId/')()

// Create/Update Routes

const IndexLazyRoute = IndexLazyImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/index.lazy').then((d) => d.Route))

const TrendingIndexLazyRoute = TrendingIndexLazyImport.update({
  id: '/trending/',
  path: '/trending/',
  getParentRoute: () => rootRoute,
} as any).lazy(() =>
  import('./routes/trending/index.lazy').then((d) => d.Route),
)

const SsoCallbackIndexLazyRoute = SsoCallbackIndexLazyImport.update({
  id: '/sso-callback/',
  path: '/sso-callback/',
  getParentRoute: () => rootRoute,
} as any).lazy(() =>
  import('./routes/sso-callback/index.lazy').then((d) => d.Route),
)

const SignUpIndexLazyRoute = SignUpIndexLazyImport.update({
  id: '/sign-up/',
  path: '/sign-up/',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/sign-up/index.lazy').then((d) => d.Route))

const SignInIndexLazyRoute = SignInIndexLazyImport.update({
  id: '/sign-in/',
  path: '/sign-in/',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/sign-in/index.lazy').then((d) => d.Route))

const MadeForYouIndexLazyRoute = MadeForYouIndexLazyImport.update({
  id: '/made-for-you/',
  path: '/made-for-you/',
  getParentRoute: () => rootRoute,
} as any).lazy(() =>
  import('./routes/made-for-you/index.lazy').then((d) => d.Route),
)

const ChatIndexLazyRoute = ChatIndexLazyImport.update({
  id: '/chat/',
  path: '/chat/',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/chat/index.lazy').then((d) => d.Route))

const AuthCallbackIndexLazyRoute = AuthCallbackIndexLazyImport.update({
  id: '/auth-callback/',
  path: '/auth-callback/',
  getParentRoute: () => rootRoute,
} as any).lazy(() =>
  import('./routes/auth-callback/index.lazy').then((d) => d.Route),
)

const AdminIndexLazyRoute = AdminIndexLazyImport.update({
  id: '/admin/',
  path: '/admin/',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/admin/index.lazy').then((d) => d.Route))

const AlbumAlbumIdIndexLazyRoute = AlbumAlbumIdIndexLazyImport.update({
  id: '/album/$albumId/',
  path: '/album/$albumId/',
  getParentRoute: () => rootRoute,
} as any).lazy(() =>
  import('./routes/album/$albumId/index.lazy').then((d) => d.Route),
)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexLazyImport
      parentRoute: typeof rootRoute
    }
    '/admin/': {
      id: '/admin/'
      path: '/admin'
      fullPath: '/admin'
      preLoaderRoute: typeof AdminIndexLazyImport
      parentRoute: typeof rootRoute
    }
    '/auth-callback/': {
      id: '/auth-callback/'
      path: '/auth-callback'
      fullPath: '/auth-callback'
      preLoaderRoute: typeof AuthCallbackIndexLazyImport
      parentRoute: typeof rootRoute
    }
    '/chat/': {
      id: '/chat/'
      path: '/chat'
      fullPath: '/chat'
      preLoaderRoute: typeof ChatIndexLazyImport
      parentRoute: typeof rootRoute
    }
    '/made-for-you/': {
      id: '/made-for-you/'
      path: '/made-for-you'
      fullPath: '/made-for-you'
      preLoaderRoute: typeof MadeForYouIndexLazyImport
      parentRoute: typeof rootRoute
    }
    '/sign-in/': {
      id: '/sign-in/'
      path: '/sign-in'
      fullPath: '/sign-in'
      preLoaderRoute: typeof SignInIndexLazyImport
      parentRoute: typeof rootRoute
    }
    '/sign-up/': {
      id: '/sign-up/'
      path: '/sign-up'
      fullPath: '/sign-up'
      preLoaderRoute: typeof SignUpIndexLazyImport
      parentRoute: typeof rootRoute
    }
    '/sso-callback/': {
      id: '/sso-callback/'
      path: '/sso-callback'
      fullPath: '/sso-callback'
      preLoaderRoute: typeof SsoCallbackIndexLazyImport
      parentRoute: typeof rootRoute
    }
    '/trending/': {
      id: '/trending/'
      path: '/trending'
      fullPath: '/trending'
      preLoaderRoute: typeof TrendingIndexLazyImport
      parentRoute: typeof rootRoute
    }
    '/album/$albumId/': {
      id: '/album/$albumId/'
      path: '/album/$albumId'
      fullPath: '/album/$albumId'
      preLoaderRoute: typeof AlbumAlbumIdIndexLazyImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export interface FileRoutesByFullPath {
  '/': typeof IndexLazyRoute
  '/admin': typeof AdminIndexLazyRoute
  '/auth-callback': typeof AuthCallbackIndexLazyRoute
  '/chat': typeof ChatIndexLazyRoute
  '/made-for-you': typeof MadeForYouIndexLazyRoute
  '/sign-in': typeof SignInIndexLazyRoute
  '/sign-up': typeof SignUpIndexLazyRoute
  '/sso-callback': typeof SsoCallbackIndexLazyRoute
  '/trending': typeof TrendingIndexLazyRoute
  '/album/$albumId': typeof AlbumAlbumIdIndexLazyRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexLazyRoute
  '/admin': typeof AdminIndexLazyRoute
  '/auth-callback': typeof AuthCallbackIndexLazyRoute
  '/chat': typeof ChatIndexLazyRoute
  '/made-for-you': typeof MadeForYouIndexLazyRoute
  '/sign-in': typeof SignInIndexLazyRoute
  '/sign-up': typeof SignUpIndexLazyRoute
  '/sso-callback': typeof SsoCallbackIndexLazyRoute
  '/trending': typeof TrendingIndexLazyRoute
  '/album/$albumId': typeof AlbumAlbumIdIndexLazyRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexLazyRoute
  '/admin/': typeof AdminIndexLazyRoute
  '/auth-callback/': typeof AuthCallbackIndexLazyRoute
  '/chat/': typeof ChatIndexLazyRoute
  '/made-for-you/': typeof MadeForYouIndexLazyRoute
  '/sign-in/': typeof SignInIndexLazyRoute
  '/sign-up/': typeof SignUpIndexLazyRoute
  '/sso-callback/': typeof SsoCallbackIndexLazyRoute
  '/trending/': typeof TrendingIndexLazyRoute
  '/album/$albumId/': typeof AlbumAlbumIdIndexLazyRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | '/'
    | '/admin'
    | '/auth-callback'
    | '/chat'
    | '/made-for-you'
    | '/sign-in'
    | '/sign-up'
    | '/sso-callback'
    | '/trending'
    | '/album/$albumId'
  fileRoutesByTo: FileRoutesByTo
  to:
    | '/'
    | '/admin'
    | '/auth-callback'
    | '/chat'
    | '/made-for-you'
    | '/sign-in'
    | '/sign-up'
    | '/sso-callback'
    | '/trending'
    | '/album/$albumId'
  id:
    | '__root__'
    | '/'
    | '/admin/'
    | '/auth-callback/'
    | '/chat/'
    | '/made-for-you/'
    | '/sign-in/'
    | '/sign-up/'
    | '/sso-callback/'
    | '/trending/'
    | '/album/$albumId/'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexLazyRoute: typeof IndexLazyRoute
  AdminIndexLazyRoute: typeof AdminIndexLazyRoute
  AuthCallbackIndexLazyRoute: typeof AuthCallbackIndexLazyRoute
  ChatIndexLazyRoute: typeof ChatIndexLazyRoute
  MadeForYouIndexLazyRoute: typeof MadeForYouIndexLazyRoute
  SignInIndexLazyRoute: typeof SignInIndexLazyRoute
  SignUpIndexLazyRoute: typeof SignUpIndexLazyRoute
  SsoCallbackIndexLazyRoute: typeof SsoCallbackIndexLazyRoute
  TrendingIndexLazyRoute: typeof TrendingIndexLazyRoute
  AlbumAlbumIdIndexLazyRoute: typeof AlbumAlbumIdIndexLazyRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexLazyRoute: IndexLazyRoute,
  AdminIndexLazyRoute: AdminIndexLazyRoute,
  AuthCallbackIndexLazyRoute: AuthCallbackIndexLazyRoute,
  ChatIndexLazyRoute: ChatIndexLazyRoute,
  MadeForYouIndexLazyRoute: MadeForYouIndexLazyRoute,
  SignInIndexLazyRoute: SignInIndexLazyRoute,
  SignUpIndexLazyRoute: SignUpIndexLazyRoute,
  SsoCallbackIndexLazyRoute: SsoCallbackIndexLazyRoute,
  TrendingIndexLazyRoute: TrendingIndexLazyRoute,
  AlbumAlbumIdIndexLazyRoute: AlbumAlbumIdIndexLazyRoute,
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
        "/admin/",
        "/auth-callback/",
        "/chat/",
        "/made-for-you/",
        "/sign-in/",
        "/sign-up/",
        "/sso-callback/",
        "/trending/",
        "/album/$albumId/"
      ]
    },
    "/": {
      "filePath": "index.lazy.tsx"
    },
    "/admin/": {
      "filePath": "admin/index.lazy.tsx"
    },
    "/auth-callback/": {
      "filePath": "auth-callback/index.lazy.tsx"
    },
    "/chat/": {
      "filePath": "chat/index.lazy.tsx"
    },
    "/made-for-you/": {
      "filePath": "made-for-you/index.lazy.tsx"
    },
    "/sign-in/": {
      "filePath": "sign-in/index.lazy.tsx"
    },
    "/sign-up/": {
      "filePath": "sign-up/index.lazy.tsx"
    },
    "/sso-callback/": {
      "filePath": "sso-callback/index.lazy.tsx"
    },
    "/trending/": {
      "filePath": "trending/index.lazy.tsx"
    },
    "/album/$albumId/": {
      "filePath": "album/$albumId/index.lazy.tsx"
    }
  }
}
ROUTE_MANIFEST_END */
