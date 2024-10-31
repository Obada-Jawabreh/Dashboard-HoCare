require("dotenv").config();
const express = require('express');
const app = express();
const PORT = process.env.PORT;
const bodyParser = require('body-parser');
app.use(bodyParser.json());
const cors = require('cors');  
const cookieParser = require('cookie-parser');
app.use(cookieParser());
const path = require("path");
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
const RequestRoute = require("./routes/RequestRoute");
const userRoute = require("./routes/userRoute");
const contactRoute = require("./routes/contactRoute");

app.use(cors({
  origin: 'http://localhost:5174', 
  credentials: true 
}));
app.use('/api/request' , RequestRoute)
app.use('/api/user' , userRoute)
app.use("/api/contact", contactRoute);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});