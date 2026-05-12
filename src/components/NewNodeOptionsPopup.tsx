export default function NewNodeOptionsPopup({onAddNode}) {
    return (
        <div className="bg-sec border border-acc rounded shadow-lg p-2 flex flex-col gap-2 min-w-[120px]">
            <button
                className="text-left px-2 py-1 hover:bg-pri rounded text-white text-sm" 
                onClick={onAddNode}>
                Add Node
            </button>
            <button
                className="text-left px-2 py-1 hover:bg-pri rounded text-white text-sm opacity-50 cursor-not-allowed" >
                Add Chat (WIP)
            </button>
            <button
                className="text-left px-2 py-1 hover:bg-pri rounded text-white text-sm opacity-50 cursor-not-allowed" >
                Add File (WIP)
            </button>
        </div>
    );
}
