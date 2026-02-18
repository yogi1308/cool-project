
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


export enum ConnectionMode {
    Strict = "strict",
    Loose = "loose",
  }