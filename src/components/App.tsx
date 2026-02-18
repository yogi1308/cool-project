import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  applyEdgeChanges,
  applyNodeChanges,
  addEdge,
  ConnectionMode,
  ConnectionLineType,
  useNodesState,
  useEdgesState,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { AllNodes, nodeTypes } from "../types/nodes.ts";
import { useState, useCallback } from "react";

export default function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState(AllNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const onConnect = (params) => {
    const newEdge = {
      ...params,
      id: `edge-${params.source}-${params.target}-${crypto.randomUUID()}`,
      type: "smoothstep",
      style: { stroke: "#00bcff" },
    };
    setEdges((eds) => [...eds, newEdge]);
    console.log(edges);
  };
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
        connectionLineType={ConnectionLineType.SmoothStep}
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
