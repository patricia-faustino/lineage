// src/types.ts

export interface ParentCandidate {
    name: string;
    type: string;
  }
  
  export interface NodeData {
    id: string;
    type: string;
    parent_candidates?: ParentCandidate[];
    temporary?: boolean;
  }
  
  export interface CytoscapeEvent {
    target: any; // You can replace 'any' with a more specific type if available
  }