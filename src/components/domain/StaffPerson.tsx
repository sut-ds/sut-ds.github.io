"use client";

import { useState } from "react";

import { TextLink } from "@/components/foundation/TextLink";
import { cx } from "@/lib/cx";
import type { StaffMember } from "@/types/content";

import styles from "./StaffPerson.module.css";

type StaffPersonProps = {
  person: StaffMember;
  className?: string;
};

function roleLabel(role: string): string {
  if (role === "instructor") return "Instructor";
  if (role === "ta") return "Teaching assistant";
  return role;
}

function initialsFromName(name: string): string {
  const cleaned = name.replace(/^dr\.?\s+/i, "").trim();
  const parts = cleaned.split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
}

function avatarToneFromId(id: string): string {
  let hash = 0;
  for (const character of id) {
    hash = (hash * 31 + character.charCodeAt(0)) | 0;
  }
  return `avatarTone${Math.abs(hash) % 4}`;
}

function telegramHref(telegram: string): string {
  const trimmed = telegram.trim();
  if (/^https?:\/\//i.test(trimmed)) {
    return trimmed;
  }
  const handle = trimmed.replace(/^@/, "");
  return `https://t.me/${handle}`;
}

function telegramLabel(telegram: string): string {
  const trimmed = telegram.trim();
  if (/^https?:\/\//i.test(trimmed)) {
    return trimmed.replace(/^https?:\/\/(www\.)?t\.me\//i, "@");
  }
  return trimmed.startsWith("@") ? trimmed : `@${trimmed}`;
}

export function StaffPerson({ person, className }: StaffPersonProps) {
  const initials = initialsFromName(person.name);
  const [imageFailed, setImageFailed] = useState(false);
  const hasContact = Boolean(
    person.email ||
      person.telegram ||
      person.officeHours ||
      person.officeLocation ||
      (person.links && person.links.length > 0),
  );

  return (
    <article className={cx(styles.person, className)} id={person.slug}>
      {person.photo && !imageFailed ? (
        // eslint-disable-next-line @next/next/no-img-element -- optional staff photos; static-export friendly
        <img
          className={styles.photo}
          src={person.photo.src}
          alt={person.photo.alt}
          width={96}
          height={96}
          loading="lazy"
          decoding="async"
          onError={() => setImageFailed(true)}
        />
      ) : (
        <div
          className={cx(styles.avatar, styles[avatarToneFromId(person.id)])}
          aria-hidden="true"
        >
          {initials}
        </div>
      )}

      <div className={styles.body}>
        <h3 className={styles.name}>{person.name}</h3>
        <p className={styles.role}>
          {person.title ? `${person.title} · ` : null}
          {roleLabel(person.role)}
        </p>

        {person.bio ? <p className={styles.bio}>{person.bio}</p> : null}

        {hasContact ? (
          <div className={styles.meta}>
            {person.email ? (
              <p>
                <span className={styles.metaLabel}>Email: </span>
                <a href={`mailto:${person.email}`}>{person.email}</a>
              </p>
            ) : null}
            {person.telegram ? (
              <p>
                <span className={styles.metaLabel}>Telegram: </span>
                <a
                  href={telegramHref(person.telegram)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {telegramLabel(person.telegram)}
                </a>
              </p>
            ) : null}
            {person.officeHours ? (
              <p>
                <span className={styles.metaLabel}>Office hours: </span>
                {person.officeHours}
              </p>
            ) : null}
            {person.officeLocation ? (
              <p>
                <span className={styles.metaLabel}>Office: </span>
                {person.officeLocation}
              </p>
            ) : null}
          </div>
        ) : null}

        {person.links && person.links.length > 0 ? (
          <ul className={styles.links}>
            {person.links.map((link) => (
              <li key={link.href}>
                <TextLink href={link.href} external>
                  {link.label}
                </TextLink>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </article>
  );
}
