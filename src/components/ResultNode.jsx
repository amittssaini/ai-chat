    import { Handle, Position } from "reactflow";

    export default function ResultNode({ data }) {
    return (
        <div className="bg-gray-800 text-white p-4 rounded-xl shadow-lg w-[700px] border border-gray-700">
        
        <p className="text-sm mb-2 text-gray-400">Result</p>

        <div className="h-48 overflow-y-auto p-3 bg-gray-900 rounded-lg border border-gray-600 text-sm leading-relaxed">
                   {data.isLoading ? (
           <div className="flex flex-col items-center gap-2">
             <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
             <p className="text-xs text-gray-400">Thinking...</p>
           </div>
         ) : (
           <div className="text-left w-full">
             {data.value || "AI response will appear here..."}
           </div>
         )}
        </div>

        <Handle type="target" position={Position.Left} />
        </div>
    );
    }


//     import { Handle, Position } from "reactflow";

// export default function ResultNode({ data }) {
//   return (
//     <div className="bg-gray-800 text-white p-4 rounded-xl shadow-lg w-[700px] border border-gray-700">
      
//       <p className="text-sm mb-2 text-gray-400">Result</p>

//       <div className="h-48 overflow-y-auto p-3 bg-gray-900 rounded-lg border border-gray-600 text-sm flex items-center justify-center">
        
//         {data.isLoading ? (
//           <div className="flex flex-col items-center gap-2">
//             <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
//             <p className="text-xs text-gray-400">Thinking...</p>
//           </div>
//         ) : (
//           <div className="text-left w-full">
//             {data.value || "AI response will appear here..."}
//           </div>
//         )}

//       </div>

//       <Handle type="target" position={Position.Left} />
//     </div>
//   );
// }