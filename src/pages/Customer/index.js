import React, { useState } from 'react'

import { Tabmenu, Dialoglist } from './containers'
import BaseLayout from '../../components/BaseLayout'
import './style.css'
function Customer(props) {
    const [list, setlist] = useState([])
    const [open, setopen] = useState(false)

    return (
        <React.Fragment>
            {/* <Layoutbar isSidebar={true} topath={link} isNotification={true} setopenmenu={setopen} menu={list}> */}
            <BaseLayout setopenmenu={setopen} menu={list}>
                <Tabmenu menu={list} setmenu={setlist} />
            </BaseLayout>

            {/* </Layoutbar> */}
            <Dialoglist
                open={open}
                setopen={setopen}
                list={list}
                setlist={setlist}
            />
        </React.Fragment>
    )
}

export default Customer
