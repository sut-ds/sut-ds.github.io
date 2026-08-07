"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  useEffect,
  useId,
  useRef,
  type RefObject,
} from "react";
import { createPortal } from "react-dom";

import { Icon } from "@/components/foundation/Icon";
import { getChrome, getContact } from "@/lib/content";
import { cx } from "@/lib/cx";
import { PRIMARY_NAV_HREFS, UTILITY_NAV_HREFS } from "@/lib/nav";

import styles from "./MobileNav.module.css";

type MobileNavProps = {
  open: boolean;
  onClose: () => void;
  returnFocusRef?: RefObject<HTMLElement | null>;
};

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

function isActive(pathname: string, href: string): boolean {
  if (href === "/") {
    return pathname === "/";
  }
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function MobileNav({ open, onClose, returnFocusRef }: MobileNavProps) {
  const pathname = usePathname();
  const chrome = getChrome();
  const contact = getContact();
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const titleId = useId();
  const mounted = typeof document !== "undefined";

  useEffect(() => {
    if (!open) {
      return;
    }

    const dialog = dialogRef.current;
    const main = document.getElementById("main-content");
    const previousOverflow = document.body.style.overflow;
    const focusReturnEl = returnFocusRef?.current ?? null;

    document.body.style.overflow = "hidden";
    main?.setAttribute("inert", "");
    main?.setAttribute("aria-hidden", "true");

    closeButtonRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key !== "Tab" || !dialog) {
        return;
      }

      const focusable = Array.from(
        dialog.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR),
      ).filter((el) => !el.hasAttribute("disabled") && el.tabIndex !== -1);

      if (focusable.length === 0) {
        event.preventDefault();
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement;

      if (event.shiftKey && active === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
      main?.removeAttribute("inert");
      main?.removeAttribute("aria-hidden");
      focusReturnEl?.focus();
    };
  }, [open, onClose, returnFocusRef]);

  if (!open || !mounted) {
    return null;
  }

  const panel = (
    <div
      className={styles.panel}
      role="presentation"
      onClick={onClose}
      id="mobile-nav"
    >
      <div
        ref={dialogRef}
        className={styles.dialog}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        onClick={(event) => event.stopPropagation()}
      >
        <div className={styles.top}>
          <p className={styles.title} id={titleId}>
            Menu
          </p>
          <button
            ref={closeButtonRef}
            className={styles.close}
            type="button"
            onClick={onClose}
            aria-label="Close menu"
          >
            <Icon name="close" size={20} />
          </button>
        </div>

        <div className={styles.scroller}>
          <ul className={styles.list}>
            {PRIMARY_NAV_HREFS.map((item) => {
              const active = isActive(pathname, item.href);
              return (
                <li key={item.href}>
                  <Link
                    className={cx(styles.link, active && styles.active)}
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    onClick={onClose}
                  >
                    {chrome.navLabels[item.key]}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className={styles.utility}>
            <ul className={styles.utilityList}>
              {UTILITY_NAV_HREFS.map((item) => (
                <li key={item.href}>
                  <Link className={styles.link} href={item.href} onClick={onClose}>
                    {chrome.utilityLabels[item.key]}
                  </Link>
                </li>
              ))}
              {contact.footerContactHref ? (
                <li>
                  <Link
                    className={styles.link}
                    href={contact.footerContactHref}
                    onClick={onClose}
                  >
                    {contact.footerContactLabel ?? chrome.utilityLabels.contact}
                  </Link>
                </li>
              ) : null}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );

  // Portal escapes .site-shell stacking (siblings share z-index: 1, so main/hero
  // painted over an in-tree fixed drawer).
  return createPortal(panel, document.body);
}
