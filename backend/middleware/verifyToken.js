import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized aaaa" });
  }

  const token = authHeader.split(" ")[1];

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      console.log("Error verifying token:", err);
      return res.status(401).json({ message: "Unauthorized bbbb" });
    }

    req.user = decoded.UserInfo.username;
    req.userId = decoded.UserInfo.userID;
    next();
  });
};

// const verifyToken = (req, res, next) => {
//   const authHeader = req.headers.authorization || req.headers.Authorization;

//   if (!authHeader.startsWith("Bearer ")) {
//     return res.status(401).json({ message: "Unauthorized" });
//   }

//   const token = authHeader.split(" ")[1];

//   jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
//     if (err) return res.status(403).json({ message: "Forbidden" });
//     req.user = decoded.userInfo.username;
//     req.userId = decoded.userInfo.userId;
//     next();
//   });
// };

// const verifyToken = (req) => {
//   const token = req.cookies.jwt; // Retrieve the JWT from the "jwt" cookie

//   if (!token) {
//     throw new Error("No token found");
//   }

//   try {
//     // Verify the JWT with your secret key
//     const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

//     // Extract the user's ID or any other relevant claims
//     const { userId } = decoded;

//     // You can perform additional checks or user validation here if needed

//     return {
//       userId,
//     };
//   } catch (err) {
//     throw new Error("Token is not valid");
//   }
// };

export { verifyToken };
