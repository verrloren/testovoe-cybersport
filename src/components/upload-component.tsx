// 'use client'

// import { useState } from 'react';
// import { motion } from 'framer-motion';
// import { useRouter } from 'next/navigation';
// import JSZip from 'jszip';
// import { useProjectsStore } from '@/modules/projects/projects-store';
// import toast from 'react-hot-toast';
// import { sendProjectFiles } from '@/modules/projects/sendProjectFiles';

// const { Dragger } = Upload;

// export default function UploadComponent() {

	
// 	const router = useRouter();
// 	const [loading, setLoading] = useState(false);
	// const setSelectedProject = useProjectsStore((state) => state.setSelectedProject);

	//GPT

// 	const handleUpload = async (fileList: File[]) => {
// 		setLoading(true);
// 		try {
// 				const formData = new FormData();
// 				const zip = new JSZip();

// 				// Check if multiple files or folders are uploaded
// 				if (fileList.length > 1) {
// 						console.log('Multiple files detected, zipping all files...');
// 						fileList.forEach((file) => {
// 								const filePath = (file as any).webkitRelativePath || file.name;
// 								zip.file(filePath, file);
// 						});
// 				} else {
// 						const file = fileList[0];
// 						const isZipFile = file.name.toLowerCase().endsWith('.zip');
// 						if (isZipFile) {
// 								// Single zip file, send as is
// 								console.log('Single zip file detected, sending as is:', file.name);
// 								formData.append('file', file, file.name);
// 						} else {
// 								// Single file, add to zip
// 								console.log('Single file detected, zipping...');
// 								zip.file(file.name, file);
// 						}
// 				}

// 				// Generate zip if needed
// 				if (fileList.length > 1 || !fileList[0].name.toLowerCase().endsWith('.zip')) {
// 						const zipContent = await zip.generateAsync({ type: 'blob' });
// 						formData.append('file', zipContent, 'uploaded_files.zip');
// 				}

