import chatModel from "../models/chat.model.js";
class Chat{

    async saveChat(prompt,response){
  
       // console.log(prom)
        try {
            const newChatDoc = new  chatModel({prompt,response});
            const resp = await newChatDoc.save();
            return resp
        } catch (error) {
            return error;
        }
    }
}

export default Chat;