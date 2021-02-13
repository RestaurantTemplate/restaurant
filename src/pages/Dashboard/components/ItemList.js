import * as React from 'react'
import { Item } from '.'

export const ItemList = (props) => {
    const { items } = props

    return (
        <React.Fragment>
            {items.map((item, i) => (
                // TODO: change key from index to id from firebase
                <Item key={i} item={item} />
            ))}
        </React.Fragment>
    )
}
