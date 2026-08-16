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
    bio: "Full Professor of Electrical Engineering, Sharif University of Technology.",
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
    bio: "Lecturer in Electrical Engineering, Sharif University of Technology",
    email: "seyedsaberi@gmail.com",
    // telegram: "@…",
    photo: { src: "/images/staff/amir-hossein-saberi.jpg", alt: "Dr. Amir Hossein Saberi, Instructor" },
  },
  {
    id: "mohammad-eshtehardian",
    slug: "mohammad-eshtehardian",
    name: "Mohammad Eshtehardian",
    role: "ta",
    title: "Head Teaching Assistant",
    publish: true,
    order: 3,
    bio: "PhD student of Electrical Engineering, Sharif University of Technology.",
    email: "mohammad.eshtehardian@sharif.edu",
    // telegram: "@…",
    photo: { src: "/images/staff/mohammad-eshtehardian.jpg", alt: "Mohammad Eshtehardian, Head Teaching Assistant" },
  },
  {
    id: "kiarash-rashidi",
    slug: "kiarash-rashi",
    name: "Kiarash Rashi",
    role: "ta",
    title: "Teaching Assistant",
    publish: true,
    order: 4,
    bio: "MSc student of Electrical Engineering, Sharif University of Technology.",
    email: "kia.rashidi@sharif.edu",
    // telegram: "@…",
    photo: { src: "/images/staff/kiarash-rashidi.jpg", alt: "Kiarash Rashi, Teaching Assistant" },
  },
  {
    id: "mohammad-hossein-momeni",
    slug: "mohammad-hossein-momeni",
    name: "Mohammad Hossein Momeni Hamaneh",
    role: "ta",
    title: "Teaching Assistant",
    publish: true,
    order: 4,
    bio: "MSc student of Electrical Engineering, Sharif University of Technology.",
    email: "Mohammadh.momenih81@sharif.edu",
    // telegram: "@…",
    photo: { src: "/images/staff/mohammad-hossein-momeni.jpg", alt: "Mohammad Hossein Momeni Hamaneh, Teaching Assistant" },
  },
];
