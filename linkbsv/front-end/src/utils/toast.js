import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const makeToast = (msg,type,timeOut)=>{
    let message = msg.toString();
    const opt = {
            position: "top-right",
            autoClose: (timeOut)?timeOut : 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: false,
            progress: undefined
        }
    switch(type.toLowerCase()){
        case "warn":
            toast.warn(message,opt);
            break;
        case "error":
            toast.error(message,opt);
            break;
        case "info":
            toast.info(message,opt);
            break;
        default:
            toast(message,opt);
    }
}

export default makeToast;