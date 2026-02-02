import { X, CheckCircle, AlertCircle, Info } from "lucide-react";

const Toast = ({ message, type = "success", onClose }) => {
  const typeStyles = {
    success: {
      bg: "bg-green-50",
      border: "border-green-200",
      icon: <CheckCircle className="w-5 h-5 text-green-600" />,
      text: "text-green-800",
    },
    error: {
      bg: "bg-red-50",
      border: "border-red-200",
      icon: <AlertCircle className="w-5 h-5 text-red-600" />,
      text: "text-red-800",
    },
    warning: {
      bg: "bg-yellow-50",
      border: "border-yellow-200",
      icon: <AlertCircle className="w-5 h-5 text-yellow-600" />,
      text: "text-yellow-800",
    },
    info: {
      bg: "bg-blue-50",
      border: "border-blue-200",
      icon: <Info className="w-5 h-5 text-blue-600" />,
      text: "text-blue-800",
    },
  };

  const style = typeStyles[type] || typeStyles.success;

  return (
    <div
      className={`fixed bottom-4 right-4 max-w-md ${style.bg} border ${style.border} rounded-xl p-4 flex items-start gap-3 shadow-lg animate-in slide-in-from-bottom-4 duration-300 z-50`}
      role="alert"
    >
      <div className="flex-shrink-0 mt-0.5">{style.icon}</div>
      <p className={`font-montserrat text-sm font-medium ${style.text} flex-1`}>
        {message}
      </p>
      <button
        onClick={onClose}
        className="flex-shrink-0 p-1 hover:bg-white/50 rounded transition-colors"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};

export default Toast;
