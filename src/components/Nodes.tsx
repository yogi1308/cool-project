import { Handle, Position } from "@xyflow/react";

export default function Node({ data }) {
  return (
    <div className="p-2 bg-pri text-white rounded">
      <Handle
        id={"1"}
        type="source" // Changed to target
        position={Position.Top} // Changed to Left
        className="w-2 h-2 bg-sec"
      />
      <div className="text-sm">{data?.label}</div>
      <Handle
        id={"2"}
        type="source" // Changed to source
        position={Position.Bottom} // Changed to Right
        className="w-2 h-2 bg-sec"
      />
    </div>
  );
}
