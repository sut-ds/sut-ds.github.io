import { UniversityMark } from "@/components/chrome/UniversityMark";
import { CtaGroup, type CtaItem } from "@/components/home/CtaGroup";
import { DynamicScene } from "@/components/home/DynamicScene";
import { cx } from "@/lib/cx";
import type { CourseIdentity } from "@/types/content";

import styles from "./HomeHero.module.css";

type HomeHeroProps = {
  course: CourseIdentity;
  ctas: CtaItem[];
  className?: string;
};

export function HomeHero({ course, ctas, className }: HomeHeroProps) {
  return (
    <section className={cx(styles.hero, className)} aria-labelledby="home-course-title">
      <div className={styles.staticScene} aria-hidden="true">
        <div className={styles.staticDots} />
      </div>

      <DynamicScene intensity="hero" />

      <div className={styles.scrim} aria-hidden="true" />

      <div className={styles.inner}>
        <div className={styles.identity}>
          <div className={styles.institutionRow}>
            <UniversityMark onDark size="md" decorative />
            <p className={styles.institution}>{course.institution}</p>
          </div>
          <h1 className={styles.title} id="home-course-title">
            {course.title}
          </h1>
          <p className={styles.tagline}>{course.tagline}</p>
        </div>
        <CtaGroup className={styles.ctas} items={ctas} size="lg" />
      </div>
    </section>
  );
}
