import React,{useState} from 'react';
import {
    Grid,
    TextField,
    Button,
    Typography
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
export const Tablelist = (props) =>{
    const useStyles1 = makeStyles((theme) => ({
        root: {
            padding: theme.spacing(1),
        },
    }));
    const initialState = {
        name:'',
        desc:'',
        price:'',
        image_url:''
    }
    const [item, setitem] = useState(initialState)
    const onChangeValue = (e) =>{
        const {name,value} = e.target;
        setitem({...item,[name]:value});
    };
    const onUploadFile = (e) =>{
        console.log(e.target.files);
        setitem({...item,image_url:e.target.files[0]});
    };
    const {list,setlist} = props;
    const classes1 = useStyles1();
    return(
        <Grid container >
            <Grid item  md={12} className={classes1.root}>
                <TextField fullWidth name='name' variant="outlined" id="menu-name" label="ชื่อเมนู" value={item.name} onChange={onChangeValue}/>
            </Grid>
            <Grid item  md={12} className={classes1.root}>
                <TextField fullWidth name='desc' variant="outlined" id="menu-description" label="คำอธิบายเมนู" value={item.desc} onChange={onChangeValue}/>
            </Grid>   
            <Grid item  md={6} className={classes1.root}>
                <TextField fullWidth name='price' variant="outlined" id="menu-price" label="ราคา" value={item.price} onChange={onChangeValue}/>
            </Grid>
            <Grid item  md={12} className={classes1.root}>
                <div>
                    <Button
                        variant="contained"
                        component="label"
                    >
                        {'Upload File'}
                        <input
                            type="file"
                            onChange={onUploadFile}
                            hidden
                        />
                    </Button>                      
                    <Typography display={'inline'} style={{marginLeft:'10px'}}>
                        {item.image_url.name}
                    </Typography>                      
                </div>
                            
          
            </Grid>
        </Grid>                   

    );
}