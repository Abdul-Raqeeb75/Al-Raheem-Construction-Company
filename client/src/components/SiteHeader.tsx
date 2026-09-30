/**
 * REFERENCE DESIGN: Warm editorial property header — cream surface, restrained logo,
 * compact navigation and sand-gold contact action.
 */
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { brand, navigation } from "@/data/siteContent";

// Yeh naya function har letter ko tod kar wave (jhatka) effect banata hai
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

export function SiteHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMenu = () => setIsOpen(false);

  return (
    <header className={`editorial-header ${isScrolled ? "editorial-header--scrolled" : ""}`}>
      <div className="editorial-header__inner">
        <a href="#home" className="editorial-brand" onClick={closeMenu} aria-label="Al-Raheem Construction home">
          <img src={brand.logo} alt="Al-Raheem Construction" />
        </a>

        {/* Desktop Navigation */}
        <nav className="editorial-nav" aria-label="Primary navigation">
          {navigation.map((item) => (
            <a key={item.href} href={item.href} className="hover-wave-link">
              <RopeWaveText text={item.label} />
            </a>
          ))}
        </nav>

        <a href="#contact" className="editorial-nav__contact">Contact us</a>

        <button type="button" className={`editorial-menu-toggle${isOpen ? " is-open" : ""}`} onClick={() => setIsOpen((open) => !open)} aria-expanded={isOpen} aria-label={isOpen ? "Close navigation" : "Open navigation"}>
          {isOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>

        {/* Mobile Navigation */}
        <nav className={`editorial-mobile-nav${isOpen ? " is-open" : ""}`} aria-label="Mobile navigation" aria-hidden={!isOpen}>
          <div className="editorial-mobile-nav__lead"><span>Al-Raheem Construction</span><small>Navigate your next build</small></div>
          <div className="editorial-mobile-nav__links">
            {navigation.map((item) => (
              <a key={item.href} href={item.href} onClick={closeMenu} className="hover-wave-link">
                <RopeWaveText text={item.label} />
              </a>
            ))}
            
            <a href="#contact" onClick={closeMenu} className="hover-wave-link">
              <RopeWaveText text="Contact us" />
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}