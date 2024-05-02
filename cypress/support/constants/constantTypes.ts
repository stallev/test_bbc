export interface PageProps {
  path: string;
  title: string;
}

export interface PagesDataProps {
  [key: string]: PageProps;
}