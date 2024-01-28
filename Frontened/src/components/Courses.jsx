import { useEffect, useState } from "react"
import { Typography } from "@mui/material";
import Card from '@mui/material/Card';

export default function Courses(){
    const [data,setData] = useState('')
    useEffect(() => {
        function callback2(data){        
            for (let i in data){
              setData(data[i].map(x => {return (
                <div key={x._id} >
                  <Card>
                      <Typography variant={"h4"}> {x.title}</Typography>
                      <Typography variant={"h5"}> {x.description}</Typography>
                      <Typography variant={"h6"}> {x.price}</Typography>
                      <br></br>
                  </Card>
                </div>
                )}))
            }}
          function callback1(res){
            res.json().then(callback2)
          }
        fetch('http://localhost:3000/admin/courses',{method:'GET',
            headers:{'Authorization' : localStorage.getItem('token')}
        }).then(callback1)
    },[])
    return(
         <center>   
                <div style = {{border: '2px',width:400,padding:20, marginTop:30, backgroundColor:'white'}}>
                      {data}
                </div>
        </center>
    )
}
