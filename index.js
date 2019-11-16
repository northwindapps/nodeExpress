var express = require("express");
var app = express();

app.get('/', (req,res)=> {res.send("You have got promoted.")
});
var port = process.env.PORT || 3000;
app.listen(port, () => {
 console.log("Server running on port 3000");
});