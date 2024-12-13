'use client';

import type { UploadProps } from 'antd';
import { Spin, Upload } from 'antd';
import { Button } from '@/components/ui/button';
import { UploadIcon } from '@radix-ui/react-icons';
import { StyleGuideUpload } from '@/lib/types';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSendStyleGuide } from '../use-send-style-guide.tsx';
import { LoadingOutlined } from '@ant-design/icons';
import toast from 'react-hot-toast';

interface UploadStyleGuideProps {
	styleGuideId: number | undefined;
	// projectId: string;
	codelang_code: string;
}






export function UploadStyleGuide ({ styleGuideId, codelang_code }: UploadStyleGuideProps) {
	
	const [loading, setLoading] = useState(false);
	const router = useRouter();
	const { uploadMutation } = useSendStyleGuide();


  const props: UploadProps = {
    name: 'file',
    multiple: false,
    showUploadList: false,
    accept: '.txt',
    
    beforeUpload: async (file: File) => {
      try {
				setLoading(true);
				if(!styleGuideId) return;
        const newFile: StyleGuideUpload = {
          id: styleGuideId,
          name: file.name,
					codelang_code: codelang_code,
          file
        };
        const formData = new FormData();
        formData.append('codelang_code', codelang_code);
        formData.append('subject', file.name.substring(0, file.name.lastIndexOf('.')) || file.name);
        formData.append('file', file);

				console.log('file:', formData.get('file'))

				uploadMutation.mutate({
					file: newFile.file,
					codelang_code: newFile.codelang_code
				});
				toast.success('File uploaded successfully');
      } catch (error) {
        console.error('Upload failed:', error);
        alert(error instanceof Error ? error.message : 'Upload failed');
      } finally {
				setLoading(false);
				router.refresh();
			}

      return false; // Prevent default upload
    },
  };


	
	return (
		<Upload 
		style={{ zIndex: 50 }}
		{...props}>
      <Spin size="large" indicator={<LoadingOutlined spin style={{background: 'white'}} />} spinning={loading} fullscreen />

			<Button
			 className='rounded-full w-12 h-12 flex items-center justify-center
        text-neutral-400 bg-black border border-neutral-800 
        hover:text-neutral-200 hover:border-neutral-200 transition-colors z-50' 
			 >
				<UploadIcon className="w-5 h-5" />
				</Button>
		</Upload>
	)

}
