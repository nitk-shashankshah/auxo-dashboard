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
import ChatARM from './ChatARM';
import outoutData from './ContextState.json';
import final_report from './final_report.json';
import descriptionFile from './description.md';
import JsonList from './JsonList';
import ReactMarkdown from 'react-markdown';
import SimpleSnackbar from './SimpleSnackbar';

export default function ExistingProjects() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const textareaRef = useRef(null);
  const messagesEndRef = useRef(null);
  const [details, setDetails] = useState({});
  const [heading, setHeading] = useState('Description');
  const [showMarkdown, setShowMarkdown] = useState(true);
  const [mrkdown, setMrkdown] = useState('');
  const options = { linkUrls: true };
  const [count, setCount] = useState(false);
  const [isLoaded, setIsLoaded] = useState(0);

  fetch(descriptionFile).then((response) => response.text()).then((text) => {
      setMrkdown(text);
      setTimeout(() => {
        setIsLoaded(true);
      },1000);
  })

  function toggleDropDown(val) {
    setCount(val);
  }

  function toggleLoaded(isLoad){
     setIsLoaded(isLoad => !isLoad);
  };

  useEffect(() => {
    /*messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });*/
  }, [messages]);

  return (
    <>
      <SimpleSnackbar></SimpleSnackbar>
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
                <TreeItem itemId="grid" label="Available Projects">
                  {['Wine Classification'].map((each) => {
                  if (each == 'Wine Classification'){
                    return (
                      <div class="flexRow flexStart">
                        <TreeItem itemId={each} label={each} onClick={()=>{setIsLoaded(true);}} />
                      </div>                                                                   
                    );
                  } else {
                     return (
                      <div>
                        <TreeItem itemId={each} label={each} onClick={()=>{setIsLoaded(false);}} />
                      </div>
                    );
                  }
                  })}   
                </TreeItem>
              </SimpleTreeView>                     
            </>
            ) : 
            (<><CardSkeleton amount={1} /></>)
            }           
          </div>

        <div class="margin-10 cardPanel flexVertical">

          <div class="margin-10 flexRow" style={{"height":500}}>
            <div class="flexVertical width-30" style={{"height":"100%"}}>
              
               <div class="card borderPurple" style={{"height":"300"}}>
                <h3 class="borderBottom"> 
                  <FontAwesomeIcon icon={faChartBar} /> Model Evaluation Metrics
                </h3>           
                <>
                  <JsonList data={final_report["model_evaluation_metrics"]} />
                </> 
              </div>             
            </div>

            <div class="flexVertical width-30" style={{height:"600"}}>
              <div class="card borderPurple">
                <h3 class="borderBottom"> 
                  <FontAwesomeIcon icon={faChartBar} /> Model Feasibility
                </h3>           
                <>
                  <JsonList data={final_report["model_feasibility"]} />
                </> 
              </div>

              <div class="card borderPurple">
                <h3 class="borderBottom"> 
                  <FontAwesomeIcon icon={faChartBar} /> Validation Strategy
                </h3>           
                <>
                  <JsonList data={final_report["validation_strategy"]} />
                </> 
              </div>
            </div>

            <div class="flexVertical width-30" style={{"height":"300"}}>
              <div class="card  borderPurple">
                <h3 class="borderBottom"> 
                  <FontAwesomeIcon icon={faChartBar} /> Problem Overview
                </h3>           
                <>
                  <JsonList data={final_report["problem_overview"]} />
                </> 
              </div> 

              <div class="card borderPurple">
                <h3 class="borderBottom"> 
                  <FontAwesomeIcon icon={faChartBar} /> Prediction Strategy
                </h3>           
                <>
                  <JsonList data={final_report["prediction_strategy"]} />
                </>
              </div>
            </div>
          </div>        

          <div class="margin-10 card flexRow cardLong borderPurple">

          {isLoaded ? (
            <>
            <div style={{"marginRight":"20px", "width":"20%"}} class="margin-top-20">            
              <SimpleTreeView>
                <TreeItem itemId="pageDescription" label="Description">
                  <div class="flexRow flexStart">
                    <TreeItem onClick={()=>{setShowMarkdown(true);setHeading('Description');}} itemId={"description_key"} label="Description" />
                  </div>
                </TreeItem>
              </SimpleTreeView>

              <SimpleTreeView>   
                <TreeItem itemId="grid" label="Solution Tree">
                  {Object.keys(outoutData).map(each => {
                  return (
                    <>
                      <div class="flexRow flexStart">
                         <TreeItem onClick={()=>{setShowMarkdown(false);setDetails(each, outoutData[each]);setHeading(each.split("_").length ? (each.split("_").map(txt => (txt.split("_")[0].charAt(0).toUpperCase() + txt.split("_")[0].slice(1))).join(' ')) : each);}} itemId={each} label={(each.split("_").length ? (each.split("_").map(txt => (txt.split("_")[0].charAt(0).toUpperCase() + txt.split("_")[0].slice(1))).join(' ')) : each)} />
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
                         <TreeItem onClick={()=>{setShowMarkdown(false);setDetails(final_report[each]);setHeading(each.split("_").length ? (each.split("_").map(txt => (txt.split("_")[0].charAt(0).toUpperCase() + txt.split("_")[0].slice(1))).join(' ')) : each);}} itemId={"finalReport_"+each} label={(each.split("_").length ? (each.split("_").map(txt => (txt.split("_")[0].charAt(0).toUpperCase() + txt.split("_")[0].slice(1))).join(' ')) : each)} />
                      </div>                    
                    </>
                  );
                  })}   
                </TreeItem>
              </SimpleTreeView>
            </div>

            <div style={{"width":"80%"}}>
            {
            isLoaded ? (
            <>    
            <h3 class="borderBottom"> 
              <FontAwesomeIcon icon={faChartBar} /> {heading}
            </h3>           
            {!showMarkdown ? <>
              <p class="textInfo">
                <JsonList data={details} />
              </p>
            </> : 
              <ReactMarkdown children={mrkdown} />            
            }
            {/*<ChatARM style={{position: "absolute", bottom: "0px"}}  toggleDropDown={toggleDropDown} count = {0} toggleLoaded={toggleLoaded} isLoaded = {0}></ChatARM>*/}                 
            </>
            ) : 
            (<><CardSkeleton amount={1} /></>)
            }
            </div>


            </>
  ) : (<><CardSkeleton amount={1} /></>)}
          </div>
        </div>       
      </div>
      </div>
    </>
  );
}