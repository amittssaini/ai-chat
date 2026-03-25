    import { Handle, Position } from "reactflow";

    export default function ResultNode({ data }) {
    return (
        <div className="bg-gray-800 text-white p-4 rounded-xl shadow-lg w-[700px] border border-gray-700">
        
        <p className="text-sm mb-2 text-gray-400">Result</p>

        <div className="h-48 overflow-y-auto p-3 bg-gray-900 rounded-lg border border-gray-600 text-sm leading-relaxed">
            {data.value || "AI response will appear here..."}
        </div>

        <Handle type="target" position={Position.Left} />
        </div>
    );
    }