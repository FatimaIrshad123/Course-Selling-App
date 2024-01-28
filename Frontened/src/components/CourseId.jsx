import { useState ,useEffect} from "react"
import { useParams } from "react-router-dom"
import { Typography, TextField, Button } from "@mui/material";
import Card from '@mui/material/Card';

export default function CourseId(){
    let {courseid} = useParams()
    const [data,setData] = useState('')
    const [title,setTitle] = useState('')
    const [description,setDescription] = useState('')
    const [price,setPrice] = useState(0)

    useEffect(() => {
        function callback2(data){        
            for (let i in data){
              setData(data[i].map(x => {
                if (x._id === courseid){
                    return (
                        <center>
                            <div key={x._id} >
                                <Card>
                                    <Typography variant={"h4"}> {x.title}</Typography>
                                    <Typography variant={"h5"}> {x.description}</Typography>
                                    <Typography variant={"h6"}> {x.price}</Typography>
                                    <br></br>
                                </Card>
                             </div>
                        </center>
                        )}
                else{
                    'No Course Found'
                }
            })
        )}}
    function callback1(res){
        res.json().then(callback2)
    }
    fetch('http://localhost:3000/admin/courses',{method:'GET',
       headers:{'Authorization' : localStorage.getItem('token')}
     }) .then(callback1)
  },[])
    return (
        <div  style = {{border: '2px',width:400,padding:20, marginTop:30, backgroundColor:'white'}} key={courseid}>          
            {data}
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
           <Button variant="contained" onClick={() => { 
                function callback2(data){
                    alert('Course updated successfully');
                  }
                  function callback1(res){
                    res.json().then(callback2)
                  } 
                fetch(`http://localhost:3000/admin/courses/${courseid}`,{method:'POST',
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
            }}> Update</Button>
        </div>
    )
}
