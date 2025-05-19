import { useEffect, useRef, useState } from "react";

interface UseAccordionRowsOptions {
  className?: string;
  onRowStateChange?: (rowStates: { [key: string]: boolean }) => void;
}

export function useAccordionRows({
  className = "accordion-card",
  onRowStateChange,
}: UseAccordionRowsOptions = {}) {
  const [rowStates, setRowStates] = useState<{ [key: string]: boolean }>({});
  const containerRef = useRef<HTMLDivElement>(null);

  const updateRowStates = () => {
    if (!containerRef.current) return;

    const cards = containerRef.current.querySelectorAll(`.${className}`);
    const newRowStates: { [key: string]: boolean } = {};
    let currentRow: number[] = [];
    let currentTop = -1;

    cards.forEach((card, index) => {
      const rect = card.getBoundingClientRect();

      if (currentTop === -1) {
        currentTop = rect.top;
      }

      if (rect.top === currentTop) {
        currentRow.push(index);
      } else {
        const rowKey = currentRow.join("-");
        newRowStates[rowKey] = rowStates[rowKey] ?? false;
        currentRow = [index];
        currentTop = rect.top;
      }
    });

    if (currentRow.length > 0) {
      const rowKey = currentRow.join("-");
      newRowStates[rowKey] = rowStates[rowKey] ?? false;
    }

    setRowStates(newRowStates);
    onRowStateChange?.(newRowStates);
  };

  useEffect(() => {
    updateRowStates();
    window.addEventListener("resize", updateRowStates);
    return () => window.removeEventListener("resize", updateRowStates);
  }, []);

  const handleCardToggle = (index: number) => {
    const cards = containerRef.current?.querySelectorAll(`.${className}`);
    if (!cards) return;

    const card = cards[index];
    const rect = card.getBoundingClientRect();
    const rowIndices: number[] = [];

    cards.forEach((c, i) => {
      const r = c.getBoundingClientRect();
      if (r.top === rect.top) {
        rowIndices.push(i);
      }
    });

    const rowKey = rowIndices.join("-");
    setRowStates((prev) => {
      const newStates = {
        ...prev,
        [rowKey]: !prev[rowKey],
      };
      onRowStateChange?.(newStates);
      return newStates;
    });
  };

  const getCardState = (index: number) => {
    const cards = containerRef.current?.querySelectorAll(`.${className}`);
    if (!cards) return false;

    const card = cards[index];
    const rect = card.getBoundingClientRect();
    const rowIndices: number[] = [];

    cards.forEach((c, i) => {
      const r = c.getBoundingClientRect();
      if (r.top === rect.top) {
        rowIndices.push(i);
      }
    });

    const rowKey = rowIndices.join("-");
    return rowStates[rowKey] ?? false;
  };

  return {
    containerRef,
    handleCardToggle,
    getCardState,
    rowStates,
    updateRowStates,
  };
}
