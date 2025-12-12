import logo from './logo.svg';
import './App.css';
import { useState , Fragment} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faBell, faCoffee, faFolder, faSearch, faUser, faBackspace, faCalendarAlt, faPaperclip, faAnchor, faAlarmClock, faUmbrella, faPaintbrush, faHand, faHandPointer, faTree, faCaretDown, faCode, faChartBar, faSquareRootVariable, faHandPointDown, faCaretUp, faCaretRight, faArrowRight, faArrowDown, faAngleRight, faAngleDown, faList, faPlus } from '@fortawesome/free-solid-svg-icons';
import ChatGPTInterface from './ChatGPTInterface';
import 'react-loading-skeleton/dist/skeleton.css'
import UserLogin from './UserLogin';
import ExistingProjects from './ExistingProjects';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';


function MainPanel({toggleExpand, hideDropDown, isExpanded, toggleDropDown}){
  const [isLoaded, setIsLoaded] = useState(0);
  
  function toggleLoaded(isLoad){
     setIsLoaded(isLoad => !isLoad);
  };

  return (
    <>
    <div class="dashboardPanel">
      <div style={{width:"100%", borderRadius:50}}>
          <div style={{paddingBottom:0, cursor: "pointer", paddingRight:10, paddingTop:10,marginTop:10, paddingBottom:10, paddingLeft:20 }}>
            {(isExpanded ? <FontAwesomeIcon style={{fontSize:18}} icon={faAngleDown} /> : <FontAwesomeIcon style={{fontSize:18}} icon={faAngleRight} /> )}
            <span onClick={() => toggleExpand(isExpanded)} class="borderBottom" style={{fontWeight: 100}}> 
              Click here to begin
            </span>
          </div>
          {
          <div>
            {isExpanded ? (
            <>
              <div style={isExpanded ? {height:"unset"} : {height:0}} id="textBox">
                <ChatGPTInterface toggleDropDown={toggleDropDown} hideDropDown = {hideDropDown} toggleLoaded={toggleLoaded} isLoaded = {isLoaded}></ChatGPTInterface>   
              </div>
              <div style={{width:"98%",  paddingTop:0, textAlign: "center"}}>
                <span className="hint-text">
                  &nbsp;&nbsp;Start a conversation by typing a message below. Press Enter to send, Shift + Enter for new line
                </span>
              </div>
            </>
            ) : ""}
          </div>
          }
      </div>
    </div>
    </>
  )
}

function Header({hideDropDown, toggleDropDown}){
  return <div>
    <div class="appHeader flexRow">
      <div class="flexRow">
      <button class="btn"><FontAwesomeIcon icon={faBars} style={{fontSize:30}}/></button>
      <div class="logo"></div> 
      </div>
      {/*<div class="searchBox">
        <input type="search" id="search_query" name="q" placeholder="Enter your search terms"></input>
        <button class="searchBtn"><FontAwesomeIcon icon={faSearch} /></button>
      </div>*/}
      <div>
        <button class="btn"><FontAwesomeIcon style={{fontSize:18, marginTop: 5}} icon={faBell}/></button>
        <UserLogin hideDropDown={hideDropDown} toggleDropDown={toggleDropDown}/>
      </div>

    </div>
   <div class="topNavigation">
        <ul>
          <li><a>Business Discovery</a></li>
          <li><a>Deep Researcher</a></li>
          <li><a>Data Discovery and Master Data Preperation</a></li>
          <li><a>EDA Engine</a></li>
          <li><a>ML Engine</a></li>
          <li><a>Memory Bank</a></li>
        </ul>
    </div>
  </div>
}

function LeftPanel({menuIcons}){
  return <div class="leftPanel">
    {<ul class="navMenu">
      <li>
        <div class="addAction">
        <Link to="/"><FontAwesomeIcon style={{"color" : '#fff', fontSize: 18}} icon={faPlus} /></Link>
        </div>
      </li>
      <li class="iconMenu">
        <Link to="/existing"><FontAwesomeIcon style={{"color" : '#fff'}} icon={faList} /></Link>        
      </li>      
    </ul>}
  </div>
}

export default function App() {
  const [isExpanded, setIsExpanded] = useState(1);
  const [hideDropDown, setHideDropDown] = useState(false);
  const [menuIcons, setMenuIcons] = useState([{
    'name':'Home',
    'url':'./folder.png'
  }, {
    'name':'Action',
    'url':'./folder.png'
  }, {
    'name':'Action',
    'url':'./folder.png'
  }, {
    'name':'Action',
    'url':'./folder.png'
  }, {
    'name':'Action',
    'url':'./folder.png'
  }, {
    'name':'Action',
    'url':'./folder.png'
  }, {
    'name':'Action',
    'url':'./folder.png'
  }]);  

  function toggleExpanded(isExpanded){
    setIsExpanded(isExpanded => !isExpanded);
  };

  function toggleDropDown(){
    setHideDropDown(!hideDropDown);
  };

  return (
    <div className="main" onClick={(event) => {
      if (event.target.className!=="dropdown-item"){
       toggleDropDown(0);
      };
      event.stopPropagation();
    }}>
      <Header toggleDropDown={toggleDropDown} hideDropDown={hideDropDown} />
     

      <BrowserRouter>
       <div class="flexRow">
        <LeftPanel menuIcons={menuIcons}></LeftPanel>
        <Routes>
        <Route path="/" element={<MainPanel toggleExpand={toggleExpanded} toggleDropDown={toggleDropDown} hideDropDown={hideDropDown} isExpanded = {isExpanded} />} />
        <Route path="/existing" element={<ExistingProjects />} />
        </Routes>
        </div>     
      </BrowserRouter>

    </div>
  );
}