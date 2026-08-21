import { useEffect, useLayoutEffect, useRef, useState, useCallback } from "react";
import { ArrowRight } from "lucide-react";
import { Link, useLocation } from "@tanstack/react-router";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About Us" },
  { to: "/services", label: "Our Services" },
  { to: "/community", label: "Community" },
  { to: "/events", label: "Events" },
  { to: "/reviews", label: "Reviews" },
  { to: "/resources", label: "Blogs" },
  { to: "/contact", label: "Contact Us" },
] as const;

export default function Navbar() {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);

  const closeMenu = useCallback(() => setOpen(false), []);

  // Close on route change
  useEffect(() => {
    closeMenu();
  }, [pathname, closeMenu]);

  const [scrolled, setScrolled] = useState(false);
  const isHomePage = pathname === "/";
  const linksRef = useRef<HTMLDivElement>(null);
  const contourRef = useRef<SVGSVGElement>(null);
  const [indicator, setIndicator] = useState({ left: 0, width: 0 });
  const [contourPath, setContourPath] = useState("M0 1H250C278 1 298 17 318 42C331 57 340 66 366 66");

  const moveIndicator = (element: HTMLElement) => {
    const links = linksRef.current;
    if (!links) return;
    const linksRect = links.getBoundingClientRect();
    const elementRect = element.getBoundingClientRect();
    setIndicator({ left: elementRect.left - linksRect.left, width: elementRect.width });
  };

  const restoreActiveIndicator = () => {
    const activeLink = linksRef.current?.querySelector<HTMLElement>(".bec-nav-link.active");
    if (activeLink) moveIndicator(activeLink);
  };

  useLayoutEffect(() => {
    const links = linksRef.current;
    const activeLink = links?.querySelector<HTMLElement>(".bec-nav-link.active");
    const contour = contourRef.current;
    const join = document.querySelector<HTMLElement>(".bec-join");
    if (!links || !activeLink || !contour || !join) return;

    const updateIndicator = () => {
      const linksRect = links.getBoundingClientRect();
      const activeRect = activeLink.getBoundingClientRect();
      setIndicator({ left: activeRect.left - linksRect.left, width: activeRect.width });

      const contourRect = contour.getBoundingClientRect();
      const joinRect = join.getBoundingClientRect();
      const trackEnd = joinRect.left - 12;
      const endX = Math.max(366, ((trackEnd - contourRect.left) / contourRect.width) * 1220);
      setContourPath(`M0 1H250C278 1 298 17 318 42C331 57 340 66 366 66H${endX.toFixed(2)}`);
    };

    updateIndicator();
    window.addEventListener("resize", updateIndicator);
    return () => window.removeEventListener("resize", updateIndicator);
  }, [pathname]);

  // Body scroll lock for mobile menu
  useEffect(() => {
    if (open) {
      document.body.classList.add("menu-open");
    } else {
      document.body.classList.remove("menu-open");
    }
    return () => document.body.classList.remove("menu-open");
  }, [open]);

  // Handle scroll behavior (show/hide and background states)
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Background state
      setScrolled(currentScrollY > 60);

    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Adjust body padding so content doesn't hide behind fixed navbar
  useEffect(() => {
    if (isHomePage) {
      document.body.style.paddingTop = "0px"; // Homepage hero goes under
    } else {
      document.body.style.paddingTop = "72px"; // Inner pages get padding
    }
    return () => {
      document.body.style.paddingTop = "0px";
    };
  }, [isHomePage]);

  // Close on escape key
  useEffect(() => {
    if (!open) return;
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMenu();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [open, closeMenu]);

  return (
    <>
      <header
        className={`bec-header-container ${scrolled || !isHomePage ? "is-scrolled" : ""}`}
      >
        <nav className="bec-nav" aria-label="Primary navigation">
          <svg
            ref={contourRef}
            className="bec-nav-contour"
            viewBox="0 0 1220 67"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path
              d={contourPath}
              fill="none"
              stroke="#427263"
              strokeWidth="1"
            />
          </svg>
          <Link
            to="/"
            className="bec-brand group"
            aria-label="Bangladesh Executive Chamber home"
            data-testid="link-brand-home"
          >
            <img src="/logo.png" alt="Bangladesh Executive Chamber Logo" className="h-20 w-auto object-contain" />
          </Link>
          <div ref={linksRef} className="bec-links" onMouseLeave={restoreActiveIndicator}>
            <span
              className="bec-nav-indicator"
              aria-hidden="true"
              style={{ transform: `translateX(${indicator.left}px)`, width: indicator.width }}
            />
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`bec-nav-link ${pathname === link.to ? "active" : ""}`}
                data-testid={`link-${link.label.toLowerCase().replaceAll(" ", "-")}`}
                onMouseEnter={(event) => moveIndicator(event.currentTarget)}
              >
                {link.label}
              </Link>
            ))}
          </div>
          <Link
            to="/join"
            className="bec-join"
            data-magnetic
            data-testid="link-join-bec"
          >
            Join BEC <ArrowRight aria-hidden="true" />
          </Link>

          {/* Pure CSS Hamburger Button */}
          <button
            type="button"
            className={`bec-hamburger ${open ? "open" : ""}`}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span className="bec-hamburger-line" />
            <span className="bec-hamburger-line" />
            <span className="bec-hamburger-line" />
          </button>
        </nav>
      </header>

      {/* Mobile Backdrop */}
      <div
        className={`bec-mobile-overlay ${open ? "visible" : ""}`}
        onClick={closeMenu}
        aria-hidden="true"
      />

      {/* Mobile Navigation Panel */}
      <nav
        className={`bec-mobile-nav ${open ? "open" : ""}`}
        aria-label="Mobile navigation"
        aria-hidden={!open}
      >
        {navLinks.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            className={`bec-mobile-nav-link ${pathname === link.to ? "active" : ""}`}
            onClick={closeMenu}
            tabIndex={open ? 0 : -1}
          >
            {link.label}
          </Link>
        ))}
        <Link
          to="/join"
          className="bec-mobile-join-btn"
          onClick={closeMenu}
          tabIndex={open ? 0 : -1}
        >
          Join BEC
        </Link>
      </nav>
    </>
  );
}
