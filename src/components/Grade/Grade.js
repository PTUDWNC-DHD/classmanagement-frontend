import { Button, Typography } from '@mui/material'
import React ,{useState,useEffect} from 'react'
import {FormControlLabel} from '@mui/material';
import {Radio} from '@mui/material';

import { useHistory } from 'react-router-dom';

import "./user_form.css"


import axios from "axios"
function Grade() {
    


    return (  
      <div className="submit">
        <div className="user_form">
            <div className="user_form_section">
                <div className="user_title_section">
                    <Typography style={{fontSize:"26px"}} ></Typography>
                    <Typography style={{fontSize:"15px"}} ></Typography>

                </div>
              
                
                
                    <div className="user_form_questions">
                    <Typography  style={{fontSize:"15px",fontWeight:"400",letterSpacing: '.1px',lineHeight:'24px',paddingBottom:"8px",fontSize:"14px"}} ></Typography>
            <div className="user_form_submit">
              <Button  variant="contained" color="primary"  style={{fontSize:"14px"}}>Submit</Button>

            </div>
       
            <div className="user_footer">
                Google Forms
            </div>
            </div>
            
        </div>
        </div>
        </div>
    )
}

export default Grade;