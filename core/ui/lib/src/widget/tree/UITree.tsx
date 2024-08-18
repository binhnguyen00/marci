import React from 'react';
import { FaRegFolderOpen, FaRegFolderClosed, FaFolderTree } from 'react-icons/fa6';
import { Tooltip } from '../../widget/common/UITooltip';

interface TreeProps {
  records: any[];
  title?: string;
  parentField?: string;
  displayField: string;
  displayClassName?: string;
  renderDisplay?: (record: any, shouldHavePadding?: boolean) => HTMLElement | any;
}
export function Tree({ records = [], parentField = "parentId", displayField, renderDisplay, title, displayClassName }: TreeProps) {
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
    <>
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
                  <span className={`${displayClassName ? displayClassName : undefined}`}>
                    {node[displayField]}
                  </span>
                )}
                {isExpanded && renderTree(node.children)}
              </>
            ) : (
              renderDisplay ? renderDisplay(node, isChild) : (
                <span style={{ paddingLeft: isChild && 20 }} className={displayClassName ? displayClassName : undefined}>
                  {node[displayField]}
                </span>
              )
            )}
          </div>
        );
      })}
    </>
  );

  const treeData = buildTree(records);

  return (
    <React.Fragment>
      {/* Render Tree Title */}
      {title ? (
        <div className='flex-h p-2 border-bottom'>
          <h5 className='m-0'>{title}</h5>
          <Tooltip className='mx-1' position="bottom" content={"Expand All"} tooltip={
            <FaFolderTree 
              className="mt-1" style={{ cursor: "pointer" }} 
              onClick={() => {
                records.forEach((record) => toggleNode(record["id"]));
              }}/>
          }/>
        </div>
      ) : (
        <>
          <Tooltip position="bottom" content={"Expand All"} tooltip={
            <FaFolderTree 
              className="mt-1" style={{ cursor: "pointer" }} 
              onClick={() => {
                records.forEach((record) => toggleNode(record["id"]));
              }}/>
          }/>
        </>
      )}
      {/* Render Tree Body */}
      {treeData.length > 0 && (
        <>
          <div className='m-0 p-1'>
            {renderTree(treeData)}
          </div>
        </>
      )}
    </React.Fragment>
  );
}