'use client'
import { Toaster } from "react-hot-toast";


const ToasterProvider = () => {
	return <Toaster toastOptions={{
		style: {
			backgroundColor: '#000',
      border: '1px solid #262626',
      padding: '16px',
      color: '#f7f7f7',
			borderRadius: '16px',
    } 
	}} />;
};

export default ToasterProvider;
