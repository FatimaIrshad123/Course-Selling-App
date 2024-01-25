import { Typography } from "@mui/material";
import Button from '@mui/material/Button';
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Appbar(){
    const [user,setuser] = useState(null)
    useEffect(() => {
        function callback2(data){
            console.log(data);
            console.log(data.user.username);
            if (data.user.username){
                setuser(data.user.username)
            }
          }

          function callback1(res){
            res.json().then(callback2)
          }
        fetch('http://localhost:3000/admin/me',{method:'GET',
            headers:{'Authorization' : localStorage.getItem('token')}
        }).then(callback1)
    },[])

    if (user){
        return (
            <div style={{display:'flex',justifyContent:'space-between'}}>
                <div>
                    <Typography><Link to={'/courses'}>Courses</Link></Typography>
                </div>
                <div style={{marginRight:10}}>
                    <Button variant="contained" style={{marginRight:10}}><Link to={'/'}>Home</Link></Button>
                    <Button variant="contained"style={{marginRight:10}}><Link to={'/login'}>{user}</Link></Button>
                    <Button variant="contained" style={{marginRight:10}}><Link to={'/addcourse'}>Create Courses</Link></Button>
                    <Button variant="contained" style={{marginRight:10}}><Link to={'/signup'}>Logout</Link></Button>
                </div>
            </div>
        )
    }       
    
    return (
        <div style={{display:'flex',justifyContent:'space-between'}}>
            <div>
                <Typography>Courses</Typography>
            </div>
            <div style={{marginRight:10}}>
                <Button variant="contained" style={{marginRight:10}}><Link to={'/'}>Home</Link></Button>
                <Button variant="contained"style={{marginRight:10}}><Link to={'/login'}>Sign in</Link></Button>
                <Button variant="contained" style={{marginRight:10}}><Link to={'/signup'}>Sign up</Link></Button>
            </div>
        </div>
    )
}