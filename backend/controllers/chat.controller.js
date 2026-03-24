import Chat from "../services/chat.service.js"
const chatService = new Chat();
const postChat=async(req,res)=>{
    try {
        const {prompt,response}= req.body;
        const checking = await chatService.saveChat(prompt,response);
        console.log(checking);
        res.send({prompt,response})
    } catch (error) {
        res.send(error)
    }
}
export default postChat;