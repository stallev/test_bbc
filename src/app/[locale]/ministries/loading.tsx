import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import styles from '@/styles/pages/ministry.module.scss';
import Container from '@/ui/containers/Container/Container';

export default function LoadingMinistryPage() {
  return (
    <SkeletonTheme baseColor="#ccc" highlightColor="#ddd">
      <Container>
        <div className={styles['ministry__layout-skeleton']}>
          <h1 className={styles['ministry__title']}>
            <Skeleton className={styles['ministry__layout-title-skeleton']} width={250} />
          </h1>

          <div className={styles['ministry__layout-gallery']}>
            <div className={styles['ministry__layout-gallery-item']}>
              <Skeleton height="100%" />
            </div>
            <div className={styles['ministry__layout-gallery-item']}>
              <Skeleton height="100%" />
            </div>
            <div className={styles['ministry__layout-gallery-item']}>
              <Skeleton height="100%" />
            </div>
            <div className={styles['ministry__layout-gallery-item']}>
              <Skeleton height="100%" />
            </div>
          </div>

          <div className={styles['ministry__layout-content-skeleton']}>
            <Skeleton count={10} height={16} style={{ marginBottom: '12px' }} />
          </div>
        </div>
      </Container>
    </SkeletonTheme>
  );
}
