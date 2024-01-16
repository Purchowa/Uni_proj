import { useState, useEffect } from 'react';
import { Socket, io } from 'socket.io-client';
import { useNavigate } from 'react-router-dom';

interface Message {
    username: string;
    message: string;
}

export default function Chat() {
    const [username, setUsername] = useState('');
    const [room, setRoom] = useState('');
    const [message, setMessage] = useState('');
    const [messageList, setMessageList] = useState<Message[]>([]);
    const [isJoined, setIsJoined] = useState(false);
    const [socket, setSocket] = useState<Socket | null>(null);

    const navigation = useNavigate();

    useEffect(() => {
        if (isJoined && socket) {
            const handleReceiveMessage = (data: Message) => {
                setMessageList((prevMessages) => [...prevMessages, data]);
            };

            const handleDisconnect = () => {
                console.log('Disconnected from server');
            };

            socket.on('receiveMessage', handleReceiveMessage);
            socket.on('disconnect', handleDisconnect);

            return () => {
                console.log('useEffect Cleanup - Component Will Unmount');

                socket.off('receiveMessage', handleReceiveMessage);
                socket.off('disconnect', handleDisconnect);
            };
        }
    }, [isJoined, socket]);

    const joinRoom = (event: React.FormEvent) => {
        event.preventDefault();
        const newSocket = io('http://localhost:3100');
        newSocket.emit('joinRoom', { username, room });
        setSocket(newSocket);
        setIsJoined(true);
    };

    const sendMessage = async (event: React.FormEvent) => {
        event.preventDefault();
        if (socket) {
            await socket.emit('sendMessage', { username, room, message });
            setMessage('');
        }
    };

    const renderMessage = (msg: Message, index: number) => {
        const isMyMessage = msg.username === username;
        const messageStyle = {
            textAlign: isMyMessage ? 'right' : 'left',
            color: isMyMessage ? 'yellow' : 'green',
        };

        return (
            <li key={index} style={messageStyle}>
                <p>{`${msg.username}: ${msg.message}`}   <span style={{ color: 'gray', fontSize: 10 }}>{getCurrentTime()}</span></p>
            </li >
        );
    };

    const getCurrentTime = () => {
        const currentdate = new Date();
        return `${currentdate.getHours()}:${currentdate.getMinutes()}`;
    };

    const leaveRoom = () => {
        navigation('/');
    }

    return (
        <div style={{ padding: 20 }}>
            <h2>Chat: {isJoined ? room : ""}</h2>
            {isJoined ? (
                <div>
                    <div>
                        <label htmlFor="messageInput">Message:</label>
                        <textarea
                            id="messageInput"
                            placeholder="Type your message"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                        />
                        <button onClick={sendMessage}>Send Message</button>
                        <button onClick={leaveRoom}>Leave room</button>
                    </div>
                    <ul style={{ listStyleType: 'none', padding: 0 }}>
                        {messageList.map((msg, index) => renderMessage(msg, index))}
                    </ul>
                </div>
            ) : (
                <div>
                    <label htmlFor="usernameInput">Your Name:</label>
                    <input
                        type="text"
                        id="usernameInput"
                        placeholder="Enter your name"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <label htmlFor="roomInput">Room:</label>
                    <input
                        type="text"
                        id="roomInput"
                        placeholder="Enter room name"
                        value={room}
                        onChange={(e) => setRoom(e.target.value)}
                    />
                    <button onClick={joinRoom}>Join Room</button>
                </div>
            )}
        </div>
    )
}