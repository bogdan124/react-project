import { createFileRoute } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'

export const Route = createFileRoute('/')({
  component: HomePage,
})

function HomePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col items-center space-y-6">
        <h1 className="text-4xl font-bold text-foreground">
          Welcome to React + TanStack + shadcn/ui
        </h1>
        <p className="text-lg text-muted-foreground text-center max-w-2xl">
          This is a starter template with React, TanStack Router, TanStack Query, and shadcn/ui components.
          Built with modern tools for a great developer experience.
        </p>
        <div className="flex gap-4">
          <Button>Get Started</Button>
          <Button variant="outline">Documentation</Button>
        </div>
      </div>
    </div>
  )
}