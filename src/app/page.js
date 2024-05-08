"use client";

import 'react-tabs/style/react-tabs.css';

import { ImperativePanelGroupHandle, Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import {useEffect, useRef, useState} from 'react'

import AboutTab from '@/TabComponents/About/about-tab'
import AstTab from '@/TabComponents/AST/cst-tab';
import BnfTab from '@/TabComponents/BNF/bnf-tab';
import { Button } from "@/ShadCN/ui/button"
import CodeEditor from '@uiw/react-textarea-code-editor';
import CstTab from '@/TabComponents/CST/cst-tab'
import { useProgramOutput } from '@/contexts/ProgramOutputContext';
import { useViewManager } from '@/contexts/ViewManagerContext';

export default function Home() {
  const [code, setCode] = useState(``);
  const [outputcode, setOutputCode] = useState(``);
  
  const { setProgramOutput, programOutput, programInput } = useProgramOutput(); // Context Provider : contexts/ProgramOutputContext.js
  const { setLayoutPercentages, layoutPercentages } = useViewManager(); // Context Provider : contexts/ViewManagerContext.js

  const ref = useRef(null);
  const ref_inner = useRef(null);

  const resetLayout = () => {
    const panelGroup = ref.current;
    if (panelGroup) {
      panelGroup.setLayout([layoutPercentages[0], layoutPercentages[1]]);
    }
    const panelGroup2 = ref_inner.current;
    if (panelGroup2) {
      panelGroup2.setLayout([layoutPercentages[2], layoutPercentages[3]]);
    }
  };

  useEffect(() => {
    resetLayout();
  }, [layoutPercentages]);

  useEffect(() => {
    setCode(programInput);
  }, [programInput])

  const runProgram = async () => {
    try {
      // Sending the code to be processed and written to a file
      const postResponse = await fetch('/api/textarea-to-program-file', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: code }),
      });
      if (!postResponse.ok) {
        throw new Error('Error processing files');
      }
      const postData = await postResponse.json();
      console.log('FrontEnd to File processing successful');
  
      // Running the C++ program
      const runResponse = await fetch('/api/run-program', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!runResponse.ok) {
        throw new Error('Error running c++ program');
      }
      const runData = await runResponse.json();
      console.log('Program run successfully', runData);
  
      // Fetching the output from the run program
      const outputResponse = await fetch('/api/provide-output-files', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!outputResponse.ok) {
        throw new Error('Failed to get program output');
      }
      const outputData = await outputResponse.json();
      console.log('Program outfiles provided back to FrontEnd successfully', outputData);
  
      // Updating the context with the program's output
      setProgramOutput(prevOutput => ({
        'crData': outputData.files['interface-comments_removed_output_file.txt'],
        'tkData': outputData.files['interface-tokenlist_output_file.txt'],
        'cstData': outputData.files['interface-cst_output_file.txt'],
        'stData': outputData.files['interface-symboltable_output_file.txt'],
        'astData': outputData.files['interface-ast_output_file.txt'],
        'intData': outputData.files['interface-interpreter_output_file.txt'],
        'errData': outputData.files['interface-error_output_file.txt'],
      }));
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };


  // TODO: Resizable Panel Persistence
  // size persistence
  // const layout = cookies.get("react-resizable-panels:layout");
  // if (layout) {
  // defaultLayout = JSON.parse(layout);
  // }
  // const onLayout = function (sizes) {
  //   document.cookie = "react-resizable-panels:layout=" + JSON.stringify(sizes);
  // };

  return (
      <main className="min-h-screen max-h-screen w-full  items-center justify-between  bg-white">
        <PanelGroup ref={ref} direction="horizontal" style={{padding: '15px'}} className=" min-w-screen min-h-screen max-h-screen">
          <Panel defaultSize={40} className="">
            <PanelGroup ref={ref_inner} direction="vertical" className=" h-full " style={{position:'relative'}}>
              {/* TODO: Put in/out panel in its own component */}
              <Panel className=" bg-white" style={{overflowY: 'auto', backgroundColor: "#f5f5f5"}}>
                {/* CodeMirror Editor */}
                <CodeEditor
                  value={code}
                  language="c"
                  placeholder="Please enter C code."
                  onChange={(evn) => setCode(evn.target.value)}
                  padding={15}
                  style={{
                    backgroundColor: "#f5f5f5",
                    fontFamily: 'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
                  }}
                />
                <Button onClick={runProgram} style={{position: 'absolute',right: '5px',bottom: '5px'}}>run</Button>
              </Panel>
              <PanelResizeHandle className="border-t" />
              <Panel defaultSize={30} style={{ backgroundColor: "#ededed"}}>
                  <CodeEditor
                  value={programOutput['intData']}
                  language="c"
                  placeholder="output..."
                  onChange={(evn) => setCode(evn.target.value)}
                  padding={15}
                  style={{
                    backgroundColor: "#ededed",
                    fontFamily: 'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
                  }}
                />
              </Panel>
            </PanelGroup>
          </Panel>
          <PanelResizeHandle className="border-l" />
          <Panel defaultSize={60} className=" bg-white">
          <Tabs>
            <TabList>
              <Tab>About</Tab>
              <Tab>Remove Comments</Tab>
              <Tab>Tokenize</Tab>
              <Tab>CST</Tab>
              <Tab>Symbol Table</Tab>
              <Tab>AST</Tab>
              <Tab>BNF</Tab>
            </TabList>
            <TabPanel>
              <AboutTab/>
            </TabPanel>
            <TabPanel>
              <CodeEditor
                    value={programOutput['crData']}
                    language="c"
                    placeholder="Please enter C code."
                    onChange={(evn) => setCode(evn.target.value)}
                    padding={15}
                    style={{
                      backgroundColor: "white",
                      fontFamily: 'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
                    }}
                  />
            </TabPanel>
            <TabPanel>
                <pre style={{padding: '15px', marginBottom: '100px', fontSize:'12px'}}>{programOutput['tkData']}</pre>
            </TabPanel>
            <TabPanel>
              <CstTab/>
            </TabPanel>
            <TabPanel>
            <pre style={{padding: '15px', marginBottom: '100px', fontSize:'12px'}}>{programOutput['stData']}</pre>
            </TabPanel>
            <TabPanel>
              <AstTab/>
            </TabPanel>
            <TabPanel>
                    <BnfTab/>
            </TabPanel>
          </Tabs>
          </Panel>
        </PanelGroup>
      </main>
  );
}
