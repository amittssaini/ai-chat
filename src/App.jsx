//   import React, { useState } from "react";
//   import ReactFlow, { Background } from "reactflow";
//   import "reactflow/dist/style.css";

//   import InputNode from "./components/InputNode";
//   import ResultNode from "./components/ResultNode";
//   import Navbar from "./components/Navbar";
//   import { askAI, saveData ,historyChat } from "./api";

//   const nodeTypes = {
//     inputNode: InputNode,
//     resultNode: ResultNode,
//   };

//   export default function App() {
//     const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//     const [prompt, setPrompt] = useState("");
//     const [result, setResult] = useState("");
//     const [history, setHistory] = useState([]);

//     const nodes = [
//       {
//         id: "1",
//         type: "inputNode",
//         position: { x: 100, y: 150 },
//         data: {
//           value: prompt,
//           onChange: setPrompt,
//         },
//       },
//       {
//         id: "2",
//         type: "resultNode",
//         position: { x: 500, y: 150 },
//         data: {
//           value: result,
//         },
//       },
//     ];

//     const edges = [
//       {
//         id: "e1-2",
//         source: "1",
//         target: "2",
//         animated: true,
//       },
//     ];

//     const toggleSidebar = () => {
//   setIsSidebarOpen((prev) => !prev);
// };
//     const handleRun = async () => {
//       try {
//         const res = await askAI(prompt);
//         setResult(res.data.answer);

//         // store in local history (frontend)
//         setHistory((prev) => [
//           { prompt, result: res.data.answer },
//           ...prev,
//         ]);
//       } catch (err) {
//         console.error(err);
//         alert("Error fetching AI response");
//       }
//     };

//     const handleSave = async () => {
//       try {
//         await saveData({ prompt, result });
//         alert("Saved to DB ✅");
//       } catch (err) {
//         console.error(err);
//         alert("Error saving data");
//       }
//     };
//    const  handleHistorySelect=()=>{

//     }

//     const handleHistoryClick = async() => {
//       // console.log(history);
//       // alert("Check console for history (we can build UI next)");
//       try {
//         const res = await historyChat();
//         setHistory(res.data)
//        // setResult(res.data.answer);
//        console.log(res.data)
//        console.log(history)

//         // store in local history (frontend)
        
//       } catch (err) {
//         console.error(err);
//         alert("Error fetching AI response");
//       }
//     };

//     return (
//       <div className="h-screen bg-gray-900 text-white flex flex-col">
        
//         <Navbar onHistoryClick={toggleSidebar} />

//           <Sidebar
//   history={history}
//   onSelect={handleHistorySelect}
//   isOpen={isSidebarOpen}
// />

//         {/* Buttons */}
//         <div className="p-4 flex gap-3 border-b border-gray-700">
//           <button
//             onClick={handleRun}
//             className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg"
//           >
//             Run Flow
//           </button>

//           <button
//             onClick={handleSave}
//             className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg"
//           >
//             Save
//           </button>
//         </div>

//         {/* Flow */}
//         <div className="flex-1">
//           <ReactFlow nodes={nodes} edges={edges} nodeTypes={nodeTypes}>
//             <Background />
//           </ReactFlow>
//         </div>
//       </div>
//     );
//   }


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

  const nodes = [
    {
      id: "1",
      type: "inputNode",
      position: { x: 100, y: 150 },
      data: {
        value: prompt,
        onChange: setPrompt,
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

  // ✅ Toggle Sidebar + Fetch History
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

  // ✅ Run AI
  const handleRun = async () => {
    try {
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
      await saveData({ prompt, response:result });
      alert("Saved to DB ✅");
    } catch (err) {
      console.error(err);
      alert("Error saving data");
    }
  };

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
          className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg"
        >
          Save
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