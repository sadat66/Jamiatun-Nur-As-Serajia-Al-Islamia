"use client";

import { useState, useRef, useEffect } from "react";
import QuickLinks from "@/components/QuickLinks";
import AboutSections from "@/components/AboutSections";

export default function AboutAccordionSection() {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  const handleSectionClick = (id: string | null) => {
    setActiveSection((prev) => (prev === id ? null : id));
  };

  useEffect(() => {
    if (activeSection && sectionRef.current) {
      const el = sectionRef.current.querySelector(`#${activeSection}`);
      el?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [activeSection]);

  return (
    <>
      <QuickLinks
        activeSection={activeSection}
        onSectionClick={handleSectionClick}
      />
      {activeSection && (
        <div ref={sectionRef}>
          <AboutSections activeSection={activeSection} />
        </div>
      )}
    </>
  );
}
