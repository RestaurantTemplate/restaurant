import React, { useContext, useEffect,useState } from 'react'
import { Container, makeStyles, Paper } from '@material-ui/core'
import { ItemList, TextRecommend } from '../components'
import {Auth} from '../../../context/authContext';

import firebase from '../../../firebase/config'

const useStyles = makeStyles({
    container: { marginBottom: '50px' },

    paper: { padding: '20px' },
})

export const Recommend = () => {
    const {state} = useContext(Auth);
    const classes = useStyles()
    const {recommendList, setRecommendList} = useState([]) 
    const mockItem = {
        imgUrl: '',
        name: 'กระเพราไก่',
        quantity: 2,
    }
    const recommends = [mockItem, mockItem, mockItem]

    const fetchHistories = () => {


        firebase.getHistories(state.user.branchstore).onSnapshot(
            (snapshot) => {
                snapshot.forEach((doc) => {
                    var source = doc.metadata.hasPendingWrites
                        ? 'Local'
                        : 'Server'
                    // console.log(source, ' data: ', doc.data())
                    if (source === 'Server') {
                        
                    }
                })
            },
            function (error) {
                console.log('Orders Error:', error.message)
                // setIsLoading(false)
            })
    }

    useEffect(() => {
        fetchHistories()
    }, [])


    return (
        <Container className={classes.container}>
            <Paper elevation={5} className={classes.paper}>
                <TextRecommend />
                <ItemList items={recommends} />
            </Paper>
        </Container>
    )
}
