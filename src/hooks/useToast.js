import { useState, useCallback } from "react";

export const useToast = () => {
  const [toast, setToast] = useState(null);

  const showToast = useCallback((message, type = "success", duration = 3000) => {
    setToast({ message, type, id: Date.now() });

    if (duration > 0) {
      setTimeout(() => {
        setToast(null);
      }, duration);
    }
  }, []);

  const closeToast = useCallback(() => {
    setToast(null);
  }, []);

  return { toast, showToast, closeToast };
};
