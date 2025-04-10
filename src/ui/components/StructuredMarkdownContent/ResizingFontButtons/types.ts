export interface ResizingFontButtonsProps {
  setCurrentBlocksFontSizes: (currentBlocksFontSizes: {
    p: number;
    h2: number;
    h3: number;
    h4: number;
    h5: number;
    blockquote: number;
  }) => void;
}
