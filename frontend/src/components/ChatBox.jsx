import React, { useState, useEffect, useContext,useRef } from 'react';
import { ShopContext } from '../context/ShopContextProvider';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoffee, faHome, faUser,faChevronDown ,faCircle,faMessage,faX,faImage } from "@fortawesome/free-solid-svg-icons";
import io from 'socket.io-client';
import { toast } from 'react-toastify';
const socket = io('http://localhost:4000', {
  transports: ['websocket'],
  withCredentials: true,
});

const ChatBox = ({ user }) => {
  const { messages = [], setMessages,sendMessage } = useContext(ShopContext);
  const [message, setMessage] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [ text,setText ] = useState('')
  const inputRef = useRef(null)
  const messagesEndRef = useRef(null)
  const [ userName, setUserName ] = useState('')
  const [ userEmail, setUserEmail ] = useState('')
  const [ image, setImage ] = useState(null)
  const [ visibleDotMsg, setVisibleDotMsg ] = useState(false)
  const fileInputRef = useRef(null)
  let isUserSend
  useEffect(()=> {
    console.log(user)
  },[user])

  // Handle imgmsg change
 const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(file);
  };
  //remove imgmsg
  const removeImage = () => {
    setImage(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };


  useEffect(() => {
    if (user.name && user.email) {
      setUserName(user.name);
      setUserEmail(user.email);
      socket.emit('userJoin', { userName:user.name, userEmail:user.email });

    } else {
        socket.emit("userLogOut")
    }
  }, [user]);


  const toggleChatBox = () => {
    setIsOpen(!isOpen);
  };


  //Socket
  useEffect(() => {
    socket.on('message', (msg) => {
      console.log(msg); // Log the message to the console
    });
    socket.on('newMsg', (msg) => {
      setVisibleDotMsg(true)
      console.log(msg); // Log the message to the console
      setMessages((prevMessages) => [...prevMessages, { text: msg.text, createdAt: msg.createdAt, isUserSend: msg.isUserSend,userName:msg.userName,userEmail:msg.userEmail,image:msg.image }]);
    });

    return () => {
      socket.off('message');
    };
  }, []);

  
  // Send image
const handleSubmit = (e)=> {
  e.preventDefault()
  sendMessage(isUserSend= "true",text,image)
  setText('')
  setImage(null)
  inputRef.current.focus()
}
useEffect(()=> {
  scrollToBottom();
},[messages])
const scrollToBottom = () => {
  messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
};

useEffect(()=> {
  console.log(visibleDotMsg)
},[visibleDotMsg])
  return (
    <div className="fixed bottom-0 right-0 z-50">
        <div  className={`cursor-pointer w-12 h-12 absolute bottom-20 right-2  transition-transform duration-1000 ${isOpen ? "scale-0" : "scale-100"}`} onClick={()=>{toggleChatBox(),setVisibleDotMsg(false)}}>
          <FontAwesomeIcon className='w-full h-full' icon={faMessage} bounce style={{color: "#146ebe",}} />
         
              <div  className={`absolute bottom-1 ${visibleDotMsg ?'':'hidden'}`}>
                  <FontAwesomeIcon icon={faCircle} beat  style={{color: "#840626",}} />
               </div>
        
        </div>
        <div className={`  bg-white border border-gray-300 rounded-lg shadow-lg flex flex-col mt-2  transition-all duration-500 ${isOpen ? "h-[850px] w-screen md:w-[500px] md:h-[600px] lg:h-[500px] lg:w-[400px]":"h-0 w-0 opacity-0"}`}>
          <div className="bg-blue-500 text-white p-3 rounded-t-lg flex justify-between items-center">
            <h3 className="text-2xl font-bold">Chat</h3>
            <button className="text-white text-xl focus:outline-none" onClick={toggleChatBox}>
            <FontAwesomeIcon icon={faX} size="xl" style={{color: "#2f3735",}} />
            </button>
          </div>
          <div className="flex-1 p-3 overflow-y-auto flex-col w-full h-full">
          {messages.length > 0 ? (
            messages.map((msg, index) => (
              <div  
                key={index}
                className={`  my-2 `}
              >   
                <div className={`text-md md:text-lg px-2 py-1 rounded-xl w-[80%] ${
                  msg.isUserSend === "true" ? 'bg-blue-500 text-white ml-auto' : 'bg-gray-300 text-black mr-auto'
                }`}> 
                  <p className='text-md text-2xl'>{msg.text}</p>
                  {msg.createdAt ?(<p className='text-xs italic '>{new Date(msg.createdAt).toLocaleTimeString('en-US')}</p>):null}
                </div>
                {msg.image && (
                  <img className={`w-[180px] h-[180px] ${msg.isUserSend === "true"? "ml-auto":"mr-auto"}`} src={msg.image} alt="" />)}
              </div>
              
            ))
          ) : null}
              <div ref={messagesEndRef} />
          </div>
          <form className="p-3 border-t border-gray-300 flex flex-col" onSubmit={(e)=>handleSubmit(e)}>
            
                <div className={`w-[80px] h-[80px] ${image ? '': 'hidden'}`}>
                  <div className='relative w-full'>
                      <img src={image} alt="" />
                      <FontAwesomeIcon onClick={()=>removeImage()} className='absolute top-0 right-0 cursor-pointer' icon={faX} style={{color: "black",}} />
                  </div>
               </div>
               <div className='flex relative items-center'>
                    <input
                       type="text"
                       value={text}
                       onChange={(e) => setText(e.target.value)}
                       placeholder="Enter Message"
                       className="flex-1 p-2 border border-gray-300 rounded-l-lg focus:outline-none"
                       required
                       ref={inputRef}
                     />
                     <input
                      type="file"
                      id= "image"
                      accept="image/*"
                      className='hidden'
                      ref={fileInputRef}
                      onChange={handleImageChange}
                      />
                     <label htmlFor="image" className='absolute right-16 w-[32px] h-[32px] cursor-pointer'>
                         <FontAwesomeIcon className='w-full h-full' icon={faImage} style={{color: "#63E6BE",}} />
                     </label>
                      <button
                         type="submit"
                         className="absolute right-0 bg-blue-500 text-white p-2 rounded-r-lg focus:outline-none"
                       >
                         Send
                       </button>
               </div>
           
          </form>
        </div>
      
    </div>
  );
};

export default ChatBox;