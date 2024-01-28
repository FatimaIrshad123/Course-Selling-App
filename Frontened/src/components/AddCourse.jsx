import { Card, TextField ,Typography} from "@mui/material"
import Button from '@mui/material/Button';
import { useState } from "react";

export default function AddCourse(){
    const [title,setTitle] = useState('')
    const [description,setDescription] = useState('')
    const [price,setPrice] = useState(0)
    return (
        <div style={{paddingTop:10}}>
            <center>
                <div style={{paddingTop:100,paddingBottom: 25}}>
                    <Typography variant={"h4"}> Create Course</Typography>
                </div>
            </center>
        <center>
            <Card variant="outlined" style = {{border: '2px solid black',width:400,padding:20}}>
            <TextField 
                id={'title'}
                label="Title" 
                variant="outlined"
                type="text" 
                fullWidth={true} 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
          <br /><br />
          <TextField 
            id={'description'}
            label="Description" 
            variant="outlined"
            type="text" 
            fullWidth={true} 
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            />
          <br /><br />
          <TextField 
            id={'title'}
            label="Title" 
            variant="outlined"
            type="number" 
            fullWidth={true} 
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            />
            <br /><br />
            <Button 
              variant="contained" size={"larger"} onClick={() => {
                function callback2(data){
                    localStorage.setItem('token',data.token)
                  }
                  function callback1(res){
                    res.json().then(callback2)
                  }
                fetch('http://localhost:3000/admin/addcourses',{method:'POST',
                  body:JSON.stringify({
                    title,
                    description,
                    price,
                    published : true
                  }),
                  headers: {
                    'Content-Type': 'application/json',
                    'Authorization' : localStorage.getItem('token')
                  }}).then(callback1)
               }}>Add Course</Button>
            </Card>
        </center>
     </div>
    )
}
