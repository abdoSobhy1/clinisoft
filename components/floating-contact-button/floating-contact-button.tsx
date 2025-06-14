'use client';
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X } from "lucide-react";
import ContactOption from "./contact-option";

const contactOptions = [
  {
    icon: "/images/icons/messenger.svg",
    label: "Messenger",
    link: "https://m.me/CliniSoft",
    bgColor: "bg-blue-500",
  },
  {
    icon: "/images/icons/whatsapp.svg",
    label: "WhatsApp",
    link: "https://wa.me/+201204698888",
    bgColor: "bg-green-500",
  },
  {
    icon: "/images/icons/phone-call.svg",
    label: "Call",
    link: "tel:+201204698888",
    bgColor: "bg-emerald-500",
  },
  {
    icon: "/images/icons/mail.svg",
    label: "Email",
    link: "mailto:info@clinisoft.com.eg",
    bgColor: "bg-red-500",
  },
  {
    icon: "/images/icons/demo.svg",
    label: "Request a Demo",
    link: "/request-a-demo",
    bgColor: "bg-maroon",
  },

];

const itemVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.8 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: i * 0.05,
      type: "spring",
      stiffness: 200,
    },
  }),
  exit: {
    opacity: 0,
    y: 20,
    scale: 0.8,
    transition: { duration: 0.2, },
  },
};

const FloatingContactButton = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col-reverse items-end space-y-2">
      <AnimatePresence mode="wait">
        {open &&
          contactOptions.map((option, index) => (
            <motion.div
              key={option.label}
              initial="hidden"
              animate="visible"
              exit="exit"
              custom={index}
              variants={itemVariants}
            >
              <ContactOption {...option} />
            </motion.div>
          ))}
      </AnimatePresence>

      <motion.button
        onClick={() => setOpen(!open)}
        className="w-14 h-14 rounded-full bg-teal-600 flex items-center justify-center text-white shadow-lg hover:scale-110 transition-transform -order-1 outline-0"
        whileTap={{ scale: 0.9 }}
        animate={{ scale: open ? [1] : [1, 0.85, 1] }}
        transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={open ? 'x' : 'message'}
            initial={{ rotate: 180, scale: 0.6, opacity: 0 }}
            animate={{ rotate: 0, scale: 1, opacity: 1 }}
            exit={{ rotate: -180, scale: 0.6, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {open ? <X size={24} /> : <MessageSquare size={24} />}
          </motion.span>
        </AnimatePresence>
      </motion.button>
    </div>
  );
};

export default FloatingContactButton;
