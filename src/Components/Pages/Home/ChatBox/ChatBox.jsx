// ChatBox.js
import React, { useState, useEffect, useContext, useRef } from 'react';
import { AuthContext } from '../../../Providers/AuthProvider';
import { IoLogoSnapchat } from "react-icons/io";
const ChatBox = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState('');
    const { user, chatMessages, addChatMessage, clearChatMessages } = useContext(AuthContext);
    const chatBoxRef = useRef(null);

    const toggleChat = () => {
        setIsOpen(!isOpen);
    };

    const handleInputChange = (e) => {
        setMessage(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!message.trim()) return; // Do not send empty messages

        const userMessage = { message, sender: 'user' };
        addChatMessage(userMessage); // Store user message in context
        setMessage(''); // Clear the input field after submission

        try {
            const response = await fetch('https://ai-api-for-career-canvas.vercel.app/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            const aiMessage = { message: data.response, sender: 'ai' };
            addChatMessage(aiMessage); // Store AI response in context
        } catch (error) {
            console.error('Error:', error);
            addChatMessage({ message: 'Error communicating with the AI. Please try again.', sender: 'ai' });
        }
    };

    useEffect(() => {
        // Clear messages if the user is not logged in
        if (!user) {
            clearChatMessages(); // Clear messages from context
        }

        // Scroll to the bottom of the chat box whenever new messages are added
        if (chatBoxRef.current) {
            chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
        }
    }, [user, chatMessages]); // Dependency array includes user and chatMessages

    return (
        <div className="fixed bottom-4 right-4 z-50">
            <button 
                onClick={toggleChat} 
                className="bg-green-500 text-white rounded-full p-2 shadow-lg hover:bg-green-600 transition-colors"
            >
                <IoLogoSnapchat className='text-3xl' />
                
            </button>

            {isOpen && (
                <div className="mt-2 w-[22rem] h-[34rem] bg-white rounded-t-3xl shadow-lg p-4">
                    <h3 className="text-lg font-semibold mb-2 text-center text-green-500">Chat AI</h3>
                    <div
                        ref={chatBoxRef}
                        className="flex-grow overflow-y-auto p-4 bg-gray-100 rounded-lg mb-4 h-[23rem]"
                    >
                        {chatMessages.map((msg, index) => (
                            <div
                                key={index}
                                className={`my-2 p-2 text-xl rounded-lg shadow ${msg.sender === 'user' ? 'bg-green-200 text-right' : 'bg-gray-300'}`}
                            >
                                {msg.message}
                            </div>
                        ))}
                    </div>
                    <form onSubmit={handleSubmit}>
                        <textarea
                            className="w-full h-[3rem] p-2 border border-gray-300 rounded-md resize-none"
                            value={message}
                            onChange={handleInputChange}
                            placeholder="Type your message..."
                        />
                        <button 
                            type="submit" 
                            className="mt-2 w-full bg-green-500 text-white rounded-lg py-2 hover:bg-green-600 transition-colors"
                        >
                            Send
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default ChatBox;
