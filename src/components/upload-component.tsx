'use client'

import React from 'react';
import type { UploadProps } from 'antd';
import { message, Upload } from 'antd';
import { motion } from 'framer-motion';
import { sendProjectFiles } from '@/action/sendProjectFiles';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import JSZip from 'jszip';

const { Dragger } = Upload;




export default function UploadComponent() {

	const router = useRouter();


	const props: UploadProps = {
		name: 'file',
		multiple: true,
		method: 'POST',
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

			// const formData = new FormData();
			// formData.append('file', options.file as File);


			try {
				const content = await zip.generateAsync({ type: 'blob' });
				const formData = new FormData();
				formData.append('file', content, 'uploaded_files.zip');

				const result = await sendProjectFiles(formData);

				if (result.error) {
					console.error('Error:', result.error);

					if (options.onError) {
						options.onError(new Error(result.error), options.file);
					}

				} else {

					console.log('Success:', result);


					if (options.onSuccess) {
						options.onSuccess(result, options.file);



						toast.success('Files uploaded successfully');
						router.push('/projects');
					}
				}

			} catch (error) {
				console.error('Error:', error);

				if (options.onError) {
					options.onError(error as Error, options.file);
				}
			}
		},

		action: 'https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload',
		onChange(info) {
			const { status } = info.file;
			if (status !== 'uploading') {
				console.log(info.file, info.fileList);
			}
			if (status === 'done') {
				message.success(`${info.file.name} file uploaded successfully.`);
			} else if (status === 'error') {
				message.error(`${info.file.name} file upload failed.`);
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
			initial={{ opacity: 0, y: 0 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 1.2, delay: 0.2, ease: "easeIn" }}
			className='w-full aspect-square'
		>

			<Dragger 
				style={{ border: "none" }} 
				className="radial-ellipse-upload" 
				{...props}
			>
				<div className="rotating-background"></div>
				{/* <p className="ant-upload-drag-icon text-radial-gradient">
					<InboxOutlined className='text-radial-gradient' />
				</p> */}
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
