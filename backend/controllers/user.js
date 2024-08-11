import User from "../models/user.js";

export const getUsersForSideBar = async (req, res) => {
    
    try {
        const loggedInUserId = req.user._id;

        const filteredUsers = await User.find({_id : {$ne : loggedInUserId} } ).select("-password");

        return res.status(200).json(filteredUsers);

    } catch (error) {
        res.status(500).json({error: "Internal server error"});
    }

}