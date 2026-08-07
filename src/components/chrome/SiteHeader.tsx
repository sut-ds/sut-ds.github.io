"use client";

import Link from "next/link";
import { useCallback, useRef, useState } from "react";

import { MobileNav } from "@/components/chrome/MobileNav";
import { PrimaryNav } from "@/components/chrome/PrimaryNav";
import { UniversityMark } from "@/components/chrome/UniversityMark";
import { UtilityNav } from "@/components/chrome/UtilityNav";
import { Container } from "@/components/foundation/Container";
import { Icon } from "@/components/foundation/Icon";
import { getCourse } from "@/lib/content";

import styles from "./SiteHeader.module.css";

export function SiteHeader() {
  const course = getCourse();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const closeMenu = useCallback(() => setMenuOpen(false), []);

  return (
    <header className={styles.header}>
      <Container className={styles.inner}>
        <div className={styles.brandBlock}>
          <Link className={styles.brand} href="/">
            <UniversityMark size="sm" decorative />
            <span className={styles.brandText}>
              {course.shortName ?? course.title}
              <span className={styles.brandMeta}>{course.institution}</span>
            </span>
          </Link>
        </div>

        <div className={styles.desktopNav}>
          <PrimaryNav />
          <UtilityNav variant="compact" />
        </div>

        <button
          ref={menuButtonRef}
          className={styles.menuButton}
          type="button"
          aria-expanded={menuOpen}
          aria-controls="mobile-nav"
          aria-label="Open menu"
          onClick={() => setMenuOpen(true)}
        >
          <Icon name="menu" size={20} />
        </button>
      </Container>

      <div id="mobile-nav">
        <MobileNav
          open={menuOpen}
          onClose={closeMenu}
          returnFocusRef={menuButtonRef}
        />
      </div>
    </header>
  );
}
