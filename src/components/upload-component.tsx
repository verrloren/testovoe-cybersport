'use client'

import React from 'react';
import { InboxOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';
import { message, Upload } from 'antd';

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
  <Dragger style={{ border: "none" }} className="radial-ellipse-upload" {...props}>
    <div className="rotating-background"></div>
    <p className="ant-upload-drag-icon">
      <InboxOutlined style={{ color: "#E5E5E5" }} />
    </p>
    <p className="text-neutral-200 font-poppins">
      Drag & Drop <br /> your project here
    </p>
  </Dragger>
);

export default UploadComponent;