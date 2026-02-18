import Node from "../components/Nodes"

// export const AllNodes: Node[] = [
//   {
//     id: "n1",
//     position: { x: 0, y: 0 },
//     data: { label: "Node 1" },
//     type: "input",
//   },
//   {
//     id: "n2",
//     position: { x: 100, y: 100 },
//     data: { label: "Node 2" },
//   },
// ];
// export type Node = {
//   id: string;
//   position: {x: number; y: number};
//   data: {label: string};
//   type?: string
// }

// export const AllEdges: Edge[] = [
//   {
//     id: "n1-n2",
//     source: "n1",
//     target: "n2",
//     type: "step",
//     label: "connects with",
//   },
// ];
// export type Edge = {
//   id: string;
//   source: string;
//   target: string;
//   type: string;
//   label: string;
// }

export const AllNodes = [
  { id: "1", type: "default", position: { x: 0, y: 0 }, data: { label: "Node 1" }, nodeClassName: "custom-node-wrapper" },
  { id: "2", type: "default", position: { x: 200, y: 100 }, data: { label: "Node 2" }, nodeClassName: "custom-node-wrapper" },
];

export const nodeTypes = {
  default: Node
}