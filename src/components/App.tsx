import {
    ReactFlow,
    ReactFlowProvider,
    Background,
    Controls,
    MiniMap,
    ConnectionMode,
    ConnectionLineType,
    useNodesState,
    useEdgesState,
    useReactFlow
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { AllNodes, nodeTypes } from "../types/nodes.ts";
import NewNodeOptionsPopup from "./NewNodeOptionsPopup"
import { useState } from "react";

export default function App() {
    const [nodes, setNodes, onNodesChange] = useNodesState(AllNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);

    //  Store where to visually render the popup (screen coordinates)
    const [menuPosition, setMenuPosition] = useState<{ x: number; y: number } | null>(null);
    // Store where to actually place the node on the canvas (flow coordinates)
    const [flowPosition, setFlowPosition] = useState<{ x: number; y: number } | null>(null);
    const [showNewNodeOptions, setShowNewNodeOptions] = useState(false)
    const { screenToFlowPosition } = useReactFlow();

    const onConnect = (params) => {
        const newEdge = {
            ...params,
            id: `edge-${params.source}-${params.target}-${crypto.randomUUID()}`,
            type: "smoothstep",
            style: { stroke: "#00bcff" },
        };
        setEdges((eds) => [...eds, newEdge]);
    };
    function onPaneContextMenu(event) {
        event.preventDefault()
        setShowNewNodeOptions(() => true)

        // 1. Save the screen coordinates so the popup renders exactly where you clicked
        const clientPosition = { x: event.clientX, y: event.clientY };
        setMenuPosition(clientPosition);

        // 2. Translate those screen coordinates into flow coordinates for the node
        const position = screenToFlowPosition(clientPosition);
        setFlowPosition(position);
        console.log(menuPosition, flowPosition)
    }

    function onAddNode(event) {
        if (!flowPosition) return;
        const newNode = { id: crypto.randomUUID(), type: "default", position: { x: flowPosition.x, y: flowPosition.y }, data: { label: "Node 3" }, nodeClassName: "custom-node-wrapper" }
        setNodes((nodes) => nodes.concat(newNode))
        setShowNewNodeOptions(false)
    }
    return (
        <div className="h-screen w-screen bg-pri">
            <ReactFlow
                nodes={nodes}
                edges={edges}
                nodeTypes={nodeTypes}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                onPaneContextMenu={onPaneContextMenu}
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
                {menuPosition && showNewNodeOptions && (
                    <div
                        style={{
                            position: 'absolute',
                            left: menuPosition.x,
                            top: menuPosition.y,
                            zIndex: 1000
                        }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <NewNodeOptionsPopup onAddNode={onAddNode} />
                    </div>
                )}
            </ReactFlow>
        </div>
    );
}
