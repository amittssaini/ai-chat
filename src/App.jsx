

import React, { useState } from "react";
import ReactFlow, { Background } from "reactflow";
import "reactflow/dist/style.css";

import InputNode from "./components/InputNode";
import ResultNode from "./components/ResultNode";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar"; // ✅ ADD THIS

import { askAI, saveData, historyChat,getHistoryById } from "./api";

const nodeTypes = {
  inputNode: InputNode,
  resultNode: ResultNode,
};

export default function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState("");
  const [history, setHistory] = useState([]);

  const handleKeyDown=(e)=>{
    console.log("handle enter key ");
    if(e.key==="Enter") {
    e.preventDefault();
    handleRun();
  }
  }

  const nodes = [
    {
      id: "1",
      type: "inputNode",
      position: { x: 100, y: 150 },
      data: {
        value: prompt,
        onChange: setPrompt,
        handleKeyDown:handleKeyDown
      },
    },
    {
      id: "2",
      type: "resultNode",
      position: { x: 500, y: 150 },
      data: {
        value: result,
        isLoading:isLoading,
      },
    },
  ];

  const edges = [
    {
      id: "e1-2",
      source: "1",
      target: "2",
      animated: true,
    },
  ];

  //  Toggle Sidebar + Fetch History
  const toggleSidebar = async () => {
    setIsSidebarOpen((prev) => !prev);

    // fetch history when opening
    if (!isSidebarOpen) {
      try {
        const res = await historyChat();
        setHistory(res.data); // expect [{id, prompt}]
      } catch (err) {
        console.error(err);
      }
    }
  };

  
  //  Run AI
  const handleRun = async () => {
    try {
      if(prompt==="")
      {
        alert("add some prompt to fetch the answer")
        return;
      }
      setIsLoading(true)
      const res = await askAI(prompt);
      setResult(res.data.answer);

      // local history
      setHistory((prev) => [
        {
          id: Date.now(),
          prompt,
        },
        ...prev,
      ]);
    } catch (err) {
      console.error(err);
      alert("Error fetching AI response");
    }
    finally{
      setIsLoading(false)
    }
  };
  
  
  
  // ✅ Save to DB
  const handleSave = async () => {
    try {
      const responseData = await saveData({ prompt, response:result });
      if(responseData.data.alreadyExists)
      alert(" already Saved to DB ");
    else
    {
      alert("saved to db ")
    }
    } catch (err) {
      console.error(err);
      alert("Error saving data");
    }
  };

  const onClickSave=()=>{
    setPrompt("");
    setResult("");
  }

  // ✅ CLICK HISTORY ITEM
  // const handleHistorySelect = async (item) => {
  //   try {
  //     setPrompt(item.prompt); // show in input

  //     const res = await askAI(item.prompt); // call API again
  //     setResult(res.data.answer);

  //     setIsSidebarOpen(false); // close sidebar after click (optional)
  //   } catch (err) {
  //     console.error(err);
  //     alert("Error loading history item");
  //   }
  // };

  const handleHistorySelect = async (item) => {
  try {
    console.log("id is :: ", item._id);
    const res = await getHistoryById(item._id);
      console.log("response :: ",res.data)
    setPrompt(res.data.prompt);
    setResult(res.data.response);

    setIsSidebarOpen(false);
  } catch (err) {
    console.error(err);
    alert("Error fetching history item");
  }
};

  return (
    <div className="h-screen bg-gray-900 text-white flex flex-col">

      {/* Navbar */}
      <Navbar onHistoryClick={toggleSidebar} />

      {/* Sidebar */}
      <Sidebar
        history={history}
        onSelect={handleHistorySelect}
        isOpen={isSidebarOpen}
      />

      {/* Buttons */}
      <div className="p-4 flex gap-3 border-b border-gray-700">
        <button
          onClick={handleRun}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg"
        >
          Run Flow
        </button>

        <button
          onClick={handleSave}
          disabled={!result || isLoading}
        //   className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg"
        // >
        className={`px-4 py-2 rounded-lg transition ${
            !result || isLoading
              ? "bg-green-400 cursor-not-allowed"
              : "bg-green-600 hover:bg-green-700"
  }`}>
          Save
        </button>

                <button
          onClick={onClickSave}
          className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg"
        >
          Clear
        </button>
      </div>

      {/* Flow */}
      <div className="flex-1">
        <ReactFlow nodes={nodes} edges={edges} nodeTypes={nodeTypes}>
          <Background />
        </ReactFlow>
      </div>
    </div>
  );
}