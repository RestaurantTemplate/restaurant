import React,{useState,useContext,useEffect} from 'react'
import {Dialog,DialogTitle,DialogActions,Button,DialogContent} from '@material-ui/core'
import {useMaindishContext} from './../../../context/maindishesContext';
import {Auth} from './../../../context/authContext';
import {uploadImageMaindish,addMaindish} from './../../../firebase/maindishesFirebase';
import {uploadImageAppetizer,addAppetizers} from './../../../firebase/appetizersFirebase';
import {uploadImageDessert,addDesserts} from './../../../firebase/dessertsFirebase';
import {uploadImageDrink,addDrinks} from './../../../firebase/drinksFirebase';
import firebase from './../../../firebase/config';
export const DialogValue = ({children,...props}) =>{
    const { setalert,onClose, open ,setopen,number } = props;
    const {maindish,maindishAction} = useMaindishContext();
    const {state} = useContext(Auth);
    const onAddlist = async() => {
        console.log(number)
        if(number === '1'){
            const task = uploadImageMaindish(state.user.branchstore,maindish.image_url).put(maindish.image_url)
            task.on(
                "state_changed",
                snapshot => {
                  const progress = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                  );
                  console.log('[loading..]:',progress);
                },
                error => {
                  console.log(error);
                },
                () => {
                    uploadImageMaindish(state.user.branchstore,maindish.image_url)
                    .getDownloadURL()
                    .then(url => {
                        let _maindish = {
                            name: maindish.name,
                            desc: maindish.desc,
                            foodEnable:true,
                            image_url: url,
                            price: maindish.price,
                        }
                        addMaindish(_maindish,state.user.branchstore).then(()=>{
                            const initialMaindish = {
                                name:'',
                                desc:'',
                                foodEnable:true,
                                price:'',
                                image_url:''
                            }
                            maindishAction.addAllState(initialMaindish);
                            setalert(prevState =>({...prevState,open:true,text:'เพิ่มเมนูสำเร็จ',colorNotify:'success'}));
                            setopen(false)
    
                        })
                        .catch(function(error) {
                            console.error("Error adding Tutorial: ", error);
                            setalert(prevState =>({...prevState,open:true,text:'เพิ่มเมนูไม่สำเร็จ',colorNotify:'error'}));
                        });
                    });
                }
            );
        }
        else if(number === '2'){
            const task = uploadImageAppetizer(state.user.branchstore,maindish.image_url).put(maindish.image_url)
            task.on(
                "state_changed",
                snapshot => {
                  const progress = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                  );
                  console.log('[loading..]:',progress);
                },
                error => {
                  console.log(error);
                },
                () => {
                    uploadImageAppetizer(state.user.branchstore,maindish.image_url)
                    .getDownloadURL()
                    .then(url => {
                        let _maindish = {
                            name: maindish.name,
                            desc: maindish.desc,
                            foodEnable:true,
                            image_url: url,
                            price: maindish.price,
                        }
                        addAppetizers(_maindish,state.user.branchstore).then((test)=>{
                            const initialMaindish = {
                                name:'',
                                desc:'',
                                foodEnable:true,
                                price:'',
                                image_url:''
                            }
                            maindishAction.addAllState(initialMaindish);
                            setalert(prevState =>({...prevState,open:true,text:'เพิ่มเมนูสำเร็จ',colorNotify:'success'}));
                            setopen(false)
    
                        })
                        .catch(function(error) {
                            console.error("Error adding Tutorial: ", error);
                            setalert(prevState =>({...prevState,open:true,text:'เพิ่มเมนูไม่สำเร็จ',colorNotify:'error'}));
                        });
                    });
                }
            );
        }
        else if(number === '3'){
            const task = uploadImageDessert(state.user.branchstore,maindish.image_url).put(maindish.image_url)
            task.on(
                "state_changed",
                snapshot => {
                  const progress = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                  );
                  console.log('[loading..]:',progress);
                },
                error => {
                  console.log(error);
                },
                () => {
                    uploadImageDessert(state.user.branchstore,maindish.image_url)
                    .getDownloadURL()
                    .then(url => {
                        let _maindish = {
                            name: maindish.name,
                            desc: maindish.desc,
                            foodEnable:true,
                            image_url: url,
                            price: maindish.price,
                        }
                        addDesserts(_maindish,state.user.branchstore).then((test)=>{
                            const initialMaindish = {
                                name:'',
                                desc:'',
                                foodEnable:true,
                                price:'',
                                image_url:''
                            }
                            maindishAction.addAllState(initialMaindish);
                            setalert(prevState =>({...prevState,open:true,text:'เพิ่มเมนูสำเร็จ',colorNotify:'success'}));
                            setopen(false)
    
                        })
                        .catch(function(error) {
                            console.error("Error adding Tutorial: ", error);
                            setalert(prevState =>({...prevState,open:true,text:'เพิ่มเมนูไม่สำเร็จ',colorNotify:'error'}));
                        });
                    });
                }
            );
        }
        else if(number === '4'){
            const task = uploadImageDrink(state.user.branchstore,maindish.image_url).put(maindish.image_url)
            task.on(
                "state_changed",
                snapshot => {
                  const progress = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                  );
                  console.log('[loading..]:',progress);
                },
                error => {
                  console.log(error);
                },
                () => {
                    uploadImageDrink(state.user.branchstore,maindish.image_url)
                    .getDownloadURL()
                    .then(url => {
                        let _maindish = {
                            name: maindish.name,
                            desc: maindish.desc,
                            foodEnable:true,
                            image_url: url,
                            price: maindish.price,
                        }
                        addDrinks(_maindish,state.user.branchstore).then((test)=>{
                            const initialMaindish = {
                                name:'',
                                desc:'',
                                foodEnable:true,
                                price:'',
                                image_url:''
                            }
                            maindishAction.addAllState(initialMaindish);
                            setalert(prevState =>({...prevState,open:true,text:'เพิ่มเมนูสำเร็จ',colorNotify:'success'}));
                            setopen(false)
    
                        })
                        .catch(function(error) {
                            console.error("Error adding Tutorial: ", error);
                            setalert(prevState =>({...prevState,open:true,text:'เพิ่มเมนูไม่สำเร็จ',colorNotify:'error'}));
                        });
                    });
                }
            );
        }
    };
    return(
        <Dialog maxWidth='md' fullWidth={true} onClose={onClose} aria-labelledby="simple-dialog-title" open={open}>
            <DialogTitle id="simple-dialog-title">{'เพิ่มเมนู'}</DialogTitle>
            <DialogContent>
                {children}
            </DialogContent>
            <DialogActions>
                <Button autoFocus onClick={onAddlist} color="primary" >
                    {'เพิ่มเมนู'}
                </Button>
                <Button autoFocus onClick={onClose} color="primary" >
                    {'ย้อนกลับ'}
                </Button>
            </DialogActions>
        </Dialog>        
    )

}