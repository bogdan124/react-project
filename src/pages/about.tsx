import { createFileRoute } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'

export const Route = createFileRoute('/about')({
  component: AboutPage,
})

function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col items-center space-y-6">
        <h1 className="text-4xl font-bold text-foreground">About</h1>
        <p className="text-lg text-muted-foreground text-center max-w-2xl">
          This page demonstrates the use of shadcn/ui components in a real application.
          The components are built on top of Radix UI primitives and styled with Tailwind CSS.
        </p>
        <Button variant="secondary">Learn More</Button>
      </div>
    </div>
  )
}