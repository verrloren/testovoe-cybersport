'use client'

import { useState } from 'react';
import type { UploadProps } from 'antd';
import { Spin, Upload } from 'antd';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import JSZip from 'jszip';
import { useProjectsStore } from '@/modules/projects/projects-store';

const { Dragger } = Upload;




export default function UploadComponent() {

	
	const router = useRouter();
	const [loading, setLoading] = useState(false);
	const setSelectedProject = useProjectsStore((state) => state.setSelectedProject);

	const props: UploadProps = {
		name: 'file',
		multiple: true,
    showUploadList: false,
		directory: true, // Allow directory upload
		// accept: '.zip',
		accept: '.txt,.pdf,.doc,.docx,.jpg,.png,.gif,.zip,.rar,.js,.jsx,.ts,.tsx,.vue,.html,.css,.scss,.json,.htm,.sasss,.less,.svg,.md,.mdx,.yaml,.yml,.env,.babelrc,.exlintrc,.prettierrc,.packege.json,.package-lock.json,.yarn.lock,.pdf,.doc,.docx,.lockb,.py,.cs,.csproj,.cshtml,.sln,.DotSettings,.cshtml,.prettierrc,.svg,.rst,.cfg,.lock,.',




		
			// try {
			// 	const file = options.file as File;
			// 	const formData = new FormData();
				
			// 	// Check if file is already zipped
			// 	const isZipFile = file.name.toLowerCase().endsWith('.zip');
		
			// 	if (isZipFile) {
			// 		// If already zipped, send as is
			// 		formData.append('file', file, file.name);
			// 		console.log('File is already zipped, sending as is:', file.name);
			// 	} else {
			// 		// If not zipped, create zip file
			// 		const zip = new JSZip();
			// 		zip.file(file.name, file);
			// 		const content = await zip.generateAsync({ type: 'blob' });
			// 		formData.append('file', content, 'uploaded_files.zip');
			// 		console.log('Created zip file for:', file.name);
			// 	}
		
			// 	console.log('Uploading file:', options.file);
			// 	const result = await sendProjectFiles(formData);
			// 	console.log('Upload result:', result);
		
			// 	if (!result.success) {
			// 		console.error('Error:', result.response);
			// 		if (options.onError) {
			// 			options.onError(new Error(result.response), options.file);
			// 		}
			// 		console.log(`Upload failed: ${result.response}`);
			// 	} else {
			// 		if (options.onSuccess) {
						
			// 			console.log('Success:', result);

			// 			const newProject = result.response;
			// 			setSelectedProject(newProject);
			// 			console.log('Selected Project:', selectedProject);

			// 			options.onSuccess(result, options.file);
			// 			router.push('/');
			// 		}
			// 	}
			//woking
			// try {
			// 	const file = options.file as File;
			// 	const formData = new FormData();
				
			// 	const isZipFile = file.name.toLowerCase().endsWith('.zip');
		
			// 	if (isZipFile) {
			// 		formData.append('file', file, file.name);
			// 	} else {
			// 		const zip = new JSZip();
			// 		zip.file(file.name, file);
			// 		const content = await zip.generateAsync({ type: 'blob' });
			// 		formData.append('file', content, 'uploaded_files.zip');
			// 	}
		
			// 	// const result = await sendProjectFiles(formData);

			// 	const result = await fetch('/api/upload', {
			// 		method: 'POST',
			// 		body: formData
			// 	}).then(res => res.json()).catch(error => {
			// 		console.error('Error:', error);
			// 		return { success: false, response: error };
			// 	});
		
			// 	if (result.success) {
			// 		const newProject = result.response;
			// 		setSelectedProject(newProject);
			// 		if (options.onSuccess) {
			// 			options.onSuccess(result, options.file);
			// 		}
			// 		router.push('/');
			// 	} else {
			// 		console.error('Upload failed:', result.response);
			// 		options.onError?.(new Error(result.response), options.file);
			// 	}
			// } catch (error) {
			// 	console.error('Error:', error);
			// 	options.onError?.(error as Error, options.file);
			// } finally {
			// 	setLoading(false);
			// }


			customRequest: async (options) => {
				setLoading(true);
				
				try {
					const file = options.file as File;
					const formData = new FormData();
					
					const zip = new JSZip();
					zip.file(file.name, file);
					const content = await zip.generateAsync({ 
						type: 'blob',
						compression: 'DEFLATE',
						compressionOptions: { level: 9 }
					});
					formData.append('file', content, 'uploaded_files.zip');
			
					const response = await fetch('/api/upload', {
						method: 'POST',
						body: formData
					});
			
					if (!response.ok) {
						throw new Error(`Upload failed: ${response.statusText}`);
					}
			
					const result = await response.json();
			
					if (result.success) {
						const newProject = result.response;
						setSelectedProject(newProject);
						if (options.onSuccess) {
							options.onSuccess(result, options.file);
						}
						router.push('/');
					} else {
						throw new Error(result.response);
					}
				} catch (error) {
					console.error('Upload error:', error);
					options.onError?.(error as Error, options.file);
				} finally {
					setLoading(false);
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

      <Spin spinning={loading} fullscreen />

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
