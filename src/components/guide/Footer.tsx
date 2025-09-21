import { Send } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="mt-2 mb-8 text-center text-sm text-gray-500">
      <p className="text-gray-900 font-bold">© Commenta</p>
      <div className="w-full flex justify-center items-center gap-1 text-gray-800 mt-3">
        <Send size={14} />
        <p>contact: ansmeer008@gmail.com</p>
      </div>
    </footer>
  );
};
