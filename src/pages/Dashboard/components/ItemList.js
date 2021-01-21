import { Container } from '@material-ui/core'
import { Item } from '.'

export const ItemList = (props) => {
    const { items } = props

    return (
        <Container>
            {items.map((item) => (
                <Item item={item} />
            ))}
        </Container>
    )
}
