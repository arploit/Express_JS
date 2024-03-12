const express = require('express')
const app = express()
const port = 3001



app.get('/',(req:Request,res:any)=>{
    res.sendFile('./index.html',{root:'.'})
})


app.listen(port, () => {
    console.log(`listening on port: ${port}`);
});
  


