import User from "../models/user.js";
import bcryptjs from "bcryptjs";
import generateTokenAndSetCookie from "../utils/jwtTokenGenerator.js";

export const signup = async(req, res) => {
    try{
        const {fullName, userName, password, confirmPassword, gender} = req.body;
        if(password !== confirmPassword){
            return res.status(400).json({error:"Password and Confirm Password do not match"});
        }
        const user = await User.findOne({userName});

        if(user){
            return res.status(400).json({error:"UserName already exists"});
        }
       
        const profilePicGirl = `https://avatar.iran.liara.run/public/girl?username=${userName}`;
     
        const profilePicBoy = `https://avatar.iran.liara.run/public/boy?username=${userName}`;
        
        // Hashing Password 
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        const newUser = new User(
            {
                fullName, 
                userName, 
                password:hashedPassword, 
                gender,
                profilePic : gender === "male" ? profilePicBoy : profilePicGirl
            }
        );
        // generate JWT token
        generateTokenAndSetCookie(newUser._id, res);
        await newUser.save();

        res.status(201).json({
            _id: newUser._id,
            fullName: newUser.fullName,
            userName: newUser.userName,
            profilePic: newUser.profilePic
        })
    } catch (error){
        console.log("Error in signup controller", error.message);
        res.status(500).json({error:"Internal server error"});
    }
};

export const login = async(req, res) => {
    try{
        console.log("Logging in...")
        const {userName, password} = req.body;

        const user = await User.findOne({userName});
       
        const isPasswordCorrect = await bcryptjs.compare(password, user?.password || "");
        
        if(!user || !isPasswordCorrect){
            return res.status(400).json({error:"Invalid user credentials"});
        }

        generateTokenAndSetCookie(user._id, res);

        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            userName: user.userName,
            profilePic: user.profilePic
        });

    }  catch (error){
        console.log("Error in login controller", error.message);
        res.status(500).json({error:"Internal server error"});
    }

};

export const logout = async(req, res) => {
    try{
        res.cookie("jwt", "", { maxAge : 0});
        res.status(200).json({ message: "Logged out successfully" });
    } catch(error){
        console.log("Error in logout controller", error.message);
        res.status(500).json({ error: "Internal server error." });
    }
};

