import { v4 as uuidv4 } from 'uuid';


export class EditorNode {
  id: string;                                       // a unique id to track editor instances
  type: 'root' | 'editor' | 'split';                // 'root' or 'split' or 'editor'
  splitDirection: 'horizontal' | 'vertical' | null; // 'horizontal' or 'vertical'
  children: EditorNode[];                           // array of child nodes
  flexRatio: [number, number] = [1, 1];             // flex ratio of editor size [width, height]
  activeDocId: string;                              // id of visible document
  docIds: string[] = [];                            // array of document ids (for tabs)

  constructor(
    activeDocId: string,
    type: 'root' | 'split' | 'editor' = 'editor',
    splitDirection: 'horizontal' | 'vertical' | null = null,
    children: EditorNode[] = [],
  ) {
    this.id = (activeDocId === 'root') ? 'root' : uuidv4();
    this.type = type;
    this.splitDirection = splitDirection;
    this.children = children;
    this.activeDocId = activeDocId;
    this.docIds = [activeDocId];
  }
}

