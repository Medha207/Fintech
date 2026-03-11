import { userModel } from "../models/userModel.js";
import { hash, compare } from "bcrypt";
import jsonwebtoken from "jsonwebtoken";
const jwt = jsonwebtoken;

export async function createUser(req, res) {
  try {
    const { username, email, password } = req.body;

    // Validation
    if (!username || !email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    if (password.length < 6) {
      return res.status(400).json({ error: "Password must be at least 6 characters" });
    }

    // Check if user already exists
    const existingUser = await userModel.findOne({
      $or: [{ username }, { email }]
    });

    if (existingUser) {
      if (existingUser.username === username) {
        return res.status(400).json({ error: "Username already exists" });
      }
      return res.status(400).json({ error: "Email already exists" });
    }

    // Hash password
    const hashedPassword = await hash(password, 10);

    // Create user
    const user = await userModel.create({
      username,
      email,
      password: hashedPassword
    });

    // Generate token
    const payload = { id: user._id, username: user.username };
    const jwtToken = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "7d" });

    res.status(201).json({
      message: "User registered successfully",
      jwtToken,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        walletBalance: user.walletBalance
      }
    });
  } catch (e) {
    console.error("Registration error:", e);
    res.status(500).json({ error: "Registration failed. Please try again." });
  }
}

export async function loginUser(req, res) {
  try {
    const { username, password } = req.body;

    // Validation
    if (!username || !password) {
      return res.status(400).json({ error: "Username and password are required" });
    }

    // Find user
    const userDetails = await userModel.findOne({ username });

    if (!userDetails) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    // Verify password
    const isPasswordValid = await compare(password, userDetails.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    // Generate token
    const payload = { id: userDetails._id, username: userDetails.username };
    const jwtToken = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "7d" });

    res.status(200).json({
      message: "Login successful",
      jwtToken,
      user: {
        id: userDetails._id,
        username: userDetails.username,
        email: userDetails.email,
        walletBalance: userDetails.walletBalance
      }
    });
  } catch (e) {
    console.error("Login error:", e);
    res.status(500).json({ error: "Login failed. Please try again." });
  }
}

// export async function getWalletBalance(req, res) {
//   try {
//     const transactions = await transactionModel.find({ userId: req.params.userId });

//     let balance = 0;
//     transactions.forEach(tx => {
//       if (tx.type === "credit") balance += tx.amount;
//       if (tx.type === "debit") balance -= tx.amount;
//     });

//     res.status(200).json({ balance });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// }

export async function getWalletBalance(req, res) {
  try {
    const user = await userModel.findById(req.params.userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({ balance: user.walletBalance });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

