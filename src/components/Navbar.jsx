// export default function Navbar({ onHistoryClick }) {
//   return (
//     <div className="relative flex items-center justify-between px-6 py-4 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 shadow-lg">
      
//       {/* Left empty space (for balance) */}
//       <div className="w-[80px]" />

//       {/* Center Title */}
//       <h1 className="absolute left-1/2 transform -translate-x-1/2 text-2xl font-bold text-white tracking-wide">
//         Ask AI
//       </h1>

//       {/* Right Button */}
//       <button
//         onClick={onHistoryClick}
//         className="px-4 py-2 bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-lg text-white text-sm border border-white/30 transition"
//       >
//         History
//       </button>
//     </div>
//   );
// }


export default function Navbar({ onHistoryClick }) {
  return (
    <div className="relative flex items-center justify-between px-6 py-4 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600">
      
      <div className="w-[80px]" />

      <h1 className="absolute left-1/2 transform -translate-x-1/2 text-2xl font-bold text-white">
        Ask AI
      </h1>

      <button
        onClick={onHistoryClick}
        className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg text-white"
      >
        History
      </button>
    </div>
  );
}