import { v4 as uuidv4 } from 'uuid';
import type { Writable } from 'svelte/store';
import { writable } from 'svelte/store';

// colors

export const isDark: Writable<boolean> = writable(false);
export const theme: Writable<string> = writable('light');

// markdown format

export const mkdnFrmt: Writable<Record<string, string>> = writable({
  // tree
  indentKind: '',
  textKind: '',
  caseKind: '',
  whiteSpaceKind: '',
  // attrs
  attrKind: '',
});

// api

export const apiKey: Writable<string> = writable('');

// result

export const isMarkdown: Writable<boolean> = writable(true);

export const resultMkdn: Writable<Record<string, string>> = writable({
  all: '',
  ancestors: '',
  descendants: '',
  atom: '',
});
export const resultMkmp: Writable<SVGSVGElement | null> = writable(null);

// multiplex

import { EditorNode } from '$lib/util/multiplex';

export interface Indicator {
  visible: boolean;
  draggedDocId: string;
  closestEditorId: string;
  position: number;
}

export const indicatorTabLoc: Writable<Indicator> = writable({
  visible: false,
  draggedDocId: '',
  closestEditorId: '',
  position: 0,
});

let initialEditor = new EditorNode('0', 'editor');
let rootNode = new EditorNode('root', 'root', null, [initialEditor]);

function findNode(node: EditorNode, id: string): EditorNode | null {
  if (node.id === id) return node;
  for (const child of node.children) {
    const found = findNode(child, id);
    if (found) return found;
  }
  return null;
}

function getAllNodeIds(node: EditorNode): string[] {
  let ids: string[] = [node.id];
  if (node.children && node.children.length > 0) {
    node.children.forEach(child => {
      ids = ids.concat(getAllNodeIds(child));
    });
  }
  return ids;
}

