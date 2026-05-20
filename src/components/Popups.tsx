export function NewNodeOptionsPopup({ onAddNode }) {
    return (
        <div className="border bg-pri border-acc rounded shadow-lg flex flex-col gap-2 min-w-[120px]">
            <button
                className="text-left px-2 py-1 hover:bg-white/20 rounded text-white text-sm"
                onClick={onAddNode}>
                Add Node
            </button>
            <button
                className="text-left px-2 py-1 hover:bg-white/20 rounded text-white text-sm opacity-50 cursor-not-allowed" >
                Add Chat (WIP)
            </button>
            <button
                className="text-left px-2 py-1 hover:bg-white/20 rounded text-white text-sm opacity-50 cursor-not-allowed" >
                Add File (WIP)
            </button>
        </div>
    );
}


export function NodeOptionsPopup({ onDeleteNode }) {
    return (
        <div className="border bg-pri border-acc rounded shadow-lg flex flex-col gap-2 min-w-[120px]">
            <button
                className="text-left px-2 py-1 hover:bg-white/20 rounded text-white text-sm"
                onClick={onDeleteNode}>
                Delete Node
            </button>
            <button
                className="text-left px-2 py-1 hover:bg-white/20 rounded text-white text-sm opacity-50 cursor-not-allowed" >
                Add Handle
            </button>
            <button
                className="text-left px-2 py-1 hover:bg-white/20 rounded text-white text-sm opacity-50 cursor-not-allowed" >
                Add File (WIP)
            </button>
        </div>
    )
}
