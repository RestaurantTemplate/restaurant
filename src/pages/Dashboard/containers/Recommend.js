import React, { useContext, useEffect,useState } from 'react'
import { Container, makeStyles, Paper } from '@material-ui/core'
import { ItemList, TextRecommend } from '../components'
import {Auth} from '../../../context/authContext';

import firebase from '../../../firebase/config'
import { getAllAppetizers } from '../../../firebase/appetizersFirebase';
import { getAllMaindishes } from '../../../firebase/maindishesFirebase';
import { getAllDesserts } from '../../../firebase/dessertsFirebase';
import { getAllDrinks } from '../../../firebase/drinksFirebase';

const useStyles = makeStyles({
    container: { marginBottom: '50px' },

    paper: { padding: '20px' },
})

export const Recommend = () => {
    const {state} = useContext(Auth);
    const classes = useStyles()
    const [recommendList, setRecommendList] = useState([]) 
    const mockItem = {
        imgUrl: '',
        name: 'กระเพราไก่',
        quantity: 2,
    }
    const recommends = [mockItem, mockItem, mockItem]

    const fetchHistories = async() => {
        let arr = []
        new Promise(async(resolutionFunc,rejectionFunc) => {
            setTimeout(async() => {
                await firebase.getHistories(state.user.branchstore).onSnapshot(
                    async(snapshot) => {
                        await snapshot.docs.forEach(async(doc) => {
                            await doc.data().orders.forEach(async(data) => {
                                await data.items.forEach(async(item) => {
                                    if(arr.length === 0){
                                        arr.push({id:item.id,amount:item.amount})
                                    }
                                    else{
                                        let arrIndex = arr.findIndex((element) => element.id === item.id);
                                        if(arrIndex !== -1){
                                            arr[arrIndex].amount = arr[arrIndex].amount + item.amount;
                                        }
                                        else{
                                            arr.push({id:item.id,amount:item.amount})
                                        }
                                    }
                                })
                            })
                        })
                        await resolutionFunc(arr.sort(function(val,val1){
                                return val1.amount - val.amount
                            }));
                    },
                    function (error) {
                        console.log('Orders Error:', error.message)
                        // setIsLoading(false)
                    }
                )
            }, 100);
        }).then((val)=>{
            let arrData = []
            setTimeout(async() => {
                new Promise(async(resolutionFunc,rejectionFunc) => {
                    await val.forEach(async(doc) => {
                        let dataMaindishes = await getAllMaindishes(state.user.branchstore).doc(doc.id).get().then(snapshot => snapshot.data())
                        if(dataMaindishes){
                            // console.log('getHistories:',dataMaindishes)
                            await arrData.push({
                                imgUrl: dataMaindishes.image_url,
                                name: dataMaindishes.name,
                                quantity: doc.amount,
                            })
                        }
                        let dataAppetizers = await getAllAppetizers(state.user.branchstore).doc(doc.id).get().then(snapshot => snapshot.data())
                        if(dataAppetizers){
                            // console.log('getHistories:',dataAppetizers)
                            await arrData.push({
                                imgUrl: dataAppetizers.image_url,
                                name: dataAppetizers.name,
                                quantity: doc.amount,
                            })
                        }
                        let dataDesserts = await getAllDesserts(state.user.branchstore).doc(doc.id).get().then(snapshot => snapshot.data())
                        if(dataDesserts){
                            // console.log('getHistories:',dataDesserts)
                            await arrData.push({
                                imgUrl: dataDesserts.image_url,
                                name: dataDesserts.name,
                                quantity: doc.amount,
                            })
                        }
                        let dataDrinks = await getAllDrinks(state.user.branchstore).doc(doc.id).get().then(snapshot => snapshot.data())
                        if(dataDrinks){
                            // console.log('getHistories:',dataDrinks)
                            await arrData.push({
                                imgUrl: dataDrinks.image_url,
                                name: dataDrinks.name,
                                quantity: doc.amount,
                            })
                        }
                        await resolutionFunc(arrData.sort(function(val,val1){
                            return val1.quantity - val.quantity
                        }))
                    });
                    // console.log('getHistories:',arrData)
                    
                }).then((value)=>{
                    console.log('getHistories:',value)
                    let valCut = value.slice(0,3)
                    setRecommendList(valCut)
                })
            }, 100);

        });
    }

    useEffect(() => {
        fetchHistories()
    }, [])


    return (
        <Container className={classes.container}>
            <Paper elevation={5} className={classes.paper}>
                <TextRecommend />
                <ItemList items={recommendList} />
            </Paper>
        </Container>
    )
}
