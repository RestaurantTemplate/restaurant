import React,{useState,useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import {
    Grid,
    TextField,
    Fab,
    Typography
} from '@material-ui/core';
const useStyleslocal = makeStyles((theme) => ({
    Font: {
        [theme.breakpoints.up('xs')]: {
            fontSize:"8px"
        },
        [theme.breakpoints.up('sm')]: {
            fontSize:"15px"
        },
    },
    icons: {
        [theme.breakpoints.down('sm')]: {
            width:"20px",
            height:"20px"
        },

    },
    textStyle: {
        [theme.breakpoints.down('sm')]: {
            height:"20px",
            fontSize:"10px",
        },
    },
    textNopadding: {
        paddingLeft:"1px",
        paddingRight:"1px",
    },
    buttonStyle: {
        [theme.breakpoints.down('xs')]: {
            height:"20px",
            width:"20px",
            maxheight:"20px",
            maxwidth:"20px",
        },
    },
}));
export const Menu = (props) =>{
    const {menu,setmenu,fooditem} = props;
    const [price, setprice] = useState(0)
    const [count, setcount] = useState(1)
    const classesLocal = useStyleslocal()
    useEffect(() => {
        if(count === undefined || count === null || count === ""){
            setprice(0)
        }
        else{
            setprice(fooditem.price * parseInt(count))            
        }
    }, [count, fooditem.price]);
    return(
        <>
            <Grid container alignItems="center" style={{backgroundColor:'#e7e7e7'}} >
                <Grid container xs={3} >
                    <img src={fooditem.image} style={{width:"80%",heigt:"80%"}} alt="" />
                </Grid>
                <Grid container xs={3}>
                    <Typography className={classesLocal.Font}><b>{fooditem.name}</b></Typography>
                    <Typography className={classesLocal.Font} style={{color:'#737373'}}>{fooditem.desc}</Typography>
                </Grid>
                <Grid container xs={4}>
                    <Grid item xs={4}>
                        <Typography className={classesLocal.Font} style={{color:'#737373'}}>{"ราคา"}</Typography>
                        <Typography className={classesLocal.Font} style={{color:'#737373'}}>{"จำนวน"}</Typography>                                                    
                    </Grid>
                    <Grid item xs={8}>
                        <Typography className={classesLocal.Font} style={{color:'#737373'}}>{price+" THB"}</Typography>
                        <TextField InputLabelProps={{className:classesLocal.textNopadding}}  InputProps={{className: classesLocal.textStyle}} size="small" variant="standard" defaultValue={1} value={count} onChange={(e) => (/\d/).test(e.target.value) ? (setcount(e.target.value),console.log(e.target.value,(/\d/).test(e.target.value))) : (setcount(count),console.log(e.target.value)) } />                                                   
                    </Grid>
                </Grid>
                <Grid container justify="center" alignItems="center" xs={2}>
                    <Fab  component="button" justify="center" alignItems="center" size={'small'}  color="primary" aria-label="add" onClick={() => setmenu([...menu,{name:fooditem.name,count:count,price:price}])} >
                        <AddIcon />
                    </Fab>
                </Grid>
            </Grid>
        </>
    );

}