import jsonwebtoken from "jsonwebtoken";

const jwt = jsonwebtoken;

export async function validation(req, res, next) {   //  here, rename `response` → `res`
    const token = req.headers.authorization?.split(" ")[1]; // Assuming Bearer token format
    console.log("Token received:", token);

    if (!token) {
        return res.status(401).json({ error: "Unauthorized access, token is missing" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); //  verify token
        if (!decoded) {
            return res.status(401).json({ error: "Unauthorized access, invalid token" });
        }

        console.log("Token is valid:", decoded);
        req.user = decoded;   //  attach decoded data to req for later use
        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        return res.status(401).json({ error: "Invalid token" });
    }
}
