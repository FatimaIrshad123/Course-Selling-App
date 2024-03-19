import { TextField, Typography } from "@mui/material";
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { useState } from "react";

export default function Signup() {
    const [username,setUsername] = useState('')
    const [password,setpassword] = useState('')
    return (
      <div>
        <center>
          <div style={{paddingTop:150,paddingBottom: 25}}>
            <Typography variant={"h4"}> Welcome </Typography>
          </div>
        </center>
        <center> 
        <Card variant="outlined" style = {{border: '2px solid black',width:400,padding:20}}>
          <TextField 
                label="Username" 
                variant="standard" 
                fullWidth={true} 
                id = {'username'}
                type="text" 
                value={username}
                onChange={e => setUsername(e.target.value)}/>
          <br /><br />
           <TextField 
                label="Password" 
                variant="standard" 
                id = {'password'}
                fullWidth={true} 
                type="password" 
                value={password}
              onChange={e => setpassword(e.target.value)}/>
          <br /><br />
          <Button 
              variant="contained" 
              size={"larger"} 
              onClick={() => {
                function callback2(data){
                  localStorage.setItem('token',data.token)
                    alert(data.msg)
                }
                function callback1(res){
                  res.json().then(callback2)
                }
                fetch('http://localhost:3000/admin/signup',{method:'POST',
              body:JSON.stringify({
                username,
                password
              }),
              headers: {
                'Content-Type': 'application/json'
              }
            }).then(callback1)
            }}>
              Sign up
            </Button>
        </Card>
        </center>
      </div>
    )
  }
  
 
