import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";

import { cx } from "@/lib/cx";

import styles from "./Button.module.css";

export type ButtonVariant =
  | "primary"
  | "accent"
  | "secondary"
  | "ghost"
  | "onDark"
  | "onDarkSecondary"
  | "onDarkGhost";
export type ButtonSize = "sm" | "md" | "lg";

type SharedProps = {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
};

type ButtonAsButton = SharedProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children" | "className"> & {
    href?: undefined;
  };

type ButtonAsLink = SharedProps & {
  href: string;
  external?: boolean;
};

export type ButtonProps = ButtonAsButton | ButtonAsLink;

export function Button(props: ButtonProps) {
  const classNames = cx(
    styles.button,
    styles[props.variant ?? "primary"],
    styles[props.size ?? "md"],
    props.className,
  );

  if ("href" in props && props.href) {
    if (props.external) {
      return (
        <a
          className={classNames}
          href={props.href}
          target="_blank"
          rel="noopener noreferrer"
        >
          {props.children}
        </a>
      );
    }

    return (
      <Link className={classNames} href={props.href}>
        {props.children}
      </Link>
    );
  }

  const buttonProps = props as ButtonAsButton;

  return (
    <button
      className={classNames}
      type={buttonProps.type ?? "button"}
      disabled={buttonProps.disabled}
      onClick={buttonProps.onClick}
      aria-label={buttonProps["aria-label"]}
      name={buttonProps.name}
      value={buttonProps.value}
      form={buttonProps.form}
    >
      {buttonProps.children}
    </button>
  );
}
