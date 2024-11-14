'use client'
import { Toaster } from "react-hot-toast";


const ToasterProvider = () => {
	return <Toaster toastOptions={{
		style: {
			backgroundColor: '#0a0a0add',
      border: '1px solid #1C1C1C',
			backdropFilter: 'blur(24px)',
      padding: '16px',
      color: '#f5f5f5',
    } 
	}} />;
};

export default ToasterProvider;
