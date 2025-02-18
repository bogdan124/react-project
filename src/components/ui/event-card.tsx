import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./card"

interface EventCardProps {
  title: string
  description: string
  imageUrl: string
  date: string
}

export function EventCard({ title, description, imageUrl, date }: EventCardProps) {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg w-full">
      <div 
        className="h-48 bg-cover bg-center"
        style={{ backgroundImage: `url(${imageUrl})` }}
      />
      <CardHeader>
        <div className="text-sm text-muted-foreground mb-2">{date}</div>
        <CardTitle className="text-xl">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">Limited spots available</span>
          <span className="text-sm font-medium text-primary">Learn more →</span>
        </div>
      </CardContent>
    </Card>
  )
}