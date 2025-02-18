import { cn } from "@/lib/utils"

interface HeroSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  title: React.ReactNode
  subtitle?: string
  imageUrl: string
}

export function HeroSection({ 
  title, 
  subtitle, 
  imageUrl,
  className,
  ...props 
}: HeroSectionProps) {
  return (
    <div 
      className={cn(
        "relative min-h-screen flex items-center justify-center text-white overflow-hidden",
        className
      )}
      {...props}
    >
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-fixed"
        style={{ backgroundImage: `url(${imageUrl})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-950/90 via-emerald-900/80 to-transparent" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-emerald-600/30 via-transparent to-emerald-950/30 mix-blend-overlay" />
      <div className="relative z-10 container">
        <div className="max-w-4xl">
          <h1 className="text-6xl md:text-7xl font-bold mb-8 leading-tight">
            {title}
          </h1>
          {subtitle && (
            <p className="text-xl md:text-2xl text-gray-200 max-w-2xl leading-relaxed">
              {subtitle}
            </p>
          )}
        </div>
      </div>

      {/* Wave shape divider */}
      <div className="wave-shape">
        <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path 
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" 
            className="shape-fill"
          />
        </svg>
      </div>
    </div>
  )
}