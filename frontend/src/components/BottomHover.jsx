
import React from "react";
import { GoMoveToTop } from "react-icons/go";
import { IoMdChatbubbles } from "react-icons/io";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { motion } from "framer-motion";
import { IoIosCloseCircle } from "react-icons/io";
import ChatBox from "./ChatBox";

const BottomHover = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <>
      <div className="fixed flex flex-col space-y-2 bottom-5 right-5 z-30">
        <Tooltip title="Go To Top" placement="top" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} >
          <IconButton sx={{ bgcolor: 'primary.main', color: 'primary.contrastText', p: 2, '&:hover': { bgcolor: 'primary.main', color: 'primary.contrastText' } }}>
            <GoMoveToTop className="w-5 h-5" />
          </IconButton>
        </Tooltip>
        <Tooltip title="Ask AI Assistant" placement="top" onClick={() => setIsOpen(true)}>
          <IconButton sx={{ bgcolor: 'primary.main', color: 'primary.contrastText', p: 2, '&:hover': { bgcolor: 'primary.main', color: 'primary.contrastText' } }}>
            <IoMdChatbubbles className="w-5 h-5" />
          </IconButton>
        </Tooltip>

        {isOpen && (
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed bottom-0 right-0 w-1/2 md:w-1/3 h-full shadow-lg p-5 z-50 bg-blue-100"
        >
         <ChatBox/>
          <button className="absolute top-7 right-7" onClick={() => setIsOpen(false)}>
            <IoIosCloseCircle className="w-10 h-10 text-white" />
          </button>
        </motion.div>
      )}
      </div>
    </>
  );
};

export default BottomHover;