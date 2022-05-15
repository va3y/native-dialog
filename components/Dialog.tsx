import { useCallback, useEffect, useRef } from "react";
import cn from "classnames";
import { XIcon } from "@heroicons/react/solid";
import { AnimatePresence, motion } from "framer-motion";

interface DialogProps {
	children: React.ReactNode;
	open?: boolean;
	onClose?: () => void;
	persistent?: boolean;
	closeIcon?: boolean;
	unmountWhenHidden?: boolean;
	className?: string;
}

/**
 * A basic idea of how the <dialog /> can work
 * in a React context
 * @param param0
 * @returns
 */
const Dialog: React.FC<DialogProps> = ({
	children,
	open,
	onClose: onClosePropCallback,
	className,
	closeIcon = true,
	persistent = true,
	unmountWhenHidden = true,
}) => {
	const ref = useRef<HTMLDialogElement>(null);
	const onClose = useCallback(() => {
		ref.current && ref.current.close();
		onClosePropCallback && onClosePropCallback();
	}, [onClosePropCallback]);

	useEffect(() => {
		if (open) return;

		onClose();
	}, [open, onClose]);

	useEffect(() => {
		const currRef = ref.current;
		if (!currRef) return;
		if (open && !currRef.open) {
			currRef.showModal();
		}
	}, [open]);

	useEffect(() => {
		if (!open || !ref.current) return;

		const ownerWindow = document.defaultView ?? window;
		const documentElement = ref.current.ownerDocument.documentElement;

		if (!documentElement) return;

		const overflow = documentElement.style.overflow;
		const paddingRight = documentElement.style.paddingRight;

		const scrollbarWidth = ownerWindow.innerWidth - documentElement.clientWidth;

		documentElement.style.overflow = "hidden";
		documentElement.style.paddingRight = `${scrollbarWidth}px`;

		return () => {
			documentElement.style.overflow = overflow;
			documentElement.style.paddingRight = paddingRight;
		};
	}, [open]);

	const onDialogClick = (
		e: React.MouseEvent<HTMLDialogElement, MouseEvent>
	) => {
		if (e.target === ref.current && !persistent) onClose();
	};

	return (
		<AnimatePresence>
			{(!unmountWhenHidden || open) && (
				<motion.dialog
					ref={ref}
					key='modal'
					onClose={onClose}
					onClick={onDialogClick}
					initial={{ opacity: 0, scale: 0.5 }}
					animate={{ opacity: 1, scale: 1 }}
					transition={{ type: "spring", duration: 0.5, bounce: 0.5 }}
					className={"p-0 bg-transparent"}>
					<div
						className={cn("p-4 pt-8 relative rounded-lg bg-white", className)}>
						{closeIcon && (
							<button className='absolute top-2 right-2'>
								<XIcon onClick={onClose} className='w-6 h-6' />
							</button>
						)}
						{children}
					</div>
				</motion.dialog>
			)}
		</AnimatePresence>
	);
};

export default Dialog;
