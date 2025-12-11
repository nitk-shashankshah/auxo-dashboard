import React, {useState, useRef } from "react";
import "./Dropdown.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown , faFile, faImage, faPaperclip, faSun } from '@fortawesome/free-solid-svg-icons';
import { Send, Paperclip, X } from 'lucide-react';

const Dropdown = () => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [files, setFiles] = useState([]);
  const [messages, setMessages] = useState([]);
  const fileInputRef = useRef(null);
  const textareaRef = useRef(null);

  const handleFileSelect = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles(prev => [...prev, ...selectedFiles]);
    setOpen(false);
  };

  const removeFile = (index) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    if (message.trim() || files.length > 0) {
      setMessages(prev => [...prev, {
        text: message,
        files: files.map(f => f.name),
        timestamp: new Date().toLocaleTimeString()
      }]);
      setMessage('');
      setFiles([]);
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleTextareaChange = (e) => {
    setMessage(e.target.value);
    e.target.style.height = 'auto';
    e.target.style.height = Math.min(e.target.scrollHeight, 200) + 'px';
  };

  return (
    <div className="dropdown">
      <button className="dropdown-btn" onClick={() => setOpen(!open)}>
        <FontAwesomeIcon style={{fontSize:12}} icon={faPaperclip} /> Attach  <FontAwesomeIcon style={{fontSize:12}} icon={faAngleDown} /> 
      </button>

      {open && (
        <ul className="dropdown-menu">
          <li className="dropdown-item"><FontAwesomeIcon style={{fontSize:12, marginTop:2}} icon={faFile}/>          
           <input
              ref={fileInputRef}
              type="file"
              multiple
              onChange={handleFileSelect}
              className="hidden"
              visibility="hidden"
           />          
          </li>
          <li className="dropdown-item"><FontAwesomeIcon style={{fontSize:12, marginTop:2}} icon={faImage} /> &nbsp;Image</li>
          <li className="dropdown-item"><FontAwesomeIcon style={{fontSize:12, marginTop:2}} icon={faSun} /> &nbsp;Others</li>         
        </ul>
      )}

      {files.map((file, idx) => (
                <div key={idx} className="margin-top-20">
                  <Paperclip size={14} /> &nbsp;
                  <span className="text-gray-700">{file.name}</span>
                  &nbsp;<button
                  style={{background:"transparent", border:"1px solid #ccc", borderRadius:30}}                  
                    onClick={() => removeFile(idx)}                                    
                  >
                    <X size={12} />
                  </button>
                </div>
        ))}       
    </div>
  );
};

export default Dropdown;