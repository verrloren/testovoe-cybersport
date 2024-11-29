import type { UploadProps } from 'antd';
import { Upload } from 'antd';
import { Button } from './button';
import { UploadIcon } from '@radix-ui/react-icons';


const props: UploadProps = {
  name: 'file',
  onChange(info) {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      console.log(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
			console.log(`${info.file.name} file upload failed.`);
    }
  },
};

export const UploadStyleGuide: React.FC = () => (
  <Upload 
	className='upload-style-guide'
	{...props}>
    <Button
		 className='text-neutral-400 bg-neutral-950 cursor-pointer hover:text-neutral-200 transition-colors 
		 font-poppins font-light text-sm bg-transparent border-none text-start hover:bg-transparent
		items-center justify-start gap-x-1 pl-2 w-full' 
		 >
			<UploadIcon />
			Click to upload
			</Button>
  </Upload>
);
