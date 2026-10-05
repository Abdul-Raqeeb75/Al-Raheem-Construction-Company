/**
 * REFERENCE DESIGN: Warm cream editorial construction portfolio with a rounded image hero,
 * overlapping proof card, asymmetrical work gallery and dark/light About composition.
 */
import { ArrowRight, ArrowUp, ArrowUpRight, ChevronRight, Mail, MapPin, Phone, Quote ,Facebook, Instagram, Linkedin } from "lucide-react";
import { useEffect, useState } from "react";
import ProjectDialog from "@/components/ProjectDialog";
import { SiteHeader } from "@/components/SiteHeader";
import { approvedTestimonials, brand, currentProjects, previousProjects, navigation, services, type Project } from "@/data/siteContent";

// File ke top par (imports ke baad) yeh add karein:
function RopeWaveText({ text }: { text: string }) {
  return (
    <>
      <span className="wave-wrapper">
        {text.split("").map((char, i) => (
          <span key={i} className="wave-char" style={{ transitionDelay: `${i * 0.035}s` }}>
            {char === " " ? "\u00A0" : char}
          </span>
        ))}
      </span>
      <span className="wave-wrapper clone" aria-hidden="true">
        {text.split("").map((char, i) => (
          <span key={i} className="wave-char" style={{ transitionDelay: `${i * 0.035}s` }}>
            {char === " " ? "\u00A0" : char}
          </span>
        ))}
      </span>
    </>
  );
}

const heroWords = ["Dream Home.", "Future Space.", "Next Chapter."];

function StartupLoader() {
  return (
    <div className="editorial-loader" role="status" aria-live="polite" aria-label="Loading Al-Raheem Construction website">
      <div className="editorial-loader__bars"><span /><span /><span /></div>
      <p>Al-Raheem Construction</p>
    </div>
  );
}

function PageSkeleton() {
  return (
    <main className="editorial-skeleton" aria-busy="true" aria-label="Loading website content">
      <div className="editorial-skeleton__nav" />
      <div className="editorial-skeleton__hero"><span /><span /><span /><div><i /><i /></div></div>
      <div className="editorial-skeleton__gallery"><span /><span /><span /></div>
    </main>
  );
}

function TestimonialCarousel() {
  const visibleCards = [
    ...approvedTestimonials,
    ...Array.from({ length: Math.max(0, 3 - approvedTestimonials.length) }, () => null),
  ];
  const loopingTestimonials = [...visibleCards, ...visibleCards];

  return (
    <div className="warm-testimonial-marquee" aria-label="Client testimonials. Hover over the carousel to pause it.">
      <div className="warm-testimonial-marquee__track">
        {loopingTestimonials.map((testimonial, index) => testimonial ? (
          <article className="warm-testimonial-card" key={`${testimonial.id}-${index}`}>
            <div className="warm-testimonial-card__identity"><span aria-hidden="true">{testimonial.clientName.split(" ").map((name) => name[0]).join("").slice(0, 2)}</span><strong>{testimonial.clientName}</strong></div>
            {testimonial.quote ? <p>“{testimonial.quote}”</p> : (
              <div className="warm-testimonial-card__record" aria-label={`${testimonial.homesCompleted ?? 0} homes completed and ${testimonial.ratingOutOfFive ?? 0} out of 5 client rating`}>
                <div><strong>{testimonial.homesCompleted ?? "—"}</strong><span>Homes completed</span></div>
                <div><strong>{testimonial.ratingOutOfFive ?? "—"}<small>/5</small></strong><span>Client rating</span></div>
              </div>
            )}
            <footer>{testimonial.clientRole}</footer>
          </article>
        ) : (
          <article className="warm-testimonial-card warm-testimonial-card--pending" key={`pending-${index}`} aria-label="Approved client feedback pending">
            <span className="warm-testimonial-card__avatar" aria-hidden="true" />
            <div className="warm-testimonial-card__lines" aria-hidden="true"><span /><span /><span /><span /></div>
            <footer>Approved feedback pending</footer>
          </article>
        ))}
      </div>
    </div>
  );
}

