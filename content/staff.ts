/**
 * Staff roster.
 *
 * Contacts (optional — omit until real):
 *   email: "name@sharif.edu"
 *   telegram: "@handle"  // or "handle" or "https://t.me/handle"
 *
 * Photos: drop a square WebP/JPEG/PNG into `public/images/staff/`, then set:
 *   photo: { src: "/images/staff/<filename>", alt: "<Name>, <role>" }
 *
 * Add more TAs as separate entries with role: "ta", then reference their `id`
 * from assignment `taIds` in content/assignments.ts.
 */
import type { StaffMember } from "@/types/content";

export const staff: StaffMember[] = [
  {
    id: "babak-hossein-khalaj",
    slug: "babak-hossein-khalaj",
    name: "Dr. Babak Hossein Khalaj",
    role: "instructor",
    title: "Instructor",
    publish: true,
    order: 1,
    bio: "Primary instructor for introduction, data models, databases, visualization, ML dataflow modules, and causality.",
    email: "khalaj@sharif.edu",
    // telegram: "@…",
    photo: { src: "/images/staff/babak-khalaj.jpg", alt: "Dr. Babak Hossein Khalaj, Instructor" },
  },
  {
    id: "amir-hossein-saberi",
    slug: "amir-hossein-saberi",
    name: "Dr. Amir Hossein Saberi",
    role: "instructor",
    title: "Instructor",
    publish: true,
    order: 2,
    bio: "Teaches statistical learning, deep learning, transformers and small language models, generative and diffusion models, and modern time-series modeling.",
    // email: "…",
    // telegram: "@…",
    // photo: { src: "/images/staff/amir-hossein-saberi.webp", alt: "Dr. Amir Hossein Saberi, Instructor" },
  },
  {
    id: "mohammad-eshtehardian",
    slug: "mohammad-eshtehardian",
    name: "Mohammad Eshtehardian",
    role: "ta",
    title: "Head Teaching Assistant",
    publish: true,
    order: 3,
    bio: "Head TA for Foundations of Data Science.",
    email: "mohammad.eshtehardian@sharif.edu",
    // telegram: "@…",
    photo: { src: "/images/staff/mohammad-eshtehardian.jpg", alt: "Mohammad Eshtehardian, Head Teaching Assistant" },
  },
];
