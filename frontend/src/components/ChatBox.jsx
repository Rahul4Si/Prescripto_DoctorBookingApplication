import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { BASE_URL } from "../config/apiConfig";

const ChatBox = () => {
  const [chatConversation, setChatConversation] = useState([
    "How may I help you?",
  ]);
  const [chatMessages, setChatMessages] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef(null);

  // Scroll to bottom when messages update
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [chatConversation]); // Runs whenever a new message is added

  const handleChange = (e) => {
    setChatMessages(e.target.value);
  };

  const handleSendMessages = async () => {
    if (!chatMessages.trim()) return; // Prevent sending empty messages

    // Append user's message to the chat conversation
    setChatConversation((prev) => [...prev, chatMessages]);
    setChatMessages(""); // Clear input field

    try {
      const response = await axios.post(`${BASE_URL}/api/user/getAIResponse`,{ message: chatMessages });

      // Append AI's response to the chat conversation
      const aiMessage = response.data.choices[0]?.message?.content || "No response";
      setChatConversation((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.log(
        "Error from GROQ API:",
        error.response?.data || error.message
      );
      setChatConversation((prev) => [...prev, "Error: Unable to fetch response"]);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="bg-blue-600 text-white p-4 rounded-t-lg">
        <h3 className="text-lg font-semibold">Your AI Assistant</h3>
      </div>

      {/* Chat Messages Container */}
      <div
        id="chat_box_body"
        ref={scrollRef} // Attach ref for auto-scrolling
        className="flex-1 overflow-y-auto p-4 bg-gray-100"
      >
        <div id="chat_messages">
          {chatConversation.map((msg, index) => (
            <div key={index} className="p-2 flex flex-col">
              <div
                className={`flex space-x-2 ${
                  index % 2 === 0 ? "justify-start" : "justify-end"
                }`}
              >
                {index % 2 === 0 ? (
                  <img
                    className="w-8 h-8"
                    src="https://www.seekpng.com/png/detail/450-4501964_doctor-icon-png-clipart-physician-computer-icons-clip.png"
                    alt="doctor_Photo"
                  />
                ) : (
                  <img
                    className="w-8 h-8"
                    src="https://th.bing.com/th/id/OIP.zxK6GXMLrEW4sua6g66fugHaKJ?rs=1&pid=ImgDetMain"
                    alt="user_Photo"
                  />
                )}
                <div className="bg-blue-600 text-white p-2 rounded-lg">
                  {msg}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Typing Indicator */}
      {isTyping && (
        <motion.div
          id="typing"
          className="p-2 text-gray-500 text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center">
            <span className="animate-pulse">•</span>{" "}
            <span className="animate-pulse">•</span>{" "}
            <span className="animate-pulse">•</span>{" "}
            <span className="ml-2">Someone is typing...</span>
          </div>
        </motion.div>
      )}

      {/* Input Area */}
      <div className="flex items-center p-4 bg-white rounded-b-lg">
        <textarea
          id="chat_input"
          placeholder="Enter your message here..."
          onChange={handleChange}
          onFocus={() => setIsTyping(true)}
          onBlur={() => setIsTyping(false)}
          value={chatMessages}
          className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          id="send"
          onClick={handleSendMessages}
          className="ml-2 p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <svg style={{ width: 24, height: 24 }} viewBox="0 0 24 24">
            <path fill="#ffffff" d="M2,21L23,12L2,3V10L17,12L2,14V21Z" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ChatBox;
