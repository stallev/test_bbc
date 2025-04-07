"use client"

import React from "react";
import Link from "next/link";
import { slugSelector } from "@/utils/slugSelector";
import { useLocale } from "@/hooks/useLocale";

import styles from "./styles/custom-link.module.scss";

interface CustomLinkProps {
  to: string;
  label?: string;
  children?: React.ReactNode;
  className?: string;
  type?: string;
  ariaLabel?: string;
  onCLick?: () => void;
  onHover?: () => void;
}

const CustomLink: React.FC<CustomLinkProps> = ({
  to,
  label = "",
  ariaLabel = "",
  children,
  className,
  type = "link",
  onCLick,
  onHover,
}: CustomLinkProps) => {
  const locale = useLocale();
  const href = slugSelector(locale, to);

  return (
    <div
      onClick={onCLick}
      onMouseEnter={onHover}
      className={`${styles["custom-link"]} ${styles[`custom-link--${type}`]} ${className}`}
    >
      <Link aria-label={ariaLabel || label} href={href}>
        {label && label}
        {children}
      </Link>
    </div>
  );
};

export default CustomLink;
