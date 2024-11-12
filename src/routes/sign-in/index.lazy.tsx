import { SignIn } from '@clerk/clerk-react'
import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/sign-in/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <main className="min-h-screen w-screen flex justify-center items-center">
      <SignIn path="/sign-in" />
    </main>
  )
}
