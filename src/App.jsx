import { useEffect, useState } from "react";
import { getFiber, getRawSummary, serializeFiber } from "./fiber";




export default function App() {
  const [view, setView] = useState("raw");
  const [rawText, setRawText] = useState("Click any React element");
  const [treeText, setTreeText] = useState("Click any React element");

  useEffect(() => {
    function handleClick(e) {
      const fiber = getFiber(e.target);

      const raw = getRawSummary(fiber);
      const tree = serializeFiber(fiber);

      setRawText(JSON.stringify(raw, null, 2));
      setTreeText(JSON.stringify(tree, null, 2));
    }

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  return (
    <div className="min-h-screen w-full bg-[#0d0d0d] text-gray-200 font-mono p-8">

      {/* Header */}
      <h1 className="text-2xl font-bold font-monospace mb-6">
        React Fiber Visualizer
      </h1>

      {/* Toggle Buttons */}
      <div className="flex gap-4 mb-6">
        
        <button
          onClick={() => setView("raw")}
          className={`px-5 py-2 rounded-lg transition 
            ${view === "raw" ? "bg-blue-600 text-white shadow-lg" : "bg-[#1a1a1a] hover:bg-[#222]"}
          `}
        >
          Raw Fiber
        </button>

        <button
          onClick={() => setView("tree")}
          className={`px-5 py-2 rounded-lg transition 
            ${view === "tree" ? "bg-green-600 text-white shadow-lg" : "bg-[#1a1a1a] hover:bg-[#222]"}
          `}
        >
          Serialized Fiber
        </button>
      </div>

      {/* Output Box */}
      <div className="w-full min-h-[300px] rounded-xl p-6 shadow-lg transition 
        bg-gradient-to-br 
        from-[#141414] 
        to-[#101010] 
        border border-[#1f1f1f]
      ">
        <pre
          className={`whitespace-pre-wrap text-sm overflow-auto rounded-xl p-4 h-[380px] 
            ${view === "raw" 
              ? "bg-[#0f0f0f] text-blue-300" 
              : "bg-[#001f1f] text-green-300"
            }
          `}
        >
          {view === "raw" ? rawText : treeText}
        </pre>
      </div>

      {/* Demo Zone */}
      <div className="mt-10">
        <h2 className="text-lg mb-3">Demo Elements</h2>

        <button className="px-4 py-2 bg-[#222] hover:bg-[#333] rounded-lg mr-3">
          Button A
        </button>

        <button className="px-4 py-2 bg-[#222] hover:bg-[#333] rounded-lg mr-3">
          Button B
        </button>

        <div className="mt-4 p-4 bg-[#1a1a1a] rounded-lg w-fit">
          <button className="px-4 py-2 bg-green-700 hover:bg-green-800 rounded-lg">
            Nested Button C
          </button>
        </div>
      </div>

    </div>
  );
}