// 				// Send the file(s)
// 				const result = await sendProjectFiles(formData);
// 				if (result.success) {
// 						toast.success('File uploaded successfully');
// 						setSelectedProject(result.response);
// 						router.push('/');
// 				} else {
// 						toast.error('Upload failed');
// 						console.error(result.response);
// 				}
// 		} catch (error) {
// 				console.error('Error:', error);
// 				toast.error('An error occurred during the upload');
// 		} finally {
// 				setLoading(false);
// 		}
// };



	// const props: UploadProps = {
	// 	name: 'file',
	// 	multiple: true,
  //   showUploadList: false,
	// 	directory: true, // Allow directory upload
		// accept: '.zip',
		// accept: '.txt,.pdf,.doc,.docx,.jpg,.png,.gif,.zip,.rar,.js,.jsx,.ts,.tsx,.vue,.html,.css,.scss,.json,.htm,.sasss,.less,.svg,.md,.mdx,.yaml,.yml,.env,.babelrc,.exlintrc,.prettierrc,.packege.json,.package-lock.json,.yarn.lock,.pdf,.doc,.docx,.lockb,.py,.cs,.csproj,.cshtml,.sln,.DotSettings,.cshtml,.prettierrc,.svg,.rst,.cfg,.lock,.',


		// customRequest: async (options) => {
    //   setLoading(true);

    //   try {
    //     const file = options.file as File;
    //     const formData = new FormData();

    //     // Check if the uploaded item is a zip file
    //     const isZipFile = file.name.toLowerCase().endsWith('.zip');

    //     if (isZipFile) {
    //       // Send zip file as is
    //       formData.append('file', file, file.name);
    //       console.log('File is already zipped, sending as is:', file.name);
    //     } else if ((file as any).webkitRelativePath) {
    //       // If the item is a folder
    //       const zip = new JSZip();
    //       const files = options.fileList as File[];

    //       for (const item of files) {
    //         zip.file((item as any).webkitRelativePath, item);
    //       }

    //       const content = await zip.generateAsync({ type: 'blob' });
    //       formData.append('file', content, 'uploaded_folder.zip');
    //       console.log('Zipped folder and prepared for upload.');
    //     } else if (options.fileList && options.fileList.length > 1) {
    //       // If multiple files are uploaded
    //       const zip = new JSZip();
    //       const files = options.fileList as File[];

    //       files.forEach((file) => {
    //         zip.file(file.name, file);
    //       });

    //       const content = await zip.generateAsync({ type: 'blob' });
    //       formData.append('file', content, 'uploaded_files.zip');
    //       console.log('Zipped multiple files and prepared for upload.');
    //     } else {
    //       // Single file that's not zipped
    //       const zip = new JSZip();
    //       zip.file(file.name, file);
    //       const content = await zip.generateAsync({ type: 'blob' });
    //       formData.append('file', content, 'uploaded_file.zip');
    //       console.log('Created zip for single file:', file.name);
    //     }

    //     // Upload the prepared formData
    //     console.log('Uploading file:', options.file);
    //     const result = await sendProjectFiles(formData);
    //     console.log('Upload result:', result);

    //     if (!result.success) {
    //       console.error('Error:', result.response);
    //       if (options.onError) {
    //         options.onError(new Error(result.response), options.file);
    //       }
    //       toast.error(`Upload failed: ${result.response}`);
    //     } else {
    //       if (options.onSuccess) {
    //         console.log('Success:', result);
    //         toast.success('File uploaded successfully');
    //         const newProject = result.response;
    //         setSelectedProject(newProject);
    //         options.onSuccess(result, options.file);
    //         router.push('/');
    //       }
    //     }
    //   } catch (error) {
    //     console.error('Error:', error);
    //     if (options.onError) {
    //       options.onError(error as Error, options.file);
    //     }
    //     toast.error('An error occurred during upload.');
    //   } finally {
    //     setLoading(false);
    //   }
    // },

		//last workign 
	// 	customRequest: async (options) => {
	// 		setLoading(true);
	// 		try {
	// 			const file = options.file as File;
	// 			const formData = new FormData();
				
	// 			// Check if file is already zipped
	// 			const isZipFile = file.name.toLowerCase().endsWith('.zip');
		
	// 			if (isZipFile) {
	// 				// If already zipped, send as is
	// 				formData.append('file', file, file.name);
	// 				console.log('File is already zipped, sending as is:', file.name);
	// 			} else {
	// 				// If not zipped, create zip file
	// 				const zip = new JSZip();
	// 				zip.file(file.name, file);
	// 				const content = await zip.generateAsync({ type: 'blob' });
	// 				formData.append('file', content, 'uploaded_files.zip');
	// 				console.log('Created zip file for:', file.name);
	// 			}
		
	// 			console.log('Uploading file:', options.file);
	// 			const result = await sendProjectFiles(formData);
	// 			console.log('Upload result:', result);
		
	// 			if (!result.success) {
	// 				console.error('Error:', result.response);
	// 				if (options.onError) {
	// 					options.onError(new Error(result.response), options.file);
	// 				}
	// 				console.log(`Upload failed: ${result.response}`);
	// 			} else {
	// 				if (options.onSuccess) {
						
	// 					console.log('Success:', result);
	// 					toast.success('File uploaded successfully');
	// 					const newProject = result.response;
	// 					setSelectedProject(newProject);

	// 					options.onSuccess(result, options.file);
	// 					router.push('/');
	// 				}
	// 			}
	// 	} catch (error) {
	// 		console.error('Error:', error);
	// 		if (options.onError) {
	// 			options.onError(error as Error, options.file);
	// 		}
	// 	} finally {
	// 		setLoading(false);
	// 	}
	// },

	
	// customRequest: async () => {
	// 	setLoading(true);
	// 	try {
	// 		await new Promise(resolve => setTimeout(resolve, 60000));
	// 		router.push('/');
	// 	} finally {
	// 		toast.success('File uploaded successfully');
	// 		setLoading(false);
	// 	}
	// },



			//woking
		// 	customRequest: async (options) => {
		// 	setLoading(true);
		// 	try {
		// 		const file = options.file as File;
		// 		const formData = new FormData();
				
		// 		const isZipFile = file.name.toLowerCase().endsWith('.zip');
		
		// 		if (isZipFile) {
		// 			formData.append('file', file, file.name);
		// 		} else {
		// 			const zip = new JSZip();
		// 			zip.file(file.name, file);
		// 			const content = await zip.generateAsync({ type: 'blob' });
		// 			formData.append('file', content, 'uploaded_files.zip');
		// 		}
		
		// 		// const result = await sendProjectFiles(formData);
		// 		console.log('fetch started:', formData);
		// 		const result = await fetch('/api/upload', {
		// 			method: 'POST',
		// 			body: formData
		// 		})
		// 		const resultJson = await result.json();
		// 		if (resultJson.success) {
		// 			console.log('Upload success:', resultJson.response);
		// 			const newProject = resultJson.response;
		// 			setSelectedProject(newProject);
		// 			if (options.onSuccess) {
		// 				options.onSuccess(resultJson, options.file);
		// 			}
		// 			router.push('/');
		// 		} else {	
		// 			console.error('Upload failed:', resultJson.response);
		// 			options.onError?.(new Error(resultJson.response), options.file);
		// 		}
		// 	} catch (error) {
		// 		console.error('Error:', error);
		// 		options.onError?.(error as Error, options.file);
		// 	} finally {
		// 		setLoading(false);
		// 	}
		// },




			// LAST
			// customRequest: async (options) => {
			// 	setLoading(true);

			// 	try {
			// 		const file = options.file as File;
			// 		const formData = new FormData();
					
			// 		const zip = new JSZip();
			// 		zip.file(file.name, file);
			// 		const content = await zip.generateAsync({ 
			// 			type: 'blob',
			// 			compression: 'DEFLATE',
			// 			compressionOptions: { level: 9 }
			// 		});
			// 		formData.append('file', content, 'uploaded_files.zip');
			
			// 		const response = await fetch('/api/upload', {
			// 			method: 'POST',
			// 			body: formData
			// 		});
			
			// 		if (!response.ok) {
			// 			throw new Error(`Upload failed: ${response.statusText}`);
			// 		}
			
			// 		const result = await response.json();
			
			// 		if (result.success) {
			// 			const newProject = result.response;
			// 			setSelectedProject(newProject);
			// 			if (options.onSuccess) {
			// 				options.onSuccess(result, options.file);
			// 			}
			// 			router.push('/');
			// 		} else {
			// 			throw new Error(result.response);
			// 		}
			// 	} catch (error) {
			// 		console.error('Upload error:', error);
			// 		options.onError?.(error as Error, options.file);
			// 	} finally {
			// 		setLoading(false);
			// 	}
			// },


		// 	customRequest: async (options: any) => {
		// 		// Convert single file to array for processing
		// 		await handleUpload([options.file]);
		// },



