'use client'
import { Toaster } from "react-hot-toast";


const ToasterProvider = () => {
	return <Toaster toastOptions={{
		style: {
			backgroundColor: '#fff',
      border: '1px solid #D4D4D4',
      padding: '16px',
      color: '#1e1e1e',
    } 
	}} />;
};

export default ToasterProvider;
