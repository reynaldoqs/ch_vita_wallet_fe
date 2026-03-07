import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import styles from "./Modal.module.css";

export interface ModalProps {
	open: boolean;
	onClose: () => void;
	children: React.ReactNode;
	className?: string;
}

const ANIMATION_MS = 200;

export function Modal({ open, onClose, children, className }: ModalProps) {
	const [exiting, setExiting] = useState(false);
	const timeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(
		undefined,
	);
	const prevOpenRef = useRef(open);

	useEffect(() => {
		if (prevOpenRef.current && !open) {
			setExiting(true);
			timeoutRef.current = setTimeout(() => {
				setExiting(false);
			}, ANIMATION_MS);
		}
		prevOpenRef.current = open;
		return () => clearTimeout(timeoutRef.current);
	}, [open]);

	useEffect(() => {
		if (!open && !exiting) return;
		const handleEscape = (e: KeyboardEvent) => {
			if (e.key === "Escape") onClose();
		};
		document.addEventListener("keydown", handleEscape);
		return () => document.removeEventListener("keydown", handleEscape);
	}, [open, exiting, onClose]);

	const visible = open || exiting;

	if (!visible) return null;

	return createPortal(
		<div
			className={`${styles.backdrop} ${!open ? styles.backdropExit : ""}`}
			role="presentation"
		>
			<button
				type="button"
				className={styles.backdropButton}
				onClick={onClose}
				onKeyDown={(e) => {
					if (e.key === " ") e.preventDefault();
					if (e.key === "Enter" || e.key === " ") onClose();
				}}
				aria-label="Close modal"
			/>
			<div
				className={`${styles.content} ${!open ? styles.contentExit : ""} ${className ?? ""}`.trim()}
				onClick={(e) => e.stopPropagation()}
				onKeyDown={(e) => e.stopPropagation()}
				role="dialog"
				aria-modal="true"
			>
				{children}
			</div>
		</div>,
		document.body,
	);
}
