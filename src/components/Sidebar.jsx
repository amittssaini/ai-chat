export default function Sidebar({ history, onSelect, isOpen }) {
  return (
    <div
      className={`fixed top-[72px] right-0 h-[calc(100%-72px)] w-72 
      bg-gray-900 border-l border-gray-700 p-4 
      transform transition-transform duration-300 z-50
      ${isOpen ? "translate-x-0" : "translate-x-full"}`}
    >
      <h2 className="text-lg font-semibold mb-4 text-white">
        History
      </h2>

      <div className="space-y-2 overflow-y-auto h-full pr-1">
        {history.length === 0 && (
          <p className="text-gray-400 text-sm">No history yet</p>
        )}

        {history.map((item) => (
          <div
            key={item._id}
            onClick={() => onSelect(item)}
            className="p-3 bg-gray-800 hover:bg-gray-700 rounded-lg cursor-pointer text-sm text-white transition"
          >
            {item.prompt}
          </div>
        ))}
      </div>
    </div>
  );
}