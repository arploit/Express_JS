const express = require('express')
const app = express()
const port = 3001



app.get('/',()=>{
    app.sendFile(__dirname+'index.html')
})


app.listen(port, () => {
    console.log(`listening on port: ${port}`);
});
  


