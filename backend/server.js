import express from 'express'
import 'dotenv/config'
import connectDB from './config/mongoose.js'
import userRoute from './routes/userRoute.js'
import cors from 'cors'
import productRoute from './routes/productRoute.js'
import paymentRoute from './routes/paymentRoute.js'
import connectCloudinary from './config/cloudinary.js'
import bodyParser from 'body-parser';
import purchaseRoute from './routes/purchaseRoute.js'
import msgRoute from './routes/msgRoute.js'
import reviewProductRoute from './routes/reviewProductRoute.js'
import articleRoute from './routes/articleImg.js'
import { userJoin ,getUsersOnline, userLeave } from './utils/users.js'
const app = express()

//socket io
import path from 'path'
import http from 'http'
import {Server} from 'socket.io'
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const server = http.createServer(app);
export const io = new Server(server, {
    cors: {
      origin: ["http://localhost:5173", "http://localhost:5174"], // Update with your frontend URL
      methods: ["GET", "POST"],
      credentials: true,
    },
    transports: ["websocket"], // Ensure WebSocket transport is used
  });
app.use(express.static(path.join(__dirname,'../frontend')))

app.use(cors())
io.on('connection',socket=> {
   console.log("New Connection")

   socket.emit('message','Welcome To socket')

   //user Join
   socket.on('userJoin',({userName,userEmail})=>{
    console.log(socket.id + userName + userEmail)
    userJoin( socket.id,userName, userEmail);
 

    io.emit('getUsersOnline',({
      users: getUsersOnline()
    })) 
  })
    //user Join
    socket.on('adminJoin',()=>{
      console.log("Admin join be")
      io.emit('getUsersOnline',({
        users: getUsersOnline()
      })) 
    })
  socket.on('disconnect',()=> {
    console.log("Disconnect called")
    const user = userLeave(socket.id)
    io.emit('getUsersOnline',{
      users:getUsersOnline()
    })
  })
  socket.on('userLogOut',()=> {
    console.log(socket.id)
    const user = userLeave(socket.id)
    io.emit('getUsersOnline',{
      users:getUsersOnline()
    })
  })
   //Update status order
   socket.on("updateStatusOrder",({email})=> {
    console.log("update status order function called" + email)
    io.emit("updateStatusOrder",({email}))
 })
   
})

const PORT = 4000
//connect
connectDB()
connectCloudinary()
//middle Ware

//inscrease limite upload
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
//end pointer
app.get((''),(req,res)=> {
    res.send('API WORKING FOR MOHO , PORT ' + PORT) 
})
app.use('/api/user',userRoute)
app.use('/api/product',productRoute)
app.use('/api/payment',paymentRoute)
app.use('/api/purchase',purchaseRoute)
app.use('/api/message',msgRoute)
app.use('/api/review',reviewProductRoute)
app.use('/api/article',articleRoute)
server.listen(PORT,()=> {console.log("LISTENING PORT " + PORT)})