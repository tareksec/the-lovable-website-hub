import { useEffect, useState, useCallback } from "react";
import { ArrowRight } from "lucide-react";
import { Link, useLocation } from "@tanstack/react-router";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About Us" },
  { to: "/services", label: "Our Services" },
  { to: "/community", label: "Community" },
  { to: "/events", label: "Events" },
  { to: "/reviews", label: "Reviews" },
  { to: "/resources", label: "Resources" },
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
  const [hidden, setHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const isHomePage = pathname === "/";

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

      // Hide/Show logic
      if (currentScrollY < 100) {
        setHidden(false);
      } else if (currentScrollY > lastScrollY && currentScrollY > 200) {
        setHidden(true); // scrolling down
      } else if (currentScrollY < lastScrollY) {
        setHidden(false); // scrolling up
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

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
        className={`bec-header-container ${hidden ? "is-hidden" : ""} ${scrolled || !isHomePage ? "is-scrolled" : ""}`}
      >
        <nav className="bec-nav" aria-label="Primary navigation">
          <svg
            className="bec-nav-contour"
            viewBox="0 0 1220 67"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path
              d="M0 1H388C419 1 441 17 462 42C475 57 484 66 506 66H1220"
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
            <div className="bec-mark" aria-hidden="true">
              BEC
            </div>
            <div className="bec-brand-rule" aria-hidden="true" />
            <div className="bec-brand-name">
              BANGLADESH
              <br />
              EXECUTIVE CHAMBER <span>/ BEC</span>
            </div>
          </Link>
          <div className="bec-links">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`bec-nav-link ${pathname === link.to ? "active" : ""}`}
                data-testid={`link-${link.label.toLowerCase().replaceAll(" ", "-")}`}
              >
                {link.label}
              </Link>
            ))}
          </div>
          <Link to="/join" className="bec-join" data-testid="link-join-bec">
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
