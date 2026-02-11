import { ReactFlow, Background, Controls, MiniMap, applyEdgeChanges, applyNodeChanges, addEdge } from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { AllNodes, AllEdges } from "../types/nodes.ts";
import { useState, useCallback } from "react";

export default function App() {
  const [nodes, setNodes] = useState(AllNodes);
  const [edges, setEdges] = useState(AllEdges);
  const onNodesChange = useCallback(
    // When you drag or select a node, the onNodesChange handler is triggered.
    (changes) =>
      setNodes((nodesSnapshot) => applyNodeChanges(changes, nodesSnapshot)), // The applyNodeChanges function then uses these change events to update the current state of your nodes
    [],
  );
  const onEdgesChange = useCallback(
    (changes) => setEdges((edgesSnapshot) => applyEdgeChanges(changes, edgesSnapshot)),
    [],
  );
  const onConnect = useCallback( // The onConnect handler is called whenever a new connection is made between two nodes.
    (params) => setEdges((edgesSnapshot) => addEdge(params, edgesSnapshot)),
    [],
  );
  return (
    <div className="h-screen w-screen bg-pri">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
      >
        <Background color="red" />
        <Controls />
        <MiniMap />
      </ReactFlow>
    </div>
  );
}
