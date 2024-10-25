// src/Chat.js
import React, { useEffect, useContext, useRef, useState } from 'react';
import { AuthContext } from '../../Providers/AuthProvider';

const Chat = () => {
    const { user, chatMessages, addChatMessage, clearChatMessages } = useContext(AuthContext);

    // Function to parse and format the text
    const parseText = (text) => {
        const lines = text.split('\n');
        return lines.map((line, index) => {
            if (line.startsWith('**')) {
                return <strong key={index}>{line.replace(/\*\*/g, '')}</strong>;
            }
            if (line.startsWith('*')) {
                return <li key={index}>{line.replace(/\*/g, '').trim()}</li>;
            }
            if (line.startsWith('##')) {
                return <h2 key={index}>{line.replace(/## /, '')}</h2>;
            }
            return <p key={index}>{line}</p>;
        });
    };

    const [input, setInput] = useState('');
    const chatBoxRef = useRef(null);
    const [isTextarea, setIsTextarea] = useState(false);

    const sendMessage = async () => {
        if (!input.trim()) return;

        const userMessage = { message: input, sender: 'user' };
        addChatMessage(userMessage); // Store message in context
        setInput('');

        try {
            const response = await fetch('https://ai-api-for-career-canvas.vercel.app/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: input }),
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error('Network response was not ok: ' + errorText);
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
        <div className="w-full md:w-11/12 lg:w-11/12 mt-12 md:mt-18 lg:mt-24 mx-auto bg-white shadow-lg p-4 rounded-lg">
            <h1 className="text-3xl font-bold text-green-800 text-center mb-4">AI Chatbot</h1>
            <div
                ref={chatBoxRef}
                className="min-h-[44rem] overflow-y-auto p-4 bg-gray-100 rounded-lg mb-4"
            >
                {chatMessages.map((msg, index) => (
                    <div
                        key={index}
                        className={`my-2 p-2 text-xl rounded-lg shadow ${msg.sender === 'user' ? 'bg-green-200 text-right' : 'bg-gray-300'}`}
                    >
                        {parseText(msg.message)} {/* Use parseText here */}
                    </div>
                ))}
            </div>
            <div className="w-full flex flex-col">
                {isTextarea ? (
                    <textarea
                        placeholder="Type your message..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        className="flex-1 p-2 text-2xl border border-gray-300 rounded w-full resize-none"
                        rows={4}
                        onKeyDown={(e) => e.key === 'Enter' && e.shiftKey ? (setIsTextarea(true), e.preventDefault()) : null}
                    />
                ) : (
                    <input
                        type="text"
                        placeholder="Type your message..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        className="flex-1 p-2 text-2xl border border-gray-300 rounded w-full"
                        onKeyDown={(e) => e.key === 'Enter' && e.shiftKey ? (setIsTextarea(true), e.preventDefault()) : null}
                    />
                )}
                <button
                    onClick={sendMessage}
                    className="mt-2 p-4 bg-gradient-to-r from-green-500 to-green-700 text-white font-bold rounded-lg shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl"
                >
                    Send
                </button>
            </div>
        </div>
    );
};

export default Chat;
