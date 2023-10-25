import { useEffect, useState } from 'react';
import ChatBot from 'react-simple-chatbot';
import axios from "axios";

export const Chatbox = () => {
    const [msg, setMsg] = useState([]);
    const [usermsg, setUserMsg] = useState([]);


    useEffect(() => {
        axios.get("http://localhost:8080/", usermsg).then((response) => {
            setMsg(response.data);
            console.log(msg);
        });
    }, []);
  
const steps = [
    {
        id: '0',
        message: { msg },
        trigger: '1',
    },
    {
        id: '1',
        user: true,
        message: { usermsg },
        trigger: '0'
    },
];

return (
    <div>
        <ChatBot steps={steps} />
    </div>
)
}

export default Chatbox;