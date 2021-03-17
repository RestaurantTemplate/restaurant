import React from 'react'

import IconButton from '@material-ui/core/IconButton'
import Badge from '@material-ui/core/Badge'
import LocalGroceryStoreSharpIcon from '@material-ui/icons/LocalGroceryStoreSharp'

export default function Cart() {
    return (
        <React.Fragment>
            <IconButton aria-label="show 4 new mails" color="inherit">
                <Badge badgeContent={4} color="secondary">
                    <LocalGroceryStoreSharpIcon />
                </Badge>
            </IconButton>
        </React.Fragment>
    )
}
