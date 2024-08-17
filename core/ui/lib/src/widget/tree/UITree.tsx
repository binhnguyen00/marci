import React from 'react';
import { FaRegFolderOpen, FaRegFolderClosed } from 'react-icons/fa6';

interface TreeProps {
  records: any[];
  parentField?: string;
  displayField: string;
  renderDisplay?: (record: any, shouldHavePadding?: boolean) => HTMLElement | any;
}
export function Tree({ records = [], parentField = "parentId", displayField, renderDisplay }: TreeProps) {
  const [activeNodes, setActiveNodes] = React.useState<Set<number>>(new Set());

  const toggleNode = (id: number) => {
    setActiveNodes((prev) => {
      const updated = new Set(prev);
      if (updated.has(id)) {
        updated.delete(id);
      } else {
        updated.add(id);
      }
      return updated;
    });
  };

  const buildTree = (records: any[]): any[] => {
    const tree: any[] = [];
    const lookup: { [key: number]: any } = {};

    records.forEach((record) => {
      lookup[record["id"]] = { ...record, children: [] };
    });

    records.forEach((record) => {
      if (record[parentField]) {
        lookup[record[parentField]].children!.push(lookup[record["id"]]);
      } else {
        tree.push(lookup[record["id"]]);
      }
    });

    return tree;
  };

  const renderTree = (nodes: any[]): JSX.Element => (
    <div>
      {nodes.map((node) => {
        const isExpanded = activeNodes.has(node["id"]);
        const isChild = activeNodes.has(node[parentField]);
        return (
          <div key={node.id} style={{ paddingLeft: isChild && 20 }}>
            {node.children && node.children.length > 0 ? (
              <>
                {isExpanded ? (
                  <FaRegFolderOpen
                    style={{ cursor: "pointer" }} className="m-1"
                    onClick={() => toggleNode(node["id"])}
                  />
                ) : (
                  <FaRegFolderClosed
                    style={{ cursor: "pointer" }} className="m-1"
                    onClick={() => toggleNode(node["id"])}
                  />
                )}
                {renderDisplay ? renderDisplay(node) : (
                  <span>{node[displayField]}</span>
                )}
                {isExpanded && renderTree(node.children)}
              </>
            ) : (
              renderDisplay ? renderDisplay(node, isChild) : (
                <span style={{ paddingLeft: isChild && 20 }}>
                  {node[displayField]}
                </span>
              )
            )}
          </div>
        );
      })}
    </div>
  );

  const treeData = buildTree(records);

  return (
    <div className='m-0 p-0'>
      {renderTree(treeData)}
    </div>
  );
}