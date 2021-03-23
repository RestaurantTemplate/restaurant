import React, { useState, useEffect } from 'react'

import { makeStyles } from '@material-ui/core/styles'
import {
    Container,
    Paper,
    Typography,
    CircularProgress,
} from '@material-ui/core'

import firebase from '../../firebase/config'

import Table from './components/Table'
import BaseLayout from '../../components/BaseLayout'

const useStyles = makeStyles({
    paper: {
        padding: '20px',
    },
    textOrder: {
        marginBottom: '10px',
        textDecoration: 'underline',
    },
})

const Orders = (props) => {
    const [tables, setTables] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    const classes = useStyles()

    const fetchTables = () => {
        setIsLoading(true)
        // firebase.addOrders().then()
        firebase.getTable().onSnapshot(
            (snapshot) => {
                let data = []
                snapshot.forEach((doc) => {
                    var source = doc.metadata.hasPendingWrites
                        ? 'Local'
                        : 'Server'
                    // console.log(source, ' data: ', doc.data())
                    if (source === 'Server') {
                        data.push({
                            id: doc.id,
                            ...doc.data(),
                        })
                    }
                })
                setIsLoading(false)
                setTables(data)
                console.log('tables', data)
            },
            function (error) {
                console.log('Tables Error:', error.message)
                setIsLoading(false)
            }
        )
    }

    useEffect(() => {
        fetchTables()
    }, [])



    let tableItems = tables.map((table, index) => (
        <Table
            key={table.id}
            tableNumber={table.table_number}
            name={table.name}
            description={table.desc}
        />
    ))
    if (tables.length === 0 && isLoading) {
        tableItems = <CircularProgress />
    } else if (tables.length === 0) {
        tableItems = <Typography variant="h6">ไม่มีออเดอร์ในขณะนี้</Typography>
    }

    return (
        <BaseLayout>
            <Container>
                <Paper elevation={5} className={classes.paper}>
                    <Typography variant="h4" className={classes.textOrder}>
                        เช็คบิล
                    </Typography>
                    {tableItems}
                </Paper>
            </Container>
        </BaseLayout>
    )
}

export default Orders
