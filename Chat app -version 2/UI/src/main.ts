let sendButton = document.querySelector<HTMLButtonElement>("#sendButton")
let inputBox = document.querySelector<HTMLElement>("#messageBox")
import { inputTypes } from '../utils/constant'

let messageString = ''


const onSendButtonCTA = () =>{
    console.log(pingingServer( messageString)    )
}


const pingingServer = async(messageString : string) =>{
    const response = await fetch("http://localhost:3000/send-message",{
        headers: {
            'Content-Type': 'application/json' // Specify the content type explicitly
        },
        method:"POST",
        body:JSON.stringify({currentMessage : messageString}),
        mode:"cors"
    })
    let res =  await response.json()
    return res
}

sendButton?.addEventListener("click", onSendButtonCTA)

inputBox?.addEventListener('input', (e:Event)=>{
    console.log('e',e,inputTypes)    
    
    let target = e.target as HTMLInputElement

        messageString = messageString + target.value
})
