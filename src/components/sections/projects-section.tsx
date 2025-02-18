import { ProjectCard } from "../ui/project-card"

export function ProjectsSection() {
  const projects = [
    {
      title: "LSHacks",
      description: "The biggest student hackathon in Romania",
      imageUrl: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80",
      link: "#",
    },
    {
      title: "Dev Talks",
      description: "Tech conferences and workshops for students",
      imageUrl: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80",
      link: "#",
    },
    {
      title: "IT Marathon",
      description: "Programming competition for students",
      imageUrl: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80",
      link: "#",
    },
  ]

  return (
    <section className="py-16 bg-gray-50">
      <div className="container">
        <h2 className="text-4xl font-bold text-center mb-12">Our Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <ProjectCard key={project.title} {...project} />
          ))}
        </div>
      </div>
    </section>
  )
}