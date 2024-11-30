'use client'

import React from 'react';
import type { UploadProps } from 'antd';
import { Upload } from 'antd';
import { motion } from 'framer-motion';
import { sendProjectFiles } from '@/action/sendProjectFiles';
import { useRouter } from 'next/navigation';
import JSZip from 'jszip';
// import toast from 'react-hot-toast';

const { Dragger } = Upload;




export default function UploadComponent() {

	const router = useRouter();


	const props: UploadProps = {
		name: 'file',
		multiple: true,
		showUploadList: false, // Hide the upload list
		directory: true, // Allow directory upload
		accept: '.txt,.pdf,.doc,.docx,.jpg,.png,.gif,.zip,.rar', // Specify accepted file types
		itemRender: (originNode, file, currFileList) => {
			console.log('originNode', originNode);
			console.log('file', file);
			console.log('currFileList', currFileList);
			return originNode;
		},

		customRequest: async (options) => {
			console.log('options', options);

			const zip = new JSZip();
	 		zip.file((options.file as File).name, options.file as File);

			try {
				const content = await zip.generateAsync({ type: 'blob' });
				const formData = new FormData();
				formData.append('file', content, 'uploaded_files.zip');

				console.log('Uploading file:', options.file );

				const result = await sendProjectFiles(formData);
				console.log('Upload result:', result);

				if (!result.success) {
					console.error('Error:', result.response);

					if (options.onError) {
							options.onError(new Error(result.response), options.file);
					}
					console.log(`Upload failed: ${result.response}`);
			} else {
				if (options.onSuccess) {
						console.log('Success:', result);
						options.onSuccess(result, options.file);
						// toast.success('Files uploaded successfully');
						router.push('/');
				}
			}
	} catch (error) {
			console.error('Error:', error);

			if (options.onError) {
					options.onError(error as Error, options.file);
			}
	}
		},

		onChange(info) {
			const { status } = info.file;
			if (status === 'done') {
					console.log(`${info.file.name} uploaded successfully`);
			} else if (status === 'error') {
					console.log(`${info.file.name} upload failed`);
			}
	},
		onDrop(e) {
			console.log('Dropped files', e.dataTransfer.files);
		},
		capture: undefined,
		hasControlInside: undefined
	};



	
	return (
		<motion.div 
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 1.2, delay: 0.2, ease: "easeIn" }}
			className='w-full aspect-square'
		>

			<Dragger 
				style={{ border: "none" }} 
				className="radial-ellipse-upload" 
				{...props}
			>
				<div className="rotating-background"></div>
				<motion.p
					initial={{ opacity: 0, y: 10 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, delay: 0.4, ease: "easeIn" }}
				className="text-radial-gradient font-poppins">
					Drag & Drop <br /> your project here
				</motion.p>
			</Dragger>
		</motion.div>
	)
}
