import { Handle, Position } from 'reactflow';
import React, { memo } from 'react';

function BasicNode({ data }) {
  return (
    <div className="cstNode shadow-sm bg-white border border-stone-400" style={{ minWidth: '30px' }}>
      {/* Left handle for outgoing horizontal connections */}
      <Handle type="source" position={Position.Right} style={{left: '0'}} id="r" />
      
      {/* Bottom handle for outgoing vertical connections */}
      <Handle type="source" position={Position.Bottom} style={{top: '0'}} id="b" />

      <div className="flex">
        <div className="mx-2">
          <span>{data.tokenValue}</span>
        </div>
      </div>
      {/* Top handle for incoming vertical connections */}
      <Handle type="target" position={Position.Top} style={{top: '0',left:'0',transform: 'translateX(12px)'}} id="t" />
      {/* Right handle for incoming horizontal connections */}
      <Handle type="target" position={Position.Left} style={{left: '0'}} id="l" />

      
      
      
    </div>
  );
}

export default memo(BasicNode);
