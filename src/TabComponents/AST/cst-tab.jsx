// AST TAB

import React from 'react'; // Ensure React is imported
import ReactFlowGraph from './RF'

export default function AstTab() {

    const baseStyle = {
      };
    return (
        <div style={baseStyle}>
            <ReactFlowGraph />
            {/* <pre style={{padding: '35px', fontSize:'12px', borderTop:'solid 1px #ADD8E6'}}>{programOutput['cstData']}</pre> */}
        </div>
    );
}
