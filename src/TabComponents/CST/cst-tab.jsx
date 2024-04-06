import React from 'react'; // Ensure React is imported
import ReactFlowGraph from './RF'
import { useProgramOutput } from '@/contexts/ProgramOutputContext';

export default function CstTab() {
    const { programOutput } = useProgramOutput(); 

    const baseStyle = {
        padding: '20px'
      };
    return (
        <div style={baseStyle}>
            <ReactFlowGraph />
            <pre>{programOutput['cstData']}</pre>
        </div>
    );
}23
