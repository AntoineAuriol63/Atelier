"use client";

import { cloneElement, isValidElement, useState, type ReactElement, type ReactNode } from "react";

/**
 * Infobulle immédiate (150 ms), lisible, positionnée sous l'élément (ou à sa droite : le rail collé au bord gauche de la fenêtre). Remplace l'attribut `title`,
 * trop lent et invisible dans certains navigateurs. À utiliser sur les icônes et les libellés courts.
 */
export function Tooltip({ text, children, side = "bottom" }: { text: ReactNode; children: ReactElement<Record<string, unknown>>; side?: "bottom" | "top" | "left" | "right" }) {
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null);
  const [timer, setTimer] = useState<number | null>(null);
  if (!isValidElement(children) || !text) return children;
  const show = (e: React.MouseEvent | React.FocusEvent) => {
    const r = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const t = window.setTimeout(() => setPos({ x: side === "left" ? r.left - 6 : side === "right" ? r.right + 8 : r.left + r.width / 2, y: side === "top" ? r.top - 6 : side === "left" || side === "right" ? r.top + r.height / 2 : r.bottom + 6 }), 150);
    setTimer(t);
  };
  const hide = () => { if (timer) window.clearTimeout(timer); setTimer(null); setPos(null); };
  const child = cloneElement(children, {
    onMouseEnter: (e: React.MouseEvent) => { (children.props.onMouseEnter as ((e: React.MouseEvent) => void) | undefined)?.(e); show(e); },
    onMouseLeave: (e: React.MouseEvent) => { (children.props.onMouseLeave as ((e: React.MouseEvent) => void) | undefined)?.(e); hide(); },
    onFocus: (e: React.FocusEvent) => { (children.props.onFocus as ((e: React.FocusEvent) => void) | undefined)?.(e); show(e); },
    onBlur: (e: React.FocusEvent) => { (children.props.onBlur as ((e: React.FocusEvent) => void) | undefined)?.(e); hide(); },
    onMouseDown: (e: React.MouseEvent) => { (children.props.onMouseDown as ((e: React.MouseEvent) => void) | undefined)?.(e); hide(); },
  });
  return (
    <>
      {child}
      {pos ? (
        <div role="tooltip" data-side={side} className="fixed z-[100] max-w-[260px] px-2 py-1 rounded-sm bg-raised text-ink text-xs leading-snug shadow-xl border border-line-strong pointer-events-none" style={{ left: pos.x, top: pos.y, transform: side === "left" ? "translate(-100%, -50%)" : side === "right" ? "translate(0, -50%)" : side === "top" ? "translate(-50%, -100%)" : "translate(-50%, 0)" }}>
          {text}
        </div>
      ) : null}
    </>
  );
}
