import React from 'react';
import AddIcon from '@material-ui/icons/Add';
import {
    Grid,
    Fab,
    Box
} from '@material-ui/core';
export const AddTable = (props) =>{
    const {setopen} = props;      
    return(
        <>
            <Grid container alignItems="center" >
                <Grid  container justify="right" alignItems="right" xs={2}>
                    <Box component='div'>
                        <Fab  component="button" justify="center" alignItems="center" size={'small'}  color="primary" aria-label="add" onClick={() => setopen(true)}>
                            <AddIcon />
                        </Fab>
                    </Box>
                </Grid>
            </Grid>
        </>
    );
}
