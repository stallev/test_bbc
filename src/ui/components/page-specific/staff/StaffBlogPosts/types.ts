import { BlogCardProps } from '@/ui/components/page-specific/blog/BlogCard/types';

export interface StaffBlogPostsProps {
  data: BlogCardProps[];
  translations: Record<string, string>;
}
