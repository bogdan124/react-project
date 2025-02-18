export function StatsSection() {
  const stats = [
    { number: "500+", label: "Members" },
    { number: "50+", label: "Events" },
    { number: "15+", label: "Years" },
    { number: "1000+", label: "Students Impacted" },
  ]

  return (
    <section className="py-16 bg-primary text-primary-foreground">
      <div className="container">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat) => (
            <div key={stat.label}>
              <div className="text-4xl font-bold mb-2">{stat.number}</div>
              <div className="text-lg">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}