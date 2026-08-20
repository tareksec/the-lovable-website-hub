import { useEffect, useRef, type ReactNode } from "react";

const INTERACTIVE_SELECTOR = "a, button, [role=button], [data-cursor]";
const MAGNETIC_SELECTOR = "[data-magnetic]";
const TILT_SELECTOR = "[data-tilt], .bec-team-card, .bec-event-card, .bec-blog-card";
const PARALLAX_SELECTOR = "[data-hero-parallax]";

type TransformElement = HTMLElement & { _becCleanup?: () => void };

function isDesktopPointer() {
  return (
    window.matchMedia("(pointer: fine)").matches &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

export default function CursorInteractions({ children }: { children: ReactNode }) {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isDesktopPointer()) return;

    const cursor = cursorRef.current;
    if (!cursor) return;

    let frame = 0;
    let attachmentFrame = 0;
    let pointerX = -100;
    let pointerY = -100;

    const renderCursor = () => {
      frame = 0;
      cursor.style.transform = `translate3d(${pointerX}px, ${pointerY}px, 0)`;
    };

    const moveCursor = (event: PointerEvent) => {
      pointerX = event.clientX;
      pointerY = event.clientY;
      if (!frame) frame = requestAnimationFrame(renderCursor);
    };

    const handleOver = (event: PointerEvent) => {
      const target = event.target instanceof Element ? event.target : null;
      cursor.classList.toggle("is-active", Boolean(target?.closest(INTERACTIVE_SELECTOR)));
      cursor.classList.toggle("is-view", target?.closest("[data-cursor='view']") != null);
    };

    const resetElement = (element: TransformElement) => {
      element.style.removeProperty("--bec-magnetic-x");
      element.style.removeProperty("--bec-magnetic-y");
      element.style.removeProperty("--bec-tilt-x");
      element.style.removeProperty("--bec-tilt-y");
      element.style.removeProperty("--bec-shadow-x");
      element.style.removeProperty("--bec-shadow-y");
    };

    const attachMagnetic = (element: TransformElement) => {
      if (element._becCleanup) return;
      const strength = Number(element.dataset.magneticStrength ?? 0.18);
      const radius = Number(element.dataset.magneticRadius ?? 140);
      const handleMove = (event: PointerEvent) => {
        const rect = element.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const distance = Math.hypot(event.clientX - centerX, event.clientY - centerY);
        if (distance > radius) {
          resetElement(element);
          return;
        }
        const pull = Math.max(0, 1 - distance / radius);
        element.style.setProperty("--bec-magnetic-x", `${(event.clientX - centerX) * strength * pull}px`);
        element.style.setProperty("--bec-magnetic-y", `${(event.clientY - centerY) * strength * pull}px`);
      };
      const handleLeave = () => resetElement(element);
      element.addEventListener("pointermove", handleMove, { passive: true });
      element.addEventListener("pointerleave", handleLeave, { passive: true });
      element._becCleanup = () => {
        element.removeEventListener("pointermove", handleMove);
        element.removeEventListener("pointerleave", handleLeave);
      };
    };

    const attachTilt = (element: TransformElement) => {
      if (element._becCleanup) return;
      const handleMove = (event: PointerEvent) => {
        const rect = element.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width - 0.5;
        const y = (event.clientY - rect.top) / rect.height - 0.5;
        element.style.setProperty("--bec-tilt-x", `${y * -4}deg`);
        element.style.setProperty("--bec-tilt-y", `${x * 4}deg`);
        element.style.setProperty("--bec-shadow-x", `${x * 14}px`);
        element.style.setProperty("--bec-shadow-y", `${y * 14 + 12}px`);
      };
      const handleLeave = () => resetElement(element);
      element.addEventListener("pointermove", handleMove, { passive: true });
      element.addEventListener("pointerleave", handleLeave, { passive: true });
      element._becCleanup = () => {
        element.removeEventListener("pointermove", handleMove);
        element.removeEventListener("pointerleave", handleLeave);
      };
    };

    const attachParallax = (element: TransformElement) => {
      if (element._becCleanup) return;
      const handleMove = (event: PointerEvent) => {
        const rect = element.parentElement?.getBoundingClientRect();
        if (!rect) return;
        const x = (event.clientX - rect.left) / rect.width - 0.5;
        const y = (event.clientY - rect.top) / rect.height - 0.5;
        element.style.setProperty("--bec-parallax-x", `${x * 12}px`);
        element.style.setProperty("--bec-parallax-y", `${y * 8}px`);
      };
      const handleLeave = () => {
        element.style.removeProperty("--bec-parallax-x");
        element.style.removeProperty("--bec-parallax-y");
      };
      element.parentElement?.addEventListener("pointermove", handleMove, { passive: true });
      element.parentElement?.addEventListener("pointerleave", handleLeave, { passive: true });
      element._becCleanup = () => {
        element.parentElement?.removeEventListener("pointermove", handleMove);
        element.parentElement?.removeEventListener("pointerleave", handleLeave);
      };
    };

    const attachAll = () => {
      attachmentFrame = 0;
      document.querySelectorAll<TransformElement>(MAGNETIC_SELECTOR).forEach(attachMagnetic);
      document.querySelectorAll<TransformElement>(TILT_SELECTOR).forEach(attachTilt);
      document.querySelectorAll<TransformElement>(PARALLAX_SELECTOR).forEach(attachParallax);
    };

    const scheduleAttach = () => {
      if (!attachmentFrame) attachmentFrame = requestAnimationFrame(attachAll);
    };

    const observer = new MutationObserver(scheduleAttach);
    observer.observe(document.body, { childList: true, subtree: true });
    document.addEventListener("pointermove", moveCursor, { passive: true });
    document.addEventListener("pointerover", handleOver, { passive: true });
    attachAll();

    return () => {
      if (frame) cancelAnimationFrame(frame);
      if (attachmentFrame) cancelAnimationFrame(attachmentFrame);
      observer.disconnect();
      document.removeEventListener("pointermove", moveCursor);
      document.removeEventListener("pointerover", handleOver);
      document.querySelectorAll<TransformElement>(MAGNETIC_SELECTOR).forEach((element) => element._becCleanup?.());
      document.querySelectorAll<TransformElement>(TILT_SELECTOR).forEach((element) => element._becCleanup?.());
      document.querySelectorAll<TransformElement>(PARALLAX_SELECTOR).forEach((element) => element._becCleanup?.());
    };
  }, []);

  return (
    <>
      {children}
      <div ref={cursorRef} className="bec-cursor" aria-hidden="true">
        <span>View</span>
      </div>
    </>
  );
}