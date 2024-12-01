'use client';

import type { UploadProps } from 'antd';
import { Upload } from 'antd';
import { Button } from './button';
import { UploadIcon } from '@radix-ui/react-icons';
import { StyleGuideUpload } from '@/lib/types';
import { sendStyleGuide } from '@/action/sendStyleGuide';

interface UploadStyleGuideProps {
	styleGuideId: string;
	// projectId: string;
	codelang_code: string;
}






export function UploadStyleGuide ({ styleGuideId, codelang_code }: UploadStyleGuideProps) {
	

  const props: UploadProps = {
    name: 'file',
    multiple: false,
    showUploadList: false,
    accept: '.txt',
    
    beforeUpload: async (file: File) => {
      try {
        const newFile: StyleGuideUpload = {
          id: styleGuideId,
          name: file.name,
					codelang_code: codelang_code,
          file
        };
				console.log('newFile', newFile);

        const formData = new FormData();
        formData.append('codelang_code', codelang_code);
        formData.append('subject', file.name.substring(0, file.name.lastIndexOf('.')) || file.name);
        formData.append('file', file);

				console.log('before fetch', formData);
				console.log('file:', formData.get('file'))

        // Upload file
        const result = await sendStyleGuide(formData);

				console.log('after fetch', result);


        if (!result.success) {
          throw new Error(result.response);
        }

        console.log('File uploaded successfully:', newFile.name);
      } catch (error) {
        console.error('Upload failed:', error);
        alert(error instanceof Error ? error.message : 'Upload failed');
      }

      return false; // Prevent default upload
    },
  };


	
	return (
		<Upload 
		style={{ zIndex: 50 }}
		{...props}>
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
