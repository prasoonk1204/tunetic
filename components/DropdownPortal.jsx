"use client";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

export default function DropdownPortal({
  children,
  targetRef,
  open,
  onHoverChange = () => {},
  position = "left",
}) {
  const [coords, setCoords] = useState({ top: 0, left: 0 });
  const dropdownRef = useRef(null);

  useEffect(() => {
    if (open && targetRef.current) {
      const rect = targetRef.current.getBoundingClientRect();
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      const scrollX = window.scrollX || document.documentElement.scrollLeft;

      const dropdownHeight = dropdownRef.current?.offsetHeight || 0;
      const windowHeight = window.innerHeight;
      const spaceBelow = windowHeight - rect.bottom;

      const dropAbove = spaceBelow < dropdownHeight + 12;
      const top = dropAbove
        ? rect.top + scrollY - dropdownHeight - 8
        : rect.bottom + scrollY + 4;

      const left = rect.left + scrollX - 0;

      setCoords({ top, left });
    }
  }, [open, targetRef, position]);

  if (!open) return null;

  return createPortal(
    <div
      ref={dropdownRef}
      className="dropdown-portal fade-in"
      style={{
        position: "absolute",
        top: coords.top,
        left: coords.left,
        zIndex: 9999,
      }}
      onMouseEnter={() => onHoverChange(true)}
      onMouseLeave={() => onHoverChange(false)}
    >
      {children}
    </div>,
    document.body
  );
}
