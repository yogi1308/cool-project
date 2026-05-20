import { SendIcon } from "../assets/Icons.tsx";
import { Handle, Position } from "@xyflow/react";

export default function ChatNode() {
    return (
        <div className="relative border border-acc rounded-md flex flex-col bg-pri text-white min-w-[280px]">
            {/* Header/Title */}
            <div className="p-2 border-b border-acc/10 flex items-center ">
                <input type="text" placeholder="Add a Title" className="text-center w-full outline-none"/>
            </div>

            {/* Chat/Output Area */}
            <div className="flex-1 min-h-[120px] p-4 flex items-center justify-center">
                <p className="text-[10px] text-white/10">
                    No Messages Yet
                </p>
            </div>

            {/* Input Section */}
            <div className="p-2">
                <div className="flex items-center gap-2 rounded-md p-2 border border-white/10 focus-within:border-acc/50 focus-within:bg-white/[0.08] transition-all">
                    <span className="text-acc">+</span>
                    <textarea 
                        placeholder="Type a prompt..."
                        className="flex-1 bg-transparent outline-none resize-none placeholder:text-white/20"
                        rows={1}
                    />
                    <button className="bg-acc text-pri p-1 rounded-md transition-all cursor-pointer hover:brightness-115">
                        <SendIcon className="w-4 h-4" />
                    </button>
                </div>
            </div>

            {/* Handles - Positioned outside the padding of the main content */}
            <Handle
                id="target-top"
                type="target"
                position={Position.Top}
                className="w-3 h-3 border-2 border-pri"
            />
            <Handle
                id="source-bottom"
                type="source"
                position={Position.Bottom}
                className="w-3 h-3 border-2 border-pri"
            />
            <Handle
                id="target-left"
                type="target"
                position={Position.Left}
                className="w-3 h-3 border-2 border-pri"
            />
            <Handle
                id="source-right"
                type="source"
                position={Position.Right}
                className="w-3 h-3 border-2 border-pri"
            />
        </div>
    )
}

