import React from "react";
import styles from "./styles/GospelContent.module.scss";
import MarkdownContent from "@/ui/components/MarkdownContent/MarkdownContent";
interface props {
  data?: any;
}

const GospelSpecific: React.FC<props> = ({ data }) => {
  return (
    <div className={styles.gospelPage}>
      <div className={styles.content}>
        <h1 className={styles.gospel_title}>{data.titleData}</h1>
        <MarkdownContent content={data.contentData} />
      </div>
    </div>
  );
};

export default GospelSpecific;
