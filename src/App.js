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
import Dropdown from './Dropdown';
import { counter } from '@fortawesome/fontawesome-svg-core';

function MainPanel({toggleExpand, count, isExpanded, toggleDropDown}){
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
                <ChatGPTInterface toggleDropDown={toggleDropDown} count = {count} toggleLoaded={toggleLoaded} isLoaded = {isLoaded}></ChatGPTInterface>   
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

function Header({toggleDropDown, count}){
  return <div>
    <div class="appHeader flexRow">
      <div class="flexRow">
      <button class="btn"><FontAwesomeIcon icon={faBars} style={{fontSize:24}}/></button>
      <div class="logo"></div> 
      </div>
      {/*<div class="searchBox">
        <input type="search" id="search_query" name="q" placeholder="Enter your search terms"></input>
        <button class="searchBtn"><FontAwesomeIcon icon={faSearch} /></button>
      </div>*/}
      <div>
        <button class="btn bellIcon"><FontAwesomeIcon style={{fontSize:18, marginTop: 5}} icon={faBell}/></button>
        <UserLogin count={count} toggleDropDown={toggleDropDown}/>
      </div>

    </div>  
  </div>
}

function LeftPanel(){
  return <div class="leftPanel">
    {<ul class="navMenu">
      <li>
        <div class="addAction">
        <Link to="/"><FontAwesomeIcon style={{"color" : '#fff', fontSize: 14, marginTop:5}} icon={faPlus} /></Link>
        </div>
      </li>
      <li class="iconMenu">
        <Link to="/existing" ><FontAwesomeIcon style={{"color" : 'rgba(255,255,255,0.5)',  marginLeft:5, fontSize: 20}}  icon={faList} /></Link>
      </li>      
      <li class="iconMenu">    
        <FontAwesomeIcon icon={faCalendarAlt}  style={{ marginLeft:5, fontSize: 20 }}/>
      </li>
      <li class="iconMenu">
        <FontAwesomeIcon icon={faCoffee}  style={{ marginLeft:5, fontSize: 20 }}/>
      </li>
    </ul>}
  </div>
}

export default function App() {
  const [isExpanded, setIsExpanded] = useState(1);
  const [countUser, setCountUser] = useState(false);
  const [count, setCount] = useState(false);

  function toggleDropDown(val) {
    setCount(val);
  }

  function toggleDropDownUser(val) {
    setCountUser(val);
  }


  function toggleExpanded(isExpanded){
    setIsExpanded(isExpanded => !isExpanded);
  };


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

  return (
    <>
    <Header toggleDropDown={toggleDropDownUser} count={countUser} />
    <div class="flexRow">
     <BrowserRouter>
     <LeftPanel />
     <div className="main" onClick={(event) => {
          if (event.target.className!=="dropdown-item" && event.target.className!=="userLogin" && event.target.className!=="dropdown-btn"){
            toggleDropDown(false);
            toggleDropDownUser(false);
          };
          event.stopPropagation();
        }}>
        <div class="flexRow">
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
        <div class="flexRow">
            <Routes>
                <Route path="/" element={<MainPanel toggleExpand={toggleExpanded} toggleDropDown={toggleDropDown} count={count} isExpanded = {isExpanded} />} />
                <Route path="/existing" element={<ExistingProjects isLoaded={true} />} />
            </Routes>                         
        </div>
      </div>
      </BrowserRouter>
    </div>
    </>    
  );
}