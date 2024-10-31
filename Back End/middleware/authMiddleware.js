// const jwt = require("jsonwebtoken");
// require("dotenv").config();

// const auth = (req, res, next) => {
//   const token = req.cookies.token;

//   console.log("Received token:", token);
//   if (!token) {
//     console.log("No token provided in the request.");
//     return res.status(401).send("Access denied. No token provided.");
//   }

//   try {
//     const user = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = user.id;
//     req.body.userId = user.id;
//     console.log("Token verified successfully. User ID:", req.user);
//     next();
//   } catch (error) {
//     console.error("Error verifying token:", error.message);
//     res.status(500).send("Error verifying token: " + error.message);
//   }
// };

// module.exports = auth;
// // ------------------

const jwt = require("jsonwebtoken");
require("dotenv").config();

const auth = (req, res, next) => {
  const token = req.cookies.token;

  console.log("Received token:", token);
  // if (!token) {
  //   console.log("No token provided in the request.");
  //   return res.status(401).send("Access denied. No token provided.");
  // }

  try {
    if (!token) {
      return res
        .status(401)
        .json({ loggedIn: false, message: "No token provided" });
    }
    const user = jwt.verify(token, process.env.JWT_SECRET);
    req.user = user;
    req.body.userId = user.id;
    console.log("Token verified successfully. User ID:", req.user);
    next();
  } catch (error) {
    console.error("Error verifying token:", error.message);
    res.status(500).send("Error verifying token: " + error.message);
  }
};

// const checkAuthStatus = (req, res) => {
//   const token = req.cookies.token;

//   if (!token) {
//     return res.status(401).json({ loggedIn: false });
//   }

//   try {
//     jwt.verify(token, process.env.JWT_SECRET);
//     res.status(200).json({ loggedIn: true});
//   } catch (error) {
//     res.status(401).json({ loggedIn: false });
//   }
// };

module.exports = auth;
