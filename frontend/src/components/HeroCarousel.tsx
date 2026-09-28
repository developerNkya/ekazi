import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ChevronLeft, ChevronRight, Users, Building2, Sparkles } from "lucide-react";
import clsx from "clsx";

interface Slide {
  id: number;
  badge: string;
  badgeIcon: typeof Users;
  title: string;
  subtitle: string;
  cta: { label: string; to: string };
  image: string;
}

const SLIDES: Slide[] = [
  {
    id: 1,
    badge: "FOR CANDIDATES",
    badgeIcon: Users,
    title: "Find work that matters",
    subtitle:
      "Discover open roles from top employers across Tanzania. Apply in minutes — no account required.",
    cta: { label: "Browse open jobs", to: "/" },
    image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=2400&q=80",
  },
  {
    id: 2,
    badge: "FOR EMPLOYERS",
    badgeIcon: Building2,
    title: "Hire top talent, faster",
    subtitle:
      "Post jobs in seconds, manage applications from a clean dashboard, and move candidates through your pipeline.",
    cta: { label: "Start hiring", to: "/register" },
    image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=2400&q=80",
  },
  {
    id: 3,
    badge: "ONE PLATFORM",
    badgeIcon: Sparkles,
    title: "Both sides of hiring",
    subtitle:
      "Recruitment made simple. Candidates apply free, employers manage efficiently — all in one place.",
    cta: { label: "See how it works", to: "/about" },
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=2400&q=80",
  },
];

export function HeroCarousel() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setIndex((i) => (i + 1) % SLIDES.length), 6000);
    return () => clearInterval(t);
  }, [paused]);

  const go = (dir: -1 | 1) => {
    setIndex((i) => (i + dir + SLIDES.length) % SLIDES.length);
  };

  return (
    <section
      className="relative overflow-hidden bg-slate-900"
      style={{ height: "clamp(500px, 75vh, 720px)" }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Slides */}
      {SLIDES.map((slide, i) => (
        <div
          key={slide.id}
          className={clsx(
            "absolute inset-0 transition-opacity duration-[900ms] ease-out",
            i === index ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
          )}
        >
          {/* Background image */}
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${slide.image})` }}
          />

          {/* Dark gradient overlay for text legibility */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-900/70 to-slate-900/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />

          {/* Content */}
          <div className="relative h-full flex items-center">
            <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
              <div
                className={clsx(
                  "max-w-2xl transition-all duration-700 ease-out",
                  i === index
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4"
                )}
              >
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-[11px] font-semibold tracking-wide text-white mb-5 ring-1 ring-white/20">
                  <slide.badgeIcon className="w-3 h-3" />
                  {slide.badge}
                </div>

                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[1.05] mb-5">
                  {slide.title}
                </h1>

                <p className="text-base sm:text-lg text-white/85 max-w-xl leading-relaxed mb-8">
                  {slide.subtitle}
                </p>

                <Link
                  to={slide.cta.to}
                  className="inline-flex items-center gap-2 h-12 px-6 rounded-lg bg-white text-slate-900 text-sm font-semibold hover:bg-slate-100 transition-colors group shadow-lg"
                >
                  {slide.cta.label}
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Arrows */}
      <button
        onClick={() => go(-1)}
        aria-label="Previous slide"
        className="absolute left-4 sm:left-6 lg:left-8 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20 text-white flex items-center justify-center transition-colors ring-1 ring-white/20 z-20"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        onClick={() => go(1)}
        aria-label="Next slide"
        className="absolute right-4 sm:right-6 lg:right-8 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20 text-white flex items-center justify-center transition-colors ring-1 ring-white/20 z-20"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2 z-20">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={clsx(
              "h-1.5 rounded-full transition-all duration-300",
              i === index ? "w-10 bg-white" : "w-2 bg-white/40 hover:bg-white/70"
            )}
          />
        ))}
      </div>

      {/* Progress bar (bottom edge, subtle) */}
      <div className="absolute bottom-0 inset-x-0 h-[2px] bg-white/10 z-20">
        <div
          key={index}
          className="h-full bg-white/60 origin-left"
          style={{
            animation: paused ? "none" : "hero-progress 6000ms linear forwards",
          }}
        />
      </div>

      {/* Add the keyframe globally (once) */}
      <style>{`
        @keyframes hero-progress {
          from { transform: scaleX(0); }
          to { transform: scaleX(1); }
        }
      `}</style>
    </section>
  );
}