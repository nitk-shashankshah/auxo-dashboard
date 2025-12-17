import React, { useState, useRef, useEffect, lazy, Suspense } from 'react';
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
import { faBars, faArrowPointer, faBell, faCoffee, faFolder, faSearch, faUser, faBackspace, faCalendarAlt, faPaperclip, faAnchor, faAlarmClock, faUmbrella, faPaintbrush, faHand, faHandPointer, faTree, faCaretDown, faCode, faChartBar, faSquareRootVariable, faHandPointDown, faCaretUp, faCaretRight, faArrowRight, faArrowDown, faAngleRight, faAngleDown, faList, faFile } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ChatARM from './ChatARM';

import housing_final_report from './housing_04_11/deepresearch_report.json';

import JsonList from './JsonList';
import ReactMarkdown from 'react-markdown';
import SimpleSnackbar from './SimpleSnackbar';
import ExpandableCard from './ExpandableCard';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';

export default function DeepResearcher({ applyActiveLink }) {
  const [details, setDetails] = useState({});
  const [jsonData, setJsonData] = useState({});

  const [heading, setHeading] = useState('Description');
  const [showMarkdown, setShowMarkdown] = useState(true);
  const [mrkdown, setMrkdown] = useState('');
  const [isLoaded, setIsLoaded] = useState(true);

  function loadData(report_fl) {
    setJsonData(report_fl);
    setIsLoaded(false);
    setTimeout(() => {
      setIsLoaded(true);
    },1000);
    /*fetch(fl_name).then((response) => response.text()).then((text) => {
        setMrkdown(text);       
    });*/
  }

  applyActiveLink('researcher');

  return (
    <>
      <SimpleSnackbar></SimpleSnackbar>
      <div class="flexVertical">
        <div class="flexAround">
          <div className="projectPanel margin-10">
          <Card style={{width:"calc(100%)"}}>           
            <CardContent>
            {
            true ? (
            <>    
              <h5 style={{fontWeight:300, marginLeft: 10}}> 
                <FontAwesomeIcon icon={faCode} /> Deep Researcher
              </h5>
              <SimpleTreeView expandedItems={["grid"]}>   
                <TreeItem itemId="grid" label="Available Projects">
                  {['Housing Data'].map((each) => {                 
                     return (
                      <div>
                        <TreeItem itemId={each.split(' ').join('_')} label={each} onClick={()=>{loadData(housing_final_report);setIsLoaded(true);}} />
                      </div>
                    );                 
                  })}   
                </TreeItem>
              </SimpleTreeView>                     
            </>
            ) : 
            (<><CardSkeleton amount={1} /></>)
            }
</CardContent>
</Card>
</div>

<div class="flexVertical">           
          <div class="cardLong margin-10">
            <Card style={{width:"calc(100% - 10px)"}}>           
                  <CardContent>
                      {(isLoaded && Object.keys(jsonData).length >1)  ? (
                        <>
                        <div class="flexRow fullWidth fullHeight">
                          <div style={{"marginRight":"20px", "background":"#f9f9f9", "width":"20%"}}>
                          {/*<SimpleTreeView>
                            <TreeItem itemId="pageDescription" label="Description">
                              <div class="flexRow flexStart">
                                <TreeItem onClick={()=>{setShowMarkdown(true);setHeading('Description');}} itemId={"description_key"} label="Description" />
                              </div>
                            </TreeItem>
                          </SimpleTreeView>*/}      

                          <SimpleTreeView>
                            <TreeItem itemId="report" label="Report">
                              {Object.keys(jsonData).map(each => {
                              return (
                                <>
                                  <div class="flexRow flexStart">
                                    <TreeItem onClick={()=>{setShowMarkdown(false);setDetails(jsonData[each]);setHeading(each.split("_").length ? (each.split("_").map(txt => (txt.split("_")[0].charAt(0).toUpperCase() + txt.split("_")[0].slice(1))).join(' ')) : each);}} itemId={"finalReport_"+each} label={(each.split("_").length ? (each.split("_").map(txt => (txt.split("_")[0].charAt(0).toUpperCase() + txt.split("_")[0].slice(1))).join(' ')) : each)} />
                                  </div>                    
                                </>
                              );
                              })}   
                            </TreeItem>
                          </SimpleTreeView>
                        </div>

                        <div style={{"width":"80%", "textAlign":"left"}}>          
                        <CardActions disableSpacing>  
                          <h3 class="borderBottom"> 
                              <FontAwesomeIcon icon={faChartBar} />{heading}
                          </h3>             
                        </CardActions>
                        {!showMarkdown ? <>
                          <p class="textInfo">
                            <JsonList data={details} />
                          </p>
                        </> : 
                          <ReactMarkdown children={mrkdown} />            
                        }
                        </div>
                        </div>
                        </>
              ) : ((isLoaded && Object.keys(jsonData).length <1) ? <><p style={{padding:10}}> <FontAwesomeIcon icon={faArrowPointer} />Please select a project</p></> : <><CardSkeleton amount={1} /></>)}
                  </CardContent>    
                </Card>
          </div>

          <div class="margin-10 flexRow">
            
            <div style={{width:"33%"}}>
             {
             (Object.keys(jsonData).length>0) ? 
              <ExpandableCard txt={jsonData[Object.keys(jsonData)[0]]} heading={Object.keys(jsonData)[0]} myheight={500}></ExpandableCard>
              : null
            }
            </div>
            <div style={{width:"66%"}}>
              <div class="flexRow">
                <div style={{width:"49%"}}>
                  {(Object.keys(jsonData).length >1) ? <ExpandableCard txt={jsonData[Object.keys(jsonData)[1]]} heading={Object.keys(jsonData)[1]}></ExpandableCard>
                  :null}
                </div>
                <div style={{width:"49%"}}>
                  {(Object.keys(jsonData).length >2) ? <ExpandableCard txt={jsonData[Object.keys(jsonData)[2]]}  heading={Object.keys(jsonData)[2]}></ExpandableCard>
                  :null}
                </div>
              </div>
              <div class="margin-top-20 flexRow">              
                <div style={{width:"49%"}}>
                  {(Object.keys(jsonData).length >3) ? <ExpandableCard txt={jsonData[Object.keys(jsonData)[3]]}  heading={Object.keys(jsonData)[3]}></ExpandableCard>
                  :null}
                </div>
                <div style={{width:"49%"}}>
                  {(Object.keys(jsonData).length >4) ? <ExpandableCard txt={jsonData[Object.keys(jsonData)[4]]}  heading={Object.keys(jsonData)[4]}></ExpandableCard>
                  :null}
                </div>
              </div>
            </div>
           </div>

          </div>
        </div>       
      </div>
    </>
  );
}