import Conversation from "../models/conversation.js";
import Message from "../models/message.js";


export const getMessages = async (req, res) => {

    try {
        const {id : receiverId} = req.params;
        const senderId = req.user._id;

        const conversation = await Conversation.findOne(
            {
                participants: {$all : [senderId, receiverId] },
            }
        ).populate("messages");

        if(!conversation){
            return res.status(200).json([]);
        }

        const messages = conversation.messages;
        return res.status(200).json(messages);

    } catch (error) {
        res.status(500).json({error: "Internal server error"});
    }

};

export const sendMessage = async (req, res) => {
    console.log("message sent", req.params.id);

    try{
        const {message} = req.body;
        const {id : receiverId} = req.params;
        const senderId = req.user._id;

        let conversation = await Conversation.findOne(
            {
                participants: {$all : [senderId, receiverId] },
            }
        );

        if(!conversation){
            conversation = await Conversation.create(
                {
                    participants: [senderId, receiverId],
                }
            )
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            message,
        });

        if(newMessage){
            conversation.messages.push(newMessage._id);
        }

        // Socket IO will be implemented here
        // this will run in series
        // await conversation.save();
        // await newMessage.save();

        // this will run in paraller
        await Promise.all([conversation.save(), newMessage.save()]);

        return res.status(201).json(newMessage);

    } catch(error) {
        res.status(500).json({error: "Internal server error"});
    }
    
};