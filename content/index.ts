import { announcements } from "./announcements";
import { assignments } from "./assignments";
import { chrome } from "./chrome";
import { contact } from "./contact";
import { course } from "./course";
import { faq } from "./faq";
import { lectures } from "./lectures";
import { resources } from "./resources";
import { staff } from "./staff";
import { syllabus } from "./syllabus";
import { workshops } from "./workshops";
import { schedule } from "./schedule";

import type { CourseContent } from "@/types/content";

export const content: CourseContent = {
  course,
  syllabus,
  schedule,
  lectures,
  workshops,
  assignments,
  announcements,
  resources,
  staff,
  faq,
  contact,
  chrome,
};

export {
  announcements,
  assignments,
  chrome,
  contact,
  course,
  faq,
  lectures,
  resources,
  schedule,
  staff,
  syllabus,
  workshops,
};
