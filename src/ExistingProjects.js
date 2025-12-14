import React, { useState, useRef, useEffect } from 'react';
import { Send } from 'lucide-react';
import Dropdown from './Dropdown';
import { SimpleTreeView } from '@mui/x-tree-view/SimpleTreeView';
import { TreeItem } from '@mui/x-tree-view/TreeItem';
import Skeleton from "react-loading-skeleton";
import Box from '@mui/material/Box';
import { BarPlot } from '@mui/x-charts/BarChart';
import { LineHighlightPlot, LinePlot } from '@mui/x-charts/LineChart';
import { ChartContainer } from '@mui/x-charts/ChartContainer';
import { AllSeriesType } from '@mui/x-charts/models';
import { ChartsXAxis } from '@mui/x-charts/ChartsXAxis';
import { ChartsYAxis } from '@mui/x-charts/ChartsYAxis';
import { ChartsTooltip } from '@mui/x-charts/ChartsTooltip';
import CardSkeleton from './CardSkeleton';
import { ChartsAxisHighlight } from '@mui/x-charts/ChartsAxisHighlight';
import { faBars, faBell, faCoffee, faFolder, faSearch, faUser, faBackspace, faCalendarAlt, faPaperclip, faAnchor, faAlarmClock, faUmbrella, faPaintbrush, faHand, faHandPointer, faTree, faCaretDown, faCode, faChartBar, faSquareRootVariable, faHandPointDown, faCaretUp, faCaretRight, faArrowRight, faArrowDown, faAngleRight, faAngleDown, faList } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ChatGPTInterface from './ChatGPTInterface';
import outoutData from './ContextState.json';
import JsonList from './JsonList';

export default function ExistingProjects({toggleLoaded, toggleDropDown, isLoaded, count}) {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const textareaRef = useRef(null);
  const messagesEndRef = useRef(null);
  const [details, setDetails] = useState({});
  const options = { linkUrls: true };

  useEffect(() => {
    /*messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });*/
  }, [messages]);

  return (
    <>
      <div class="flexVertical">     
        <div class="flexAround">
        <div class="sideBar margin-10 curvedPanel">
          {isLoaded ? (     
            <>
            <div style={{"marginRight":"20px", "height":"calc(100vh - 110px)"}}>                 
              <SimpleTreeView>   
                <TreeItem itemId="grid" label="Solution Tree">
                  {Object.keys(outoutData).map(each => {
                  return (
                    <>
                      <div class="flexRow flexStart">
                        <TreeItem onClick={()=>{setDetails(outoutData[each]);}} itemId={each} label={(each.split("_").length ? (each.split("_").map(txt => (txt.split("_")[0].charAt(0).toUpperCase() + txt.split("_")[0].slice(1))).join(' ')) : each)} />
                      </div>                    
                    </>
                  );
                  })}   
                </TreeItem>
              </SimpleTreeView>
            </div>
            </>
  ) : (<><CardSkeleton amount={1} /></>)}
        </div>
        <div class="contentBar">
          <div class="curvedPanel margin-10" style={{height:"calc(100vh - 100px)"}}>
            {
            isLoaded ? (
            <>    
            <h3 class="borderBottom"> 
              <FontAwesomeIcon icon={faChartBar} /> Analysis
            </h3>           

            <JsonList data={details} />

            <ChatGPTInterface style={{position: "absolute", bottom: "0px"}} toggleDropDown={()=>{}} count = {0} toggleLoaded={true} isLoaded = {0}></ChatGPTInterface>   
                   
            </>
            ) : 
            (<><CardSkeleton amount={1} /></>)
            }
          </div>  

          {/*<div class="curvedPanel margin-top-20">
            {
            isLoaded ? (
            <>    
              <h3 class="borderBottom" > 
                <FontAwesomeIcon icon={faCode} /> Code
              </h3>
              <p class="textInfo">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit... 
              </p>
              <p style={{"font-size":"12px"}}>
                <textarea class="codeEditor"
                  value="<!DOCTYPE html>
  <html>
  <body>

  <h1>The code element</h1>

  <p>The HTML <code>button</code> tag defines a clickable button.</p>

  <p>The CSS <code>background-color</code> property defines the background color of an element.</p>

  </body>
  </html>">
                </textarea>
              </p>
                
              <p class="textInfo">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum
              </p>                   
            </>
            ) : 
            (<><CardSkeleton amount={1} /></>)
            }           
          </div>*/}
        </div>
      </div>
      </div>
    </>
  );
}