function createEditorNodeStore(initialValue: EditorNode) {
  const { subscribe, set, update } = writable(initialValue);

  // nodes

  function splitNode(nodeId: string, direction: 'horizontal' | 'vertical') {
    update(root => {

      function findAndSplit(node: EditorNode) {
        if (node.id === nodeId && node.type === 'editor') {
          const newId: string = uuidv4();
          newDocument(newId);
          let newEditor = new EditorNode(newId, 'editor');
          const newSplitId: string = uuidv4() + 's';
          let newSplit: EditorNode = new EditorNode(newSplitId, 'split', direction, [node, newEditor]);
          return newSplit;
        } else if (node.children) {
          node.children = node.children.map(child => findAndSplit(child) || child);
        }
        return node;
      }

      function updateRoot(root: EditorNode) {
        let newStructure = findAndSplit(root);
        if (root.id === 'root' && newStructure.id !== 'root') {
          return new EditorNode('root', 'root', null, [newStructure]);
        }
        return newStructure;
      }

      return updateRoot(root);
    });
  }

  function resizeEditor(editorId: string, xDelta: number, yDelta: number): void {
    update(root => {

      function findParentNode(node: EditorNode, childId: string, parent: EditorNode | null = null): EditorNode | null {
        for (const child of node.children) {
          if (child.id === childId) return parent;
          const foundParent = findParentNode(child, childId, node);
          if (foundParent) return foundParent;
        }
        return null;
      }

      function normalizeRatios(siblingNodes: EditorNode[]): void {
        const totalHorizontalRatio = siblingNodes.reduce((sum, node) => sum + node.flexRatio[0], 0);
        const totalVerticalRatio = siblingNodes.reduce((sum, node) => sum + node.flexRatio[1], 0);

        siblingNodes.forEach((node) => {
          node.flexRatio[0] /= totalHorizontalRatio;
          node.flexRatio[1] /= totalVerticalRatio;
        });
      }

      const parentNode: EditorNode | null = findParentNode(root, editorId);
      if (!parentNode) {
        console.error('editorId not found among siblings: ', editorId);
      } else {
        const siblingNodes = parentNode.children;
        const currentIndex = siblingNodes.findIndex(n => n.id === editorId);
        if (currentIndex !== -1) {
          const currentNode = siblingNodes[currentIndex];
          currentNode.flexRatio[0] += xDelta;
          currentNode.flexRatio[1] += yDelta;
          let remainingHorizontalSpace = 1.0 - currentNode.flexRatio[0];
          let remainingVerticalSpace = 1.0 - currentNode.flexRatio[1];
          siblingNodes.forEach((sibling, index) => {
            if (index !== currentIndex) {
              const horizontalShare = remainingHorizontalSpace / (siblingNodes.length - 1);
              const verticalShare = remainingVerticalSpace / (siblingNodes.length - 1);
              sibling.flexRatio[0] = horizontalShare;
              sibling.flexRatio[1] = verticalShare;
            }
          });
          normalizeRatios(siblingNodes);
        }
      }
      return root;
    });
  }

  const rmNode = (editorId: string) => {
    update(root => {

      const removeEditorFromTree = (node: EditorNode): EditorNode | null => {
        if (node.id === editorId) {
          return null;
        }
        node.children = node.children.map(child => removeEditorFromTree(child)).filter(Boolean) as EditorNode[];
        return node;
      };

      function postRemovalAdjustment(node: EditorNode): EditorNode {
        if (node.type === 'split' && node.children && node.children.length === 1) {
          return node.children[0];
        }
        if (node.children) {
          node.children = node.children.map(child => postRemovalAdjustment(child));
        }
        return node;
      }

      let updatedRoot = removeEditorFromTree(root);
      if (updatedRoot !== null) {
        updatedRoot = postRemovalAdjustment(updatedRoot);
      } else {
        updatedRoot = new EditorNode('root', 'root', null, [initialEditor]);
      }
      return updatedRoot;
    });
  };

  // tabs

  const setActiveTab = (editorId: string, docId: string) => {
    update(root => {

      const updateNode = (node: EditorNode): EditorNode => {
        if (node.id === editorId) {
          // spreader (...) triggers svelte's reactivity
          return { ...node, activeDocId: docId };
        } else if (node.children) {
          const updatedChildren = node.children.map(updateNode);
          if (updatedChildren !== node.children) {
            // spreader (...) triggers svelte's reactivity
            return { ...node, children: updatedChildren };
          }
        }
        return node;
      };

      const updatedRoot = updateNode(root);
      return updatedRoot;
    });
  };

  const addTab = (editorId: string, docId: string | null = null) => {
    update(root => {

      const addDocIdToEditor = (node: EditorNode): EditorNode => {
        if (docId === null) {
          docId = uuidv4();
          newDocument(docId);
        }
        if (node.id === editorId && (node.type === 'editor' || node.type === 'root')) {
          node.docIds.push(docId);
        } else if (node.children) {
          node.children.forEach(child => addDocIdToEditor(child));
        }
        return node;
      };

      return addDocIdToEditor(root);
    });
  };

  const moveTabWithinEditor = (editorId: string, docId: string, targetIndex: number) => {
    update(root => {

      const updateNodeTabs = (node: EditorNode): EditorNode => {
        console.log('moveTabWithinEditor: ', node.id, editorId, docId, targetIndex);
        if (node.id === editorId) {
          const currentIndex = node.docIds.indexOf(docId);
          if (currentIndex !== -1 && targetIndex !== -1 && currentIndex !== targetIndex) {
            node.docIds.splice(currentIndex, 1);
            node.docIds.splice(targetIndex, 0, docId);
          }
          // spreader (...) triggers svelte's reactivity
          return { ...node };
        } else if (node.children) {
          node.children = node.children.map(updateNodeTabs);
        }
        return node;
      };

      return updateNodeTabs(root);
    });
  }

  const moveTabAcrossEditors = (sourceEditorId: string, targetEditorId: string, docId: string, targetIndex: number) => {
    update(root => {

      const removeDocIdFromSource = (node: EditorNode): EditorNode => {
        if (node.id === sourceEditorId) {
          const index = node.docIds.indexOf(docId);
          if (index !== -1) {
            node.docIds.splice(index, 1);
          }
          // spreader (...) triggers svelte's reactivity
          return { ...node };
        } else if (node.children) {
          node.children = node.children.map(removeDocIdFromSource);
        }
        return node;
      };

      const addDocIdToTarget = (node: EditorNode): EditorNode => {
        if (node.id === targetEditorId) {
          if (targetIndex >= 0) {
            node.docIds.splice(targetIndex, 0, docId);
          } else {
            node.docIds.push(docId);
          }
          // spreader (...) triggers svelte's reactivity
          return { ...node };
        } else if (node.children) {
          node.children = node.children.map(addDocIdToTarget);
        }
        return node;
      };

      const treeAfterRemoval: EditorNode = removeDocIdFromSource(root);
      return addDocIdToTarget(treeAfterRemoval);
    });
  }

  const rmTab = (editorId: string, docId: string) => {
    update(root => {

      const removeDocIdFromEditor = (node: EditorNode): EditorNode => {
        if ((node.id === editorId) && node.docIds) {
          node.docIds = node.docIds.filter(id => id !== docId);
        } else if (node.children) {
          node.children.forEach(child => removeDocIdFromEditor(child));
        }
        return node;
      };

      return removeDocIdFromEditor(root);
    });
  };

  return {
    // default
    subscribe,
    // editor nodes
    splitNode, // add node
    resizeEditor,
    rmNode,
    // tabs
    setActiveTab,
    addTab,
    moveTabWithinEditor,
    moveTabAcrossEditors,
    rmTab,
  };
}

export const editorTree = createEditorNodeStore(rootNode);

// markdown

// export const documents = writable({});
export const documents = writable({
  '0': {
    filename: 'fname-a',
    mkdn: '# a header\n\nsome content!',
  },
  '1': {
    filename: 'fname-b',
    mkdn: '# another header\n\nsome more content!',
  }
});

export function newDocument(id: string | null = null): void {
  documents.update(docs => {
    const newId: string = (id === null) ? uuidv4() : id;
    return {
      ...docs,
      [newId]: {
        filename: 'Untitled.md',
        mkdn: '',
      },
    };
  });

}

export function updateFname(docId: string, filename: string): void {
  documents.update((docs) => {
    return {
      ...docs,
      [docId]: {
        ...docs[docId],
        filename: filename || docs[docId]?.filename,
      },
    };
  });
}

export function updateMkdn(docId: string, mkdn: string): void {
  documents.update((docs) => {
    return {
      ...docs,
      [docId]: {
        ...docs[docId],
        mkdn,
      },
    };
  });
}

// export function updateDocument(docId, { filename, mkdn }) {
//   documents.update((docs) => {
//     return {
//       ...docs,
//       [docId]: {
//         mkdn,
//         filename: filename || docs[docId]?.filename || 'Untitled.md'
//       },
//     };
//   });
// }

// export function removeDocument(docId) {
//   documents.update(docs => {
//     const updatedDocs = { ...docs };
//     delete updatedDocs[docId];
//     return updatedDocs;
//   });
// }