export default function Home() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [showAllProjects, setShowAllProjects] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isWaHovered, setIsWaHovered] = useState(false); // WhatsApp Hover State
  const [loadingStage, setLoadingStage] = useState<"startup" | "skeleton" | "ready">("startup");
  const [previewServiceNumber, setPreviewServiceNumber] = useState<string | null>(null);
  const [heroWordIndex, setHeroWordIndex] = useState(0);
  const [typedHeroWord, setTypedHeroWord] = useState("");
  const [heroWordPhase, setHeroWordPhase] = useState<"typing" | "holding" | "dissolving">("typing");

  useEffect(() => {
    const onScroll = () => {
      setShowBackToTop(window.scrollY > 360);
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setScrollProgress(scrollPercent);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const skeletonTimer = window.setTimeout(() => setLoadingStage("skeleton"), 560);
    const readyTimer = window.setTimeout(() => setLoadingStage("ready"), 1060);
    return () => {
      window.clearTimeout(skeletonTimer);
      window.clearTimeout(readyTimer);
    };
  }, []);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setTypedHeroWord(heroWords[0]);
      return;
    }

    const currentWord = heroWords[heroWordIndex];
    let wordTimer: number;

    if (heroWordPhase === "typing") {
      if (typedHeroWord.length < currentWord.length) {
        wordTimer = window.setTimeout(() => setTypedHeroWord(currentWord.slice(0, typedHeroWord.length + 1)), 78);
      } else {
        wordTimer = window.setTimeout(() => setHeroWordPhase("holding"), 1250);
      }
    } else if (heroWordPhase === "holding") {
      wordTimer = window.setTimeout(() => setHeroWordPhase("dissolving"), 240);
    } else {
      wordTimer = window.setTimeout(() => {
        setHeroWordIndex((index) => (index + 1) % heroWords.length);
        setTypedHeroWord("");
        setHeroWordPhase("typing");
      }, 460);
    }

    return () => window.clearTimeout(wordTimer);
  }, [heroWordIndex, heroWordPhase, typedHeroWord]);

  const galleryProjects = showAllProjects ? previousProjects : previousProjects.slice(0, 5);

  if (loadingStage === "startup") return <StartupLoader />;
  if (loadingStage === "skeleton") return <PageSkeleton />;

  return (
    <div className="editorial-site">
      <SiteHeader />
      <main>
        <section id="home" className="editorial-hero">
          <img className="editorial-hero__image" src={brand.heroImage} alt="Contemporary residential exterior by Al-Raheem Construction" />
          <div className="editorial-hero__shade" />
          <div className="editorial-hero__content">
            <span>Al-Raheem Construction</span>
            <h1>Find Your <span className="editorial-hero__loop" aria-live="off"><span className={`editorial-hero__loop-word${heroWordPhase === "dissolving" ? " is-dissolving" : ""}`}>{typedHeroWord}</span></span><em>Build Today.</em></h1>
            <p>We plan and deliver thoughtfully crafted residential and commercial spaces around the way you want to live and work.</p>
            <div className="editorial-hero__actions">
              <a href="#projects" className="warm-button warm-button--light">View work <ArrowUpRight aria-hidden="true" /></a>
              <a href="#about" className="warm-button warm-button--ghost">Learn more <ChevronRight aria-hidden="true" /></a>
            </div>
          </div>
          <aside className="editorial-proof-card" aria-label="Construction highlights">
            <p>Who We Are</p>
            <span>Building spaces with purpose, detail and a clear process.</span>
            <div>
              <strong>50+<small>Projects</small></strong>
              {/* <strong>40<small>Homes</small></strong> */}
              <strong>5/5<small>Rating</small></strong>
            </div>
          </aside>
        </section>

        <section id="about" className="editorial-about" aria-labelledby="about-title">
          <div className="editorial-about__copy">
          <span>About us</span>
            <h2 id="about-title">Designed with purpose. Built for life.</h2>
              <p>
                Since 2000, we’ve dedicated 26 years to bringing dream spaces to life. What started as a commitment to quality has grown into a legacy built on absolute trust. With a flawless record of 100% client satisfaction and deep-rooted partnerships with half a dozen long-term clients, we bring decades of proven expertise to your site. We turn a clear brief into a dependable project experience—from early planning to completion.
              </p>
            <a href="#contact" className="warm-button warm-button--gold">
              Start a conversation <ArrowUpRight aria-hidden="true" />
            </a>
          </div>
          {/* <div className="editorial-about__image"><img src={previousProjects[1].image} alt="Completed Al-Raheem Construction residence" /><p>Clear process. Lasting work.</p></div> */}
        <div className="editorial-about__image"><img src={brand.aboutImage} alt="About Al-Raheem Construction" /><p>Clear process. Lasting work.</p></div>
        </section>

        <section id="services" className="editorial-services" aria-labelledby="services-title">
          <div className="editorial-services__intro"><span>What we do</span><h2 id="services-title">Construction services, <em>clearly delivered.</em></h2><p>From early site work to final handover, we provide practical construction support for spaces that need to perform for the long term.</p></div>
          <div className="editorial-services__list">
            {services.map((service) => <button type="button" className="editorial-service-card" key={service.number} onMouseEnter={() => setPreviewServiceNumber(service.number)} onMouseLeave={() => setPreviewServiceNumber(null)} onFocus={() => setPreviewServiceNumber(service.number)} onBlur={() => setPreviewServiceNumber(null)} onPointerDown={() => setPreviewServiceNumber(service.number)} onPointerUp={() => setPreviewServiceNumber(null)} onPointerCancel={() => setPreviewServiceNumber(null)} aria-label={`${service.title}: ${service.detail}`}>{previewServiceNumber === service.number && <span className="editorial-service-card__preview" aria-hidden="true"><img src={service.image} alt="" /></span>}<span>{service.number}</span><div><h3>{service.title}</h3><p>{service.detail}</p></div><ArrowUpRight aria-hidden="true" /></button>)}
          </div>
        </section>

        <section id="projects" className="editorial-projects" aria-labelledby="projects-title">
          <div className="editorial-section-intro">
            <div><span>Selected work</span><h2 id="projects-title">Discover your next <em>build.</em></h2></div>
            <p>Explore a selection of practical, crafted spaces across residential, commercial and public construction.</p>
          </div>
          <div className="editorial-gallery">
            {galleryProjects.map((project, index) => (
              <button key={project.id} type="button" className={`editorial-gallery__tile editorial-gallery__tile--${index + 1}`} onClick={() => setSelectedProject(project)} aria-label={`View ${project.title} details`}>
                <img src={project.image} alt={project.title} />
                <span className="editorial-gallery__saved" aria-hidden="true">↗</span>
                <div><small>{project.category}</small><strong>{project.title}</strong><em>View project <ArrowUpRight aria-hidden="true" /></em></div>
              </button>
            ))}
          </div>
          <div className="editorial-projects__action"><button type="button" onClick={() => setShowAllProjects((open) => !open)}>{showAllProjects ? "Show selected work" : "Explore all projects"} <ChevronRight aria-hidden="true" /></button></div>
        </section>

        <section id="current-projects" className="editorial-current" aria-labelledby="current-title">
          <div className="editorial-section-intro editorial-section-intro--compact"><div><span>In progress</span><h2 id="current-title">Building right now.</h2></div><p>Current work managed with active site coordination and attention to every final detail.</p></div>
          <div className="editorial-current__row">
            {currentProjects.map((project) => <button type="button" key={project.id} className="editorial-current__card" onClick={() => setSelectedProject(project)}><img src={project.image} alt={project.title} /><div><span>{project.status}</span><h3>{project.title}</h3><p><MapPin aria-hidden="true" /> {project.location}</p><i>Details <ArrowUpRight aria-hidden="true" /></i></div></button>)}
          </div>
        </section>

        <section id="testimonials" className="editorial-testimonials" aria-labelledby="testimonials-title">
          <div className="editorial-testimonials__heading"><Quote aria-hidden="true" /><div><span>Client feedback</span><h2 id="testimonials-title">What our clients say.</h2></div></div>
          <TestimonialCarousel />
        </section>

        <section id="contact" className="editorial-contact" aria-labelledby="contact-title">
          <div className="editorial-contact__content"><span>Let’s build</span><h2 id="contact-title">Tell us what you want to <em>create.</em></h2><p>Share your site, scope and delivery goals. We’ll prepare the next conversation around your project.</p><div className="editorial-contact__details"><div className="editorial-contact__plain-phone"><Phone aria-hidden="true" /><span><small>Phone</small>+92 03016684871</span></div><div><Mail aria-hidden="true" /><span><small>Email</small>alrahimconstruction2000@gmail.com</span></div><div><MapPin aria-hidden="true" /><span><small>Address</small>Add your registered business address here</span></div></div></div>
          <aside className="editorial-contact__plan" aria-label="Project planning approach"><b>Al-Raheem Construction</b><span>Project planning</span><strong>Built with care. Managed clearly.</strong><p>Start with the practical details, then we’ll shape a focused next conversation for your build.</p><div className="editorial-contact__steps"><div><i>01</i><span>Share your site and project brief</span></div><div><i>02</i><span>Discuss scope, finish and timing</span></div></div><a href="#projects">See selected work <ArrowUpRight aria-hidden="true" /></a></aside>
        </section>
      </main>

      <footer className="editorial-footer">
        <div className="editorial-footer__brand">
          <img src={brand.logo} alt="Al-Raheem Construction" />
          <p>Construction shaped around clear thinking, quality materials and long-term confidence.We build Dreams that you envision.</p>
        </div>
        <div className="editorial-footer__content">
          
          {/* Footer Explore Links Fixed for Wave Animation */}
          <section className="editorial-footer__column">
            <span>Explore</span>
            {navigation.map((item) => (
              <a key={item.href} href={item.href} className="hover-wave-link">
                <RopeWaveText text={item.label} />
              </a>
            ))}
          </section>

          <section className="editorial-footer__column editorial-footer__contact">
            <span>Contact</span>
            <p className="editorial-footer__phone"><Phone aria-hidden="true" /> +923016684871</p>
            {/* <p className="editorial-footer__address"><Mail aria-hidden="true" /> Add your business email here</p> */}
            {/* <p className="editorial-footer__address"><MapPin aria-hidden="true" /> Add your registered business address here</p> */}
            <a className="editorial-footer__conversation" href="#contact">Start the conversation <ArrowUpRight aria-hidden="true" /></a>
          </section>
          
          {/* Naya Social Media Section */}
          <section className="editorial-footer__column">
            <span>Social Links</span>
            <p className="editorial-footer__pending" style={{ marginBottom: "1.5rem" }}>Let's connect through social media too.</p>
            
            <div className="editorial-social-links">
              {/* Aap yahan "href" mein apne asli links daal sakte hain */}
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-icon-link" aria-label="Facebook">
                <Facebook strokeWidth={1.5} aria-hidden="true" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-icon-link" aria-label="Instagram">
                <Instagram strokeWidth={1.5} aria-hidden="true" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-icon-link" aria-label="LinkedIn">
                <Linkedin strokeWidth={1.5} aria-hidden="true" />
              </a>
            </div>
          </section>

          <div className="editorial-footer__bottom">
            <span>Al-Raheem Construction</span>
            <span>© {new Date().getFullYear()} · Built with purpose</span>
          </div>
        </div>
      </footer>

      {showBackToTop && (
        <button 
          type="button" 
          onClick={() => document.getElementById("home")?.scrollIntoView({ behavior: "smooth" })} 
          aria-label="Top"
          style={{
            position: "fixed",
            bottom: "5.5rem",
            right: "1.5rem",
            width: "50px",
            height: "50px",
            borderRadius: "50%",
            backgroundColor: "#F4F1EB",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "none",
            cursor: "pointer",
            zIndex: 50,
            padding: 0,
            boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
            transition: "transform 0.2s ease, opacity 0.2s ease"
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-3px)"}
          onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0)"}
        >
          <svg width="50" height="50" style={{ position: "absolute", top: 0, left: 0, transform: "rotate(-90deg)" }}>
            <circle cx="25" cy="25" r="23" stroke="#E5DFD3" strokeWidth="2.5" fill="none" />
            <circle 
              cx="25" 
              cy="25" 
              r="23" 
              stroke="#24201C" 
              strokeWidth="2.5" 
              fill="none" 
              strokeDasharray="144.5" 
              strokeDashoffset={144.5 - (144.5 * scrollProgress) / 100}
              style={{ transition: "stroke-dashoffset 0.1s ease-out" }}
              strokeLinecap="round"
            />
          </svg>
          <ArrowUp style={{ color: "#24201C", width: "22px", height: "22px", zIndex: 10 }} aria-hidden="true" />
        </button>
      )}

      {/* WhatsApp Button with Hover Message */}
      <a 
        className="editorial-whatsapp" 
        href="https://wa.me/923016684871" 
        target="_blank" 
        rel="noopener noreferrer"
        aria-label="WhatsApp contact" 
        title="WhatsApp contact"
        style={{ 
          right: "1.5rem", 
          bottom: "1.5rem", 
          display: "flex", 
          alignItems: "center", 
          justifyContent: "center" 
        }} 
        onMouseEnter={() => setIsWaHovered(true)}
        onMouseLeave={() => setIsWaHovered(false)}
      >
        <span style={{
          position: "absolute",
          right: "100%",
          marginRight: "14px",
          backgroundColor: "#24201C",
          color: "#F4F1EB",
          padding: "8px 16px",
          borderRadius: "24px",
          fontSize: "var(--text-sm)",
          fontWeight: "500",
          whiteSpace: "nowrap",
          opacity: isWaHovered ? 1 : 0,
          transform: isWaHovered ? "translateX(0) scale(1)" : "translateX(10px) scale(0.95)",
          transition: "all 0.25s ease-out",
          pointerEvents: "none",
          boxShadow: "0 4px 12px rgba(0,0,0,0.15)"
        }}>
          Let's build your dream ✨
        </span>
        <svg viewBox="0 0 32 32" aria-hidden="true"><path d="M16 3C8.83 3 3 8.83 3 16c0 2.29.6 4.53 1.73 6.5L3 29l6.68-1.69A12.94 12.94 0 0 0 16 29c7.17 0 13-5.83 13-13S23.17 3 16 3Zm0 23.75c-2 0-3.95-.54-5.64-1.56l-.4-.24-3.96 1 1.06-3.85-.26-.4A10.7 10.7 0 0 1 5.25 16C5.25 10.07 10.07 5.25 16 5.25S26.75 10.07 26.75 16 21.93 26.75 16 26.75Zm5.9-8.04c-.32-.16-1.88-.93-2.17-1.03-.29-.1-.5-.16-.71.16-.21.32-.82 1.03-1 1.24-.18.21-.37.24-.69.08-.32-.16-1.35-.5-2.57-1.61-.95-.87-1.59-1.95-1.78-2.27-.18-.32-.02-.49.14-.65.14-.14.32-.37.48-.56.16-.19.21-.32.32-.53.1-.21.05-.4-.03-.56-.08-.16-.71-1.72-.98-2.35-.26-.62-.52-.54-.71-.55h-.61c-.21 0-.55.08-.84.4-.29.32-1.1 1.08-1.1 2.64 0 1.56 1.13 3.07 1.29 3.28.16.21 2.23 3.4 5.4 4.77.75.32 1.34.51 1.8.65.76.24 1.45.2 2 .12.61-.09 1.88-.77 2.15-1.51.27-.74.27-1.37.19-1.51-.08-.13-.29-.21-.61-.37Z" /></svg>
      </a>
      <ProjectDialog project={selectedProject} onClose={() => setSelectedProject(null)} />
    </div>
  );
}