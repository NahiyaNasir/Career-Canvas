import { useState } from 'react';

const UserChat = () => {
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [messages, setMessages] = useState([
        { type: 'user', text: 'Hello' },
        { type: 'bot', text: 'This is a response from the chatbot.' },
        { type: 'user', text: 'This is an example of a chat' },
        { type: 'bot', text: 'This is a response from the chatbot.' },
    ]);
    const [userInput, setUserInput] = useState('');

    
    const toggleChatbox = () => {
        setIsChatOpen(!isChatOpen);
    };

    const handleSendMessage = () => {
        if (userInput.trim() === '') return;

        const newMessages = [...messages, { type: 'user', text: userInput }];
        setMessages(newMessages);
        setUserInput('');

        // Simulate a bot response after a delay
        setTimeout(() => {
            setMessages((prevMessages) => [
                ...prevMessages,
                { type: 'bot', text: 'Hello Rakib Vhai !' },
            ]);
        }, 500);
    };

    const handleInputChange = (e) => {
        setUserInput(e.target.value);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') handleSendMessage();
    };

    return (
        <div>
            {/* Toggle chat button */}
            <div className="fixed bottom-0 right-0  mb-4 mr-4">
                <button
                    onClick={toggleChatbox}
                    className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-700 transition duration-300 flex items-center"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-6 h-6 mr-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                        ></path>
                    </svg>
                    Chat with Admin Bot
                </button>
            </div>

            {/* Chat container */}
            {isChatOpen && (
                <div className="fixed z-10 bottom-16 right-4 w-96">
                    <div className="bg-white shadow-md rounded-lg max-w-lg w-full">
                        <div className="p-4 border-b bg-green-500 text-white rounded-t-lg flex justify-between items-center">
                            <p className="text-lg font-semibold">Admin Bot</p>
                            <button
                                onClick={toggleChatbox}
                                className="text-gray-300 hover:text-gray-400 focus:outline-none"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-6 h-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    ></path>
                                </svg>
                            </button>
                        </div>

                        {/* Chatbox messages */}
                        <div className="p-4 h-80 overflow-y-auto">
                            {messages.map((message, index) => (
                                <div
                                    key={index}
                                    className={`mb-2 ${message.type === 'user' ? 'text-right' : ''}`}
                                >
                                    <p
                                        className={`${message.type === 'user'
                                                ? 'bg-green-500 text-white'
                                                : 'bg-gray-200 text-gray-700'
                                            } rounded-lg py-2 px-4 inline-block`}
                                    >
                                        {message.text}
                                    </p>
                                </div>
                            ))}
                        </div>

                        {/* Input box and send button */}
                        <div className="p-4 border-t flex">
                            <input
                                type="text"
                                value={userInput}
                                onChange={handleInputChange}
                                onKeyPress={handleKeyPress}
                                placeholder="Type a message"
                                className="w-full px-3 py-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-green-500"
                            />
                            <button
                                onClick={handleSendMessage}
                                className="bg-green-500 text-white px-4 py-2 rounded-r-md hover:bg-green-600 transition duration-300"
                            >
                                Send
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserChat;
