'use client'

import 'reactflow/dist/style.css';

import React, { useCallback, useEffect, useMemo } from 'react';
import ReactFlow, { MarkerType, addEdge, useEdgesState, useNodesState } from 'reactflow';

import BasicNode from './RFNode';
import { useProgramOutput } from '@/contexts/ProgramOutputContext'; // Import your context hook

export default function RF() {
    const { programOutput } = useProgramOutput(); // Consume the context
    const nodeTypes = useMemo(() => ({ custom: BasicNode }), []);
    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);
    const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), [setEdges]);

    function customSplit(input) {
        // Matches single or double quotes, the contents between them, or non-whitespace sequences
        const regex = /(".*?"|'.*?'|\S+)/g;
        const tokens = input.match(regex) || [];

        const processedTokens = tokens.flatMap(token => {
            // Check if quote tokens for special string processing
            if ((token.startsWith(`"`) && token.endsWith(`"`)) || (token.startsWith(`'`) && token.endsWith(`'`))) {
                // Return opening quote, the content, and closing quote as separate tokens
                return [token.charAt(0), token.substring(1, token.length - 1), token.charAt(token.length - 1)];
            }
            // Otherwise, return non-quoted tokens as they are
            return token;
        });
        return processedTokens;
    }

    // Dependency array includes programOutput to re-run when it changes
    useEffect(() => {
        const cstData = programOutput['cstData'];

        if (cstData) {
            // Splitting the string by spaces/newlines to get an array of tokens

            let curr_x = 0;
            let curr_y = 0;
            let xIncrement = 0;     // Horizontal space between nodes, determined by each tokenValue length
            const yIncrement = 40;  // Vertical space between lines
            const lines = cstData.split('\n'); // Split by newline to process each line
            const newNodes = [];
            const newEdges = [];

            let lastNode;
            lines.forEach((line, lineIndex) => {
                
                const tokens = customSplit(line);

                tokens.forEach((token, tokenIndex) => {
                    xIncrement = 60; // Set the horizontal space based on the length of the token
                    if (token.length > 2) {
                        xIncrement += (token.length - 2) * 7;
                    }
                    const nodeId = `node-${lineIndex}-${tokenIndex}`;
                    newNodes.push({
                        id: nodeId,
                        type: "custom",
                        position: { x: curr_x, y: curr_y },
                        data: { tokenValue: token },
                    });
                    // If not the first token, create an edge from the previous token
                    if (tokenIndex > 0) {
                        const sourceId = `node-${lineIndex}-${tokenIndex - 1}`;
                        const targetId = nodeId;
                        newEdges.push({
                            id: `edge-${lineIndex}-${tokenIndex - 1}-${tokenIndex}`,
                            source: sourceId,
                            target: targetId,
                            sourceHandle: 'r',
                            targetHandle: 'l',
                            type: 'straight',
                            markerEnd: {
                                type: MarkerType.ArrowClosed,
                                width: 10,
                                height: 10,
                                color: 'gray',
                              },
                            // Optional: Add style or label here if needed
                        });
                    }
                    else if(lineIndex > 0){
                        const sourceId = lastNode;
                        const targetId = nodeId;
                        newEdges.push({
                            id: `edge-` + lastNode + `-${nodeId}`,
                            source: sourceId,
                            target: targetId,
                            sourceHandle: 'b',
                            targetHandle: 't',
                            type: 'straight',
                            markerEnd: {
                                type: MarkerType.ArrowClosed,
                                width: 10,
                                height: 10,
                                color: 'gray',
                              },
                            // Optional: Add style or label here if needed
                        });
                    }

                    curr_x += xIncrement; // Move to the right for the next token
                    lastNode = nodeId;
                });
                curr_x -= xIncrement;
                // curr_x = 0; // Reset X position for the start of the next line
                curr_y += yIncrement; // Move down for the next line
            });
            setNodes(newNodes);
            setEdges(newEdges);
        }
    }, [programOutput, setNodes]);

    return (
        <div style={{ width: '100vw', height: '100vh' }}>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                panOnScroll={true}
                nodeTypes={nodeTypes}
            />
        </div>
    );
}