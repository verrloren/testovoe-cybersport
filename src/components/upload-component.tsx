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
		showUploadList: true, // Hide the upload list
		// headers: {
		// 	"Content-Type": "multipart/form-data",
		// 	"API-Key": process.env.BACKEND_API_KEY as string,
		// },
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

	
// 	customRequest: async (options) => {
//     try {
//         if (!options.file || options.file.size === 0) {
//             alert('Cannot upload empty file');
//             return;
//         }

//         const formData = new FormData();
        
//         // Add file
//         formData.append('files', options.file);

//         // Derive subject from filename
//         const fileName = options.file.name;
//         const subject = fileName.substring(0, fileName.lastIndexOf('.')) || fileName;

//         if (!subject.trim()) {
//             alert("File name cannot be empty for subject.");
//             return;
//         }

//         formData.append('subject', subject.trim());

//         console.log('Uploading:', { filename: options.file.name, subject, size: options.file.size });

//         const result = await sendProjectFiles(formData);

//         if (!result.success) {
//             console.error('Upload failed:', result.response);
//             alert(result.response || "Unknown error during upload.");
//             options.onError?.(new Error(result.response || "Upload failed"), options.file);
//             return;
//         }

//         console.log('Upload successful');
//         alert('File uploaded successfully');
//         options.onSuccess?.(result, options.file);
//         router.push('/');
//     } catch (error) {
//         console.error('Error during upload:', error);
//         const errorMessage = error instanceof Error ? error.message : "Upload failed";
//         alert(errorMessage);
//         options.onError?.(error instanceof Error ? error : new Error(errorMessage), options.file);
//     }
// },
// 	customRequest: async (options) => {
//     try {
//         if (!options.file || options.file.size === 0) {
//             alert('Cannot upload empty file');
//             return;
//         }

//         const formData = new FormData();
//         formData.append('files', options.file);
        
//         // Format subject as plain string
//         const subject = String(options.file.name.split('.')[0] || 'untitled').trim();
//         formData.append('subject', subject);

//         console.log('Uploading file:', {
//             name: options.file.name,
//             subject: subject,
//             size: options.file.size
//         });

//         const result = await sendProjectFiles(formData);

//         if (!result?.success) {
//             const error = new Error(String(result?.response || 'Upload failed'));
//             if (options.onError) {
//                 options.onError(error, options.file);
//             }
//             alert(error.message);
//             return;
//         }

//         if (options.onSuccess) {
//             options.onSuccess(result, options.file);
//             alert('File uploaded successfully');
//             router.push('/');
//         }
//     } catch (error) {
//         const errorMessage = error instanceof Error ? error.message : 'Upload failed';
//         alert(errorMessage);
//         if (options.onError) {
//             options.onError(error instanceof Error ? error : new Error(errorMessage), options.file);
//         }
//     }
// },
		



		// action: 'https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload',
		// onChange(info) {
		// 	const { status } = info.file;
		// 	if (status !== 'uploading') {
		// 		console.log(info.file, info.fileList);
		// 	}
		// 	if (status === 'done') {
		// 		message.success(`${info.file.name} file uploaded successfully.`);
		// 	} else if (status === 'error') {
		// 		message.error(`${info.file.name} file upload failed.`);
		// 	}
		// },
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
