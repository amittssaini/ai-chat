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
    async getHistory(){
        try {
            //const response = await chatModel.find();
            const response = await chatModel.find({}, "prompt").sort({ createdAt: -1 });
            console.log(response);
            return response;

        } catch (error) {
            return error;
        }
    }

    async getHistoryById(id){
           try {
            //const response = await chatModel.find();
            const response = await chatModel.findById(id);
            console.log(response);
            return response;

        } catch (error) {
            return error;
        }
    }
}


export default Chat;