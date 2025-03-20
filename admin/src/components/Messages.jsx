import React, { useEffect, useState, useContext,useRef } from 'react';
import io from 'socket.io-client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle,faX,faImage } from '@fortawesome/free-solid-svg-icons';
import { ShopContext } from '../context/ShopContext.jsx';
import axios from 'axios';
import { backendUrl } from '../App.jsx';
import { toast } from 'react-toastify';
const Messages = () => {
  const socket = io('http://localhost:4000', {
    transports: ['websocket'],
    withCredentials: true,
  });
  const { users } = useContext(ShopContext);
  const [usersOnline, setUsersOnline] = useState([]);
  const [messages, setMessages] = useState([]);
  const scrollMsgRef = useRef(null)
  const inputRef = useRef(null)
  const [usersOffline, setUsersOffline] = useState([]);
  const [emailMsg, setEmailMsg] = useState('');
  const [userMsg, setUserMsg] = useState('');
  const [text, setText] = useState('');
  const fileInputRef = useRef(null)
  const [ image, setImage ] = useState(null)
  
  const [selectedUser, setSelectedUser] = useState(null); // State to keep track of the selected user
  useEffect(() => {
    console.log(users);
  }, [users]);



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


  // Get messages each time reload
  const getMessages = async () => {
    try {
      console.log("Getmessages function called ");
      const userEmail = emailMsg;
      console.log(userEmail);
      const response = await axios.post(backendUrl + '/api/message/get', { userEmail });
      console.log(response);
      if (response.data.success) {
        setMessages(response.data.listMsg);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    
      getMessages();
    
  }, [users,emailMsg]);

  //Send msg
  
  const handleSubmit = (e) => {
    e.preventDefault()
    sendMessage(image)
    setText('')
    inputRef.current.focus()
    setImage(null)
  };

  const sendMessage = async(image) => {
    try {   
        const isUserSend = "false"
        const userEmail = emailMsg
       const userName = userMsg
       if(!userName) {
        toast.error("Vui lòng chọn người dùng để nhắn")
        return
       }
       
       const response = await axios.post(backendUrl + '/api/message/send',{isUserSend,userEmail,userName,text,image})
       if(response.data.success) {
            console.log("saved msg ")
    }
    }catch(error) {
        console.log(error)
    }
}
useEffect(()=> {
  scrollMsg()
  inputRef.current.focus()
  setText('')
},[messages])
const scrollMsg = ()=> {
  scrollMsgRef.current?.scrollIntoView({behavior:"smooth"})
}


  // Socket
  useEffect(() => {
    socket.on('message', (msg) => {
      console.log(msg);
      setMessages((prevMessages) => [...prevMessages, msg]);
    });
    socket.on('newMsg', (msg) => {
      console.log(msg); // Log the message to the console
      setMessages((prevMessages) => [...prevMessages, { text: msg.text, createdAt: msg.createdAt, isUserSend: msg.isUserSend,userName:msg.userName,userEmail:msg.userEmail,image:msg.image }]);
    });
    socket.on('getUsersOnline', ({ users }) => {
      console.log("Hello get user online");
      console.log(users);
      setUsersOnline(users);
    });

    socket.emit("adminJoin");
    return () => {
      socket.off('message');
      socket.off('getUsersOnline');
    };
  }, []);





  // Get list of offline users
  const userOfline = () => {
    console.log("Hello userOfline function ");
    const listUserOffline = users.filter((user) =>
      !usersOnline.some(userOnline => userOnline.userName === user.name));
    console.log(listUserOffline);
    setUsersOffline(listUserOffline);
  };

  useEffect(() => {
    userOfline();
  }, [users, usersOnline]);

  const handleUserClick = (userEmail,userName) => {
    setEmailMsg(userEmail);
    setUserMsg(userName)
    setSelectedUser(userEmail); // Update the selected user
  };
  return (
    <div className="flex h-full">
      <div className="w-1/3 p-4 border-r border-gray-30">
        <h2 className="text-lg font-bold mb-4">Đang hoạt động</h2>
        <ul className="space-y-2">
          {usersOnline.map((user, index) => (
            <li
              onClick={() => handleUserClick(user.userEmail,user.userName)}
              key={index}
              className={`md:font-semibold transition-all duration-200 cursor-pointer py-4 p-2 bg-white rounded shadow-xl flex items-center hover:bg-gray-200 ${selectedUser === user.email ? 'bg-gray-300' : ''}`}
            >
              <FontAwesomeIcon icon={faCircle} className="text-green-500 mr-2" />
              {user.userName} <br /> ({user.userEmail})
            </li>
          ))}
        </ul>
        <h2 className="text-lg font-bold mb-4 mt-10">Ngoại Tuyến</h2>
        <ul className="space-y-2">
          {usersOffline.map((user, index) => (
            <li
              onClick={() => handleUserClick(user.email,user.name)}
              key={index}
              className={`md:font-semibold transition-all duration-200 cursor-pointer py-4 p-2 bg-white rounded shadow-xl flex items-center hover:bg-gray-200 ${selectedUser === user.email ? 'bg-gray-300' : ''}`}
            >
              <FontAwesomeIcon icon={faCircle} className="text-gray-500 mr-2" />
              {user.name} <br /> ({user.email})
            </li>
          ))}
        </ul>
      </div>
      <div className="w-2/3 p-4 flex flex-col h-[700px]">
        <h2 className="text-lg font-bold mb-4">Tin Nhắn</h2>
        <div className="flex-1 p-3 overflow-y-auto">
          {messages.map((msg, index) => (
              <div  
                key={index}
                className={`  my-2 `}
              >   
                <div className={`text-md md:text-lg px-2 py-1 rounded-xl w-[80%] ${
                  msg.isUserSend === "false" ? 'bg-blue-500 text-white ml-auto' : 'bg-gray-300 text-black mr-auto'
                }`}> 
                  <p className='text-md text-2xl'>{msg.text}</p>
                  {msg.createdAt ?(<p className='text-xs italic '>{new Date(msg.createdAt).toLocaleTimeString('en-US')}</p>):null}
                </div>
                {msg.image && (
                  <img className={` w-[180px] h-[180px] ${msg.isUserSend === "true" ?'mr-auto':'ml-auto' }`} src={msg.image} alt="" />)}
              </div>
              
            ))}
          <div ref = {scrollMsgRef}/>
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

export default Messages;