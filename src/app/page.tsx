import type { Metadata } from "next";

import { Container } from "@/components/foundation/Container";
import { CurrentSignal } from "@/components/home/CurrentSignal";
import { HomeHero } from "@/components/home/HomeHero";
import { QuickLinks } from "@/components/home/QuickLinks";
import { UpcomingDeadlines } from "@/components/home/UpcomingDeadlines";
import {
  getChrome,
  getCourse,
  getHomeAnnouncements,
  getUpcomingDeadlines,
} from "@/lib/content";

import styles from "./home.module.css";

export const metadata: Metadata = {
  title: "Home",
};

export default function HomePage() {
  const course = getCourse();
  const chrome = getChrome();
  const announcements = getHomeAnnouncements();
  const deadlines = getUpcomingDeadlines();

  const ctas = [
    {
      href: "/syllabus",
      label: chrome.ctaLabels?.syllabus ?? "View syllabus",
    },
    {
      href: "/lectures",
      label: chrome.ctaLabels?.lectures ?? "Browse lectures",
    },
    {
      href: "/assignments",
      label: chrome.ctaLabels?.assignments ?? "See assignments",
    },
  ];

  const quickLinks = [
    { href: "/schedule", label: chrome.navLabels.schedule },
    { href: "/resources", label: chrome.navLabels.resources },
    { href: "/staff", label: chrome.navLabels.staff },
    { href: "/faq", label: chrome.utilityLabels.faq },
    { href: "/announcements", label: chrome.utilityLabels.announcements },
  ];

  return (
    <div className={styles.page}>
      <HomeHero course={course} ctas={ctas} />

      <Container className={styles.below}>
        <CurrentSignal
          announcements={announcements}
          title={chrome.utilityLabels.announcements}
        />
        <UpcomingDeadlines deadlines={deadlines} />
        <QuickLinks links={quickLinks} />

        <section className={styles.snapshot} aria-labelledby="home-snapshot">
          <h2 className={styles.snapshotTitle} id="home-snapshot">
            About the course
          </h2>
          <p className={styles.snapshotBody}>{course.description}</p>
        </section>
      </Container>
    </div>
  );
}
