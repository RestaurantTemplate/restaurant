import * as React from 'react'
import { Menu } from '.'

export const MenuList = ({ menuList }) => {
    return (
        <>
            {menuList.map((menu) => (
                <Menu menu={menu} />
            ))}
        </>
    )
}
