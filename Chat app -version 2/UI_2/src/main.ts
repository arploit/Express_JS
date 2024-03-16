import { inputTypes } from '../utils/constant'
import io from 'socket.io-client'



let sendButton = document.querySelector<HTMLButtonElement>("#sendButton")
let inputBox = document.querySelector<HTMLElement>("#messageBox")


const userId = 3001


let messageString = ''

let socket = io('http://localhost:3000')


socket.on("connect", () => {
   socket.emit("storeClientInfo", { userId: userId }) // x8WIv7-mJelg7on_ALbx
  });

socket.on('emitEvent', (data:string)=>{
    console.log(data)
})


socket.on('newMessage',(data:Object)=>{
    console.log(data)
})

const onSendButtonCTA = () =>{
    socket.emit('sendMessage',{
        'message': messageString,
        'userId':userId
    })

}

socket.on('roomJoined',(data)=>{
    console.log('roomJoined', data)
})



sendButton?.addEventListener("click", onSendButtonCTA)

inputBox?.addEventListener('input', (e: any) => {
    // console.log('e',e)    
    let target = e.target as HTMLInputElement

    if(inputTypes.BACKESCAPE === e?.inputType || inputTypes.DELETE === e?.inputType){
        messageString = messageString.slice(0,messageString.length -2)
    }
    else messageString = messageString.concat(target.value)
})
