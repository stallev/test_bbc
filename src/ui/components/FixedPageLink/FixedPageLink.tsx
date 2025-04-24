import { CustomLink, Icon } from '@/ui/components/ui-kit';

import styles from './styles/fixed-page-link.module.scss';

interface FixedPageLinkProps {
  link: string;
  iconName: string;
  label: string;
  className?: string;
}

const FixedPageLink = ({ link, iconName, label, className = '' }: FixedPageLinkProps) => {
  return (
    <CustomLink
      to={link}
      className={`${styles['fixed-page-link']} ${className}`}
      ariaLabel={`Go to ${label} page`}
    >
      <Icon iconName={iconName} />
    </CustomLink>
  );
};

export default FixedPageLink;
