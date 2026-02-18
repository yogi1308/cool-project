import { ReactFlow, Background, Controls, MiniMap, applyEdgeChanges, applyNodeChanges, addEdge, ConnectionMode } from "@xyflow/react";
import "@xyflow/react/dist/style.css";
// import { AllNodes, AllEdges } from "../types/nodes.ts";
import { useState, useCallback } from "react";
import Node from "./Nodes"

const AllNodes = [
  { id: "1", type: "default", position: { x: 0, y: 0 }, data: { label: "Node 1" }, nodeClassName: "custom-node-wrapper" },
  { id: "2", type: "default", position: { x: 200, y: 100 }, data: { label: "Node 2" }, nodeClassName: "custom-node-wrapper" },
];

const nodeTypes = {
  default: Node
}

export default function App() {
  const [nodes, setNodes] = useState(AllNodes);
  const [edges, setEdges] = useState([]);
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
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
        connectionMode={ConnectionMode.Loose}
        proOptions={{ hideAttribution: true }}
      >
        <Background />
        <Controls className="border border-acc" />
        <MiniMap
          bgColor={"#030712"}
          maskColor={"transparent"}
          className="border border-acc"
        />
      </ReactFlow>
    </div>
  );
}