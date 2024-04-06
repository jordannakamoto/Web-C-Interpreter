"use client";

import 'react-tabs/style/react-tabs.css';

import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';

import AboutTab from '@/TabComponents/About/about-tab'
import { Button } from "@/ShadCN/ui/button"
import CodeEditor from '@uiw/react-textarea-code-editor';
import {useState} from 'react'

export default function Home({ layoutPercentages = [40, 60, 30] }) {
  const [code, setCode] = useState(``);
  const [outputcode, setOutputCode] = useState(``);

  const runProgram = () => {
    fetch('/api/textarea-to-program-file', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text: code }),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Error processing files');
      }
      return response.json();
    })
    .then(data => {
      // console.log('First request successful', data);
      // Now, make the second fetch call
      return fetch('/api/run-program', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
    })
    .then(runresponse => {
      if (!runresponse.ok) {
        throw new Error('Error running c++ program');
      }
    })
    .then(runData => {
      // Process the response from running the program
      console.log('Program run successfully', runData);
    })
    .catch(error => {
      console.error('Failed to run c++ program...', error);
    });
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
    
    <main className="min-h-screen w-full  items-center justify-between  bg-white">
      <PanelGroup direction="horizontal" style={{padding: '15px'}} className=" min-w-screen min-h-screen">
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
            <h2>Any content cmt</h2>
          </TabPanel>
          <TabPanel>
            <h2>Any content tk</h2>
          </TabPanel>
          <TabPanel>
            <h2>Any content cst</h2>
          </TabPanel>
          <TabPanel>
            <h2>Any content st</h2>
          </TabPanel>
          <TabPanel>
            <h2>Any content ast</h2>
          </TabPanel>
          <TabPanel>
            <h2>Any content bnf</h2>
          </TabPanel>
        </Tabs>
        </Panel>
      </PanelGroup>
    </main>
  );
}
