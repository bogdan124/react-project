import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./card"
import { Button } from "./button"

interface ProjectCardProps {
  title: string
  description: string
  imageUrl: string
  link: string
}

export function ProjectCard({ title, description, imageUrl, link }: ProjectCardProps) {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg">
      <div 
        className="h-48 bg-cover bg-center"
        style={{ backgroundImage: `url(${imageUrl})` }}
      />
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <Button className="w-full" asChild>
          <a href={link}>Learn More</a>
        </Button>
      </CardContent>
    </Card>
  )
}