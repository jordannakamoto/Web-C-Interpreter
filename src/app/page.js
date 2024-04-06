"use client";

import 'react-tabs/style/react-tabs.css';

import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';

import AboutTab from '@/TabComponents/About/about-tab'
import { Button } from "@/ShadCN/ui/button"
import CodeEditor from '@uiw/react-textarea-code-editor';
import CstTab from '@/TabComponents/CST/cst-tab'
import { useProgramOutput } from '@/contexts/ProgramOutputContext';
import {useState} from 'react'

export default function Home({ layoutPercentages = [40, 60, 30] }) {
  const [code, setCode] = useState(``);
  const [outputcode, setOutputCode] = useState(``);
  const { setProgramOutput, programOutput } = useProgramOutput(); // Context Provider : contexts/ProgramOutputContext.js


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
      console.log('FrontEnd to File processing successful', postData);
  
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
        <PanelGroup direction="horizontal" style={{padding: '15px'}} className=" min-w-screen min-h-screen max-h-screen">
          <Panel defaultSize={layoutPercentages[0]} className="">
            <PanelGroup direction="vertical" className=" h-full " style={{position:'relative'}}>
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
              <Panel defaultSize={layoutPercentages[2]} style={{ backgroundColor: "#ededed"}}>
                  <CodeEditor
                  value={outputcode}
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
          <Panel defaultSize={layoutPercentages[1]} className=" bg-white">
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
            {/* {programOutput['astData']} */}
            </TabPanel>
            <TabPanel>
                    <pre> </pre>
            </TabPanel>
          </Tabs>
          </Panel>
        </PanelGroup>
      </main>
  );
}
