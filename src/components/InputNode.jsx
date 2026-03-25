    import { Handle, Position } from "reactflow";

    export default function InputNode({ data }) {
    return (
        <div className="bg-gray-800 text-white p-4 rounded-xl shadow-lg w-72 border border-gray-700">
        
        <p className="text-sm mb-2 text-gray-400">Prompt</p>

        <textarea
            value={data.value}
            onChange={(e) => data.onChange(e.target.value)}
            placeholder="Ask anything..."
            onKeyDown={data.handleKeyDown}
            className="w-full h-28 p-3 rounded-lg bg-gray-900 border border-gray-600 focus:outline-none focus:border-blue-500 text-sm resize-none"
        />

        <Handle type="source" position={Position.Right} />
        </div>
    );
    }