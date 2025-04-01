"use client"

import React from 'react'
import Link from 'next/link';
import { slugSelector } from '@/utils/slugSelector';
import { useLocale } from "@/hooks/useLocale";
import Icon from '../Icon';

import styles from "./styles/read-more-link.module.scss";

interface ReadMoreLinkProps {
  to: string
  label: string
  className?: string
}

const ReadMoreLink:React.FC<ReadMoreLinkProps> = ({
  to,
  label,
  className
}) => {
  const locale = useLocale();
  const href = slugSelector(locale, to);

  return (
    <Link className={`${styles["read-more-link"]} ${className ? className : ''}`} href={href}>
      <Icon className={styles["read-more-link__icon"]} iconName='rightArrow'/>
      
      <span>{label}</span>
    </Link>
  )
}

export default ReadMoreLink
