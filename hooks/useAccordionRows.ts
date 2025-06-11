import { useState, useEffect, useRef, useCallback } from "react";

interface Position {
  index: number;
  top: number;
  left: number;
  element: HTMLElement;
}

interface UseAccordionRowsReturn {
  containerRef: React.RefObject<HTMLDivElement | null>;
  getItemRef: (index: number) => (el: HTMLElement | null) => void;
  toggleItem: (index: number) => void;
  isOpen: (index: number) => boolean;
  getRowItems: (index: number) => number[];
  resetAll: () => void;
  rowGroups: number[][];
  openStates: Record<number, boolean>;
  isMobile: boolean;
  isRowGroupingActive: boolean;
}

const useAccordionRows = (
  itemCount: number,
  deps: any[] = [],
  mobileBreakpoint: number = 768
): UseAccordionRowsReturn => {
  const [openStates, setOpenStates] = useState<Record<number, boolean>>({});
  const [rowGroups, setRowGroups] = useState<number[][]>([]);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLElement | null)[]>([]);
  const resizeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Check if current screen is mobile
  const checkIsMobile = useCallback(() => {
    const mobile = window.innerWidth < mobileBreakpoint;
    setIsMobile(mobile);
    return mobile;
  }, [mobileBreakpoint]);

  // Initialize refs array
  useEffect(() => {
    itemRefs.current = Array(itemCount)
      .fill(null)
      .map((_, i) => itemRefs.current[i] || null);
  }, [itemCount]);

  // Initialize mobile check
  useEffect(() => {
    checkIsMobile();
  }, [checkIsMobile]);

  // Detect row groups based on element positions
  const detectRowGroups = useCallback(() => {
    // Don't detect rows on mobile
    if (checkIsMobile()) {
      setRowGroups([]);
      return;
    }

    if (!containerRef.current || itemRefs.current.some((ref) => !ref)) {
      return;
    }

    const groups: number[][] = [];
    const positions: Position[] = itemRefs.current
      .map((ref, index) => {
        if (!ref) return null;
        const rect = ref.getBoundingClientRect();
        return {
          index,
          top: rect.top,
          left: rect.left,
          element: ref,
        };
      })
      .filter((pos): pos is Position => pos !== null);

    if (positions.length === 0) return;

    // Sort by top position first, then by left position
    positions.sort((a, b) => {
      const topDiff = a.top - b.top;
      if (Math.abs(topDiff) > 10) return topDiff; // 10px tolerance for row detection
      return a.left - b.left;
    });

    // Group elements by their vertical position with better tolerance
    const tolerance = 10; // Increased tolerance for better row detection
    let currentGroup: number[] = [];
    let currentTop: number | null = null;

    positions.forEach(({ index, top }) => {
      if (currentTop === null || Math.abs(top - currentTop) <= tolerance) {
        if (currentTop === null) currentTop = top;
        currentGroup.push(index);
      } else {
        if (currentGroup.length > 0) {
          groups.push([...currentGroup]);
        }
        currentGroup = [index];
        currentTop = top;
      }
    });

    // Add the last group
    if (currentGroup.length > 0) {
      groups.push(currentGroup);
    }

    setRowGroups(groups);
  }, [itemCount, checkIsMobile, ...deps]);

  // Re-detect rows when dependencies change or on resize with debouncing
  useEffect(() => {
    const timer = setTimeout(detectRowGroups, 100); // Slight delay for layout to settle
    return () => clearTimeout(timer);
  }, [detectRowGroups]);

  useEffect(() => {
    const handleResize = () => {
      // Clear existing timeout
      if (resizeTimeoutRef.current) {
        clearTimeout(resizeTimeoutRef.current);
      }

      // Debounce resize events
      resizeTimeoutRef.current = setTimeout(() => {
        checkIsMobile();
        detectRowGroups();
      }, 150);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      if (resizeTimeoutRef.current) {
        clearTimeout(resizeTimeoutRef.current);
      }
    };
  }, [detectRowGroups, checkIsMobile]);

  // Get ref setter for each item
  const getItemRef = useCallback(
    (index: number) => (el: HTMLElement | null) => {
      itemRefs.current[index] = el;

      // Only detect rows if all refs are set and not on mobile
      if (el && itemRefs.current.every((ref) => ref !== null) && !isMobile) {
        // Use requestAnimationFrame to ensure DOM is fully updated
        requestAnimationFrame(() => {
          setTimeout(detectRowGroups, 50);
        });
      }
    },
    [detectRowGroups, isMobile]
  );

  // Toggle function that affects entire row (disabled on mobile)
  const toggleItem = useCallback(
    (index: number) => {
      // On mobile, toggle individual items only
      if (isMobile) {
        setOpenStates((prev) => ({
          ...prev,
          [index]: !prev[index],
        }));
        return;
      }

      const rowGroup = rowGroups.find((group) => group.includes(index));
      if (!rowGroup) {
        // Fallback: toggle individual item if no row group found
        setOpenStates((prev) => ({
          ...prev,
          [index]: !prev[index],
        }));
        return;
      }

      const newState = !openStates[index];
      setOpenStates((prev) => {
        const updated = { ...prev };
        rowGroup.forEach((itemIndex) => {
          updated[itemIndex] = newState;
        });
        return updated;
      });
    },
    [rowGroups, openStates, isMobile]
  );

  // Check if an item is open
  const isOpen = useCallback(
    (index: number) => {
      return Boolean(openStates[index]);
    },
    [openStates]
  );

  // Get all items in the same row as the given index
  const getRowItems = useCallback(
    (index: number) => {
      const rowGroup = rowGroups.find((group) => group.includes(index));
      return rowGroup || [index];
    },
    [rowGroups]
  );

  // Reset all states
  const resetAll = useCallback(() => {
    setOpenStates({});
  }, []);

  return {
    containerRef,
    getItemRef,
    toggleItem,
    isOpen,
    getRowItems,
    resetAll,
    rowGroups,
    openStates,
    isMobile,
    isRowGroupingActive: !isMobile && rowGroups.length > 0,
  };
};

export default useAccordionRows;

