import { createContext, type ReactNode } from "react";
import { ToastContainer, toast, type ToastOptions } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Context value type
interface AppContextType {
  showToast: (
    message: string,
    type?: "warn" | "success" | "error" | "info" | "default"
  ) => void;
}

// Props for provider
interface ContextAppProps {
  children: ReactNode;
}

// eslint-disable-next-line react-refresh/only-export-components
export const AppContext = createContext<AppContextType | undefined>(undefined);

const defaultToastOptions: ToastOptions = {
  position: "bottom-right",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "colored",
};

export default function ContextApp({ children }: ContextAppProps) {
  // Toast Function
  const showToast = (
    message: string,
    type: "warn" | "success" | "error" | "info" | "default" = "default"
  ) => {
    switch (type) {
      case "warn":
        toast.warn(message, defaultToastOptions);
        break;
      case "success":
        toast.success(message, defaultToastOptions);
        break;
      case "error":
        toast.error(message, defaultToastOptions);
        break;
      case "info":
        toast.info(message, defaultToastOptions);
        break;
      default:
        toast(message, defaultToastOptions);
        break;
    }
  };

  return (
    <AppContext.Provider value={{ showToast }}>
      <ToastContainer />
      {children}
    </AppContext.Provider>
  );
}