// 		onChange(info) {
// 			const { status } = info.file;
// 			if (status === 'done') {
// 					console.log(`${info.file.name} uploaded successfully`);
// 			} else if (status === 'error') {
// 					console.log(`${info.file.name} upload failed`);
// 			}
// 	},
// 		onDrop(e) {
// 			console.log('Dropped files', e.dataTransfer.files);
// 		},
// 		capture: undefined,
// 		hasControlInside: undefined
// 	};



	
// 	return (
// 		<motion.div 
// 			initial={{ opacity: 0 }}
// 			animate={{ opacity: 1 }}
// 			transition={{ duration: 1.2, delay: 0.2, ease: "easeIn" }}
// 			className='w-full aspect-square'
// 		>

// 			<Spin indicator={<LoadingOutlined spin />} size="large" spinning={loading} fullscreen />

// 			<Dragger 
// 				style={{ border: "none" }} 
// 				className="radial-ellipse-upload" 
// 				{...props}
// 			>
// 				<div className="rotating-background"></div>
// 				<motion.p
// 					initial={{ opacity: 0, y: 10 }}
// 					animate={{ opacity: 1, y: 0 }}
// 					transition={{ duration: 0.6, delay: 0.4, ease: "easeIn" }}
// 				className="text-radial-gradient text-lg font-poppins">
// 					Drag & Drop <br /> your project here
// 				</motion.p>
// 			</Dragger>
// 		</motion.div>
// 	)
// }
