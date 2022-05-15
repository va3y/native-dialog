import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useRef, useState } from "react";
import { XIcon } from "@heroicons/react/solid";
import Dialog from "../components/Dialog";
import { AnimatePresence, motion } from "framer-motion";

const Home: NextPage = () => {
	const dialogRef = useRef<HTMLDialogElement>(null);
	const onOpenDialog = () => {
		if (!dialogRef.current) return;
		dialogRef.current.showModal();
	};

	const onCloseDialog = () => {
		if (!dialogRef.current) return;
		dialogRef.current.close();
	};
	const [dialogComponentOpen, setDialogComponentOpen] = useState(false);

	return (
		<div className='mt-14 flex flex-col items-center justify-center'>
			<button onClick={onOpenDialog} className='p-2'>
				Open dialog
			</button>
			<dialog ref={dialogRef}>
				<button onClick={onCloseDialog} className='mb-5'>
					<XIcon className='w-8 h-8' />
				</button>
				hello
			</dialog>

			<div className='bg-stone-200 mt-4 p-10 rounded'>
				<h2>A dialog component example</h2>
				<button
					onClick={() => {
						setDialogComponentOpen(true);
					}}
					className='bg-stone-600 text-stone-50 rounded mt-4 p-4 block'>
					Open Dialog component
				</button>
				<Dialog
					open={dialogComponentOpen}
					onClose={() => setDialogComponentOpen(false)}>
					<AnimatePresence>
						<div
						// initial={{ opacity: 0 }}
						// animate={{ opacity: 1 }}
						// exit={{ opacity: 0 }}
						// transition={{ duration: 1, ease: "easeInOut" }}
						>
							this is some Dialog content
							<button
								onClick={() => setDialogComponentOpen(false)}
								className='bg-stone-600 text-stone-50 rounded mt-4 p-4 block'>
								Close Dialog component
							</button>
						</div>
					</AnimatePresence>
				</Dialog>
			</div>
		</div>
	);
};

export default Home;
