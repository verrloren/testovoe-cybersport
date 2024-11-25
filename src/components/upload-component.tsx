'use client'

import React from 'react';
import type { UploadProps } from 'antd';
import { message, Upload } from 'antd';
import { motion } from 'framer-motion';

const { Dragger } = Upload;

const props: UploadProps = {
  name: 'file',
  multiple: true,
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
};

const UploadComponent: React.FC = () => (
  <motion.div 
	initial={{ opacity: 0, y: 0 }}
	animate={{ opacity: 1, y: 0 }}
transition={{ duration: 1.2, delay: 0.2, ease: "easeIn" }}
		className='w-full aspect-square'>
		<Dragger style={{ border: "none" }} className="radial-ellipse-upload" {...props}>
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
);

export default UploadComponent;