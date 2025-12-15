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
import { faBars, faBell, faCoffee, faFolder, faSearch, faUser, faBackspace, faCalendarAlt, faPaperclip, faAnchor, faAlarmClock, faUmbrella, faPaintbrush, faHand, faHandPointer, faTree, faCaretDown, faCode, faChartBar, faSquareRootVariable, faHandPointDown, faCaretUp, faCaretRight, faArrowRight, faArrowDown, faAngleRight, faAngleDown, faList, faFile } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ChatGPTInterface from './ChatGPTInterface';
import outoutData from './ContextState.json';
import final_report from './final_report.json';
import descriptionFile from './description.md';
import JsonList from './JsonList';
import ReactMarkdown from 'react-markdown';

export default function ExistingProjects({toggleLoaded, toggleDropDown, isLoaded, count}) {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const textareaRef = useRef(null);
  const messagesEndRef = useRef(null);
  const [details, setDetails] = useState({});
  const [showMarkdown, setShowMarkdown] = useState(false);
  const [mrkdown, setMrkdown] = useState('');
  const options = { linkUrls: true };

  fetch(descriptionFile).then((response) => response.text()).then((text) => {
      setMrkdown(text);
  })

  useEffect(() => {
    /*messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });*/
  }, [messages]);

  return (
    <>
      <div class="flexVertical">
        <div class="flexAround">
          <div class="projectPanel margin-10">
            {
            isLoaded ? (
            <>    
              <h3 class="borderBottom" > 
                <FontAwesomeIcon icon={faCode} /> Projects
              </h3>
              <SimpleTreeView expandedItems={["grid"]}>   
                <TreeItem itemId="grid" label="Branches">
                  {['Wine Classification','Airlines Classification', 'Sales Predictions'].map(each => {
                  return (
                    <>
                      <div class="flexRow flexStart">
                         <TreeItem itemId={each} label={each} />
                      </div>                    
                    </>
                  );
                  })}   
                </TreeItem>
              </SimpleTreeView>                     
            </>
            ) : 
            (<><CardSkeleton amount={1} /></>)
            }           
          </div>
          
        <div class="sideBar margin-10 curvedPanel">
          {isLoaded ? (     
            <>
            <div style={{"marginRight":"20px", "height":"calc(100vh - 110px)"}}>     
              <h3 class="borderBottom" > 
                <FontAwesomeIcon icon={faCode} /> Parameters
              </h3>    

              <SimpleTreeView>
                <TreeItem itemId="description" label="Description">
                  <div class="flexRow flexStart">
                    <TreeItem onClick={()=>{setShowMarkdown(true);}} itemId={"description_key"} label="Description" />
                  </div>
                </TreeItem>
              </SimpleTreeView>

              <SimpleTreeView>   
                <TreeItem itemId="grid" label="Solution Tree">
                  {Object.keys(outoutData).map(each => {
                  return (
                    <>
                      <div class="flexRow flexStart">
                         <TreeItem onClick={()=>{setShowMarkdown(false);setDetails(outoutData[each]);}} itemId={each} label={(each.split("_").length ? (each.split("_").map(txt => (txt.split("_")[0].charAt(0).toUpperCase() + txt.split("_")[0].slice(1))).join(' ')) : each)} />
                      </div>                    
                    </>
                  );
                  })}   
                </TreeItem>
              </SimpleTreeView>

              <SimpleTreeView>
                <TreeItem itemId="report" label="Final Report">
                  {Object.keys(final_report).map(each => {
                  return (
                    <>
                      <div class="flexRow flexStart">
                         <TreeItem onClick={()=>{setShowMarkdown(false);setDetails(final_report[each]);}} itemId={"finalReport_"+each} label={(each.split("_").length ? (each.split("_").map(txt => (txt.split("_")[0].charAt(0).toUpperCase() + txt.split("_")[0].slice(1))).join(' ')) : each)} />
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
            {!showMarkdown ? <>
              <p class="textInfo">
                <JsonList data={details} />
              </p>
            </> : 
              <ReactMarkdown children={mrkdown} />            
            }
            <ChatGPTInterface style={{position: "absolute", bottom: "0px"}} toggleDropDown={()=>{}} count = {0} toggleLoaded={true} isLoaded = {0}></ChatGPTInterface>                   
            </>
            ) : 
            (<><CardSkeleton amount={1} /></>)
            }
          </div>  

        </div>
      </div>
      </div>
    </>
  );
}