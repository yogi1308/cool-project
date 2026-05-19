import {
    ReactFlow,
    Background,
    Controls,
    MiniMap,
    ConnectionMode,
    ConnectionLineType,
    useNodesState,
    useEdgesState,
    useReactFlow,
    type Connection,
    type Node
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { nodeTypes } from "../types/nodes.ts";
import { NewNodeOptionsPopup, NodeOptionsPopup } from "./Popups.tsx"
import { useState, useEffect } from "react";

export default function App() {
    // Initilizes Nodes and edges from localStorage
    const [nodes, setNodes, onNodesChange] = useNodesState(() => {
        const saved = localStorage.getItem('nodes');
        return saved ? JSON.parse(saved) : [];
    })

    const [edges, setEdges, onEdgesChange] = useEdgesState(() => {
        const saved = localStorage.getItem('edges');
        return saved ? JSON.parse(saved) : [];
    })

    const [menuPosition, setMenuPosition] = useState<{ x: number; y: number } | null>(null); // Screen coordinates for UI positioning
    const [flowPosition, setFlowPosition] = useState<{ x: number; y: number } | null>(null); // Canvas coordinates for node placement
    const [showNodeOptions, setShowNodeOptions] = useState(false)
    const [showNewNodeOptions, setShowNewNodeOptions] = useState(false)
    const [selectedNodeID, setSelectedNodeID] = useState<string | null>(null)
    const { screenToFlowPosition } = useReactFlow(); // Helper to convert screen pixels to canvas coordinates

    // Effect to auto-save canvas state whenever nodes or edges change
    useEffect(() => {
        localStorage.setItem('nodes', JSON.stringify(nodes))
        localStorage.setItem('edges', JSON.stringify(edges))
    }, [nodes, edges])

    // Logic to handle drawing connections between nodes
    const onConnect = (params: Connection) => {
        const newEdge = {
            ...params,
            id: `edge-${params.source}-${params.target}-${crypto.randomUUID()}`,
            type: "smoothstep",
            style: { stroke: "#00bcff" },
        };
        setEdges((eds) => [...eds, newEdge]);
    };

    // Triggered when right-clicking the canvas background
    function onPaneContextMenu(event: React.MouseEvent | MouseEvent) {
        event.preventDefault()
        setShowNewNodeOptions(() => true) // Open our custom context menu

        // 1. Save the screen coordinates so the popup renders exactly where you clicked
        const clientPosition = { x: event.clientX, y: event.clientY };
        setMenuPosition(clientPosition);

        // 2. Translate those screen coordinates into flow coordinates for the node
        const position = screenToFlowPosition(clientPosition);
        setFlowPosition(position);
        setShowNodeOptions(false)
    }

    function onNodeContextMenu(event: React.MouseEvent | MouseEvent, node: Node) {
        event.preventDefault()
        setShowNodeOptions(true)

        const clientPosition = { x: event.clientX, y: event.clientY };
        setMenuPosition(clientPosition);

        setSelectedNodeID(node.id)
        setShowNewNodeOptions(false)
    }

    // Called by the popup to actually spawn a node
    function onAddNode() {
        if (!flowPosition) return; // Safety check
        const newNode = {
            id: crypto.randomUUID(),
            type: "default",
            position: { x: flowPosition.x, y: flowPosition.y },
            data: { label: "Node 3" },
            nodeClassName: "custom-node-wrapper"
        }
        setNodes((nodes) => nodes.concat(newNode)) // Immutable state update
        setShowNewNodeOptions(false) // Close the menu after action
    }

    function onDeleteNode() {
        if (!selectedNodeID) return
        setNodes((nodes) => nodes.filter((node) => node.id != selectedNodeID))
        setEdges((edges) => edges.filter((edge) => edge.source != selectedNodeID && edge.target != selectedNodeID))
        setShowNodeOptions(false)
    }

    return (
        <div className="h-screen w-screen bg-pri">
            <ReactFlow
                nodes={nodes}
                edges={edges}
                nodeTypes={nodeTypes}
                onNodeContextMenu={onNodeContextMenu}
                onNodesChange={onNodesChange} // Handles built-in drag/delete actions
                onEdgesChange={onEdgesChange} // Handles edge interactions
                onConnect={onConnect} // Handles drawing new connections
                onPaneClick={() => {setShowNodeOptions(false); setShowNewNodeOptions(false)}}
                onPaneContextMenu={onPaneContextMenu} // Custom right-click handler
                fitView
                connectionMode={ConnectionMode.Loose}
                proOptions={{ hideAttribution: true }}
                connectionLineType={ConnectionLineType.SmoothStep}
            >
                <Background /> {/* Grid/Dot background pattern */}
                <Controls className="border border-acc" /> {/* Zoom/Fit controls */}
                <MiniMap
                    bgColor={"#030712"}
                    maskColor={"transparent"}
                    className="border border-acc"
                /> {/* Overview map in the corner */}
                {menuPosition && showNewNodeOptions && (
                    <div
                        style={{
                            position: 'absolute',
                            left: menuPosition.x,
                            top: menuPosition.y,
                            zIndex: 1000
                        }}
                        onClick={(e) => e.stopPropagation()} // Prevent clicking the menu from affecting the canvas
                    >
                        <NewNodeOptionsPopup onAddNode={onAddNode} /> {/* Our custom UI overlay */}
                    </div>
                )}
                {menuPosition && showNodeOptions && (
                    <div
                        style={{
                            position: 'absolute',
                            left: menuPosition.x,
                            top: menuPosition.y,
                            zIndex: 1000
                        }}
                        onClick={(e) => e.stopPropagation()} // Prevent clicking the menu from affecting the canvas
                    >
                        <NodeOptionsPopup onDeleteNode={onDeleteNode} /> {/* Our custom UI overlay */}
                    </div>
                )}
            </ReactFlow>
        </div>
    );
}
