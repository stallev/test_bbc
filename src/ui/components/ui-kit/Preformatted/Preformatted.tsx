import { GutenbergBlocksTypes } from '@/constants/GutenbergBlocksTypes';
import { ParsedHTMLBlock } from '@/types/postTypes';

import styles from './styles/preformatted.module.scss';

interface PreformattedProps {
  block: ParsedHTMLBlock;
  preformattedType?:
    | typeof GutenbergBlocksTypes.code
    | typeof GutenbergBlocksTypes.preformatted
    | typeof GutenbergBlocksTypes.verse;
  className?: string;
}

const Preformatted = ({ block, className = '' }: PreformattedProps) => {
  return (
    <div
      className={`${styles.preformatted} ${className}`.trim()}
      dangerouslySetInnerHTML={{ __html: block.content }}
    />
  );
};

export default Preformatted;
