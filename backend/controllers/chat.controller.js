import Chat from "../services/chat.service.js"
const chatService = new Chat();
const postChat=async(req,res)=>{
    try {
        const {prompt,response}= req.body;
        const checking = await chatService.saveChat(prompt,response);
        console.log(checking);
        res.status(200).json({prompt,response})
    } catch (error) {
        res.send(error)
    }
}
const getHistory=async(req,res)=>{
    try {
        const response = await chatService.getHistory();
        res.status(200).send(response)
    } catch (error) {
        res.send(error)
    }
}

const getHistoryById=async(req,res)=>{
    console.log("id function of history")
    const id = req.params.id; 
    console.log("get history by id function ")
    try {
        const response = await chatService.getHistoryById(id);
        res.status(200).send(response)
    } catch (error) {
        res.send(error)
    }
}
export { postChat,getHistory,getHistoryById};