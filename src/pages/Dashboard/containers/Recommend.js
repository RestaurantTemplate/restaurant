import { Container } from '@material-ui/core'
import { ItemList, TextRecommend } from '../components'

export const Recommend = () => {
    const mockItem = {
        imgUrl: '',
        name: 'กระเพราไก่',
        quantity: 2,
    }
    const recommends = [mockItem, mockItem, mockItem]
    return (
        <Container>
            <TextRecommend />
            <ItemList items={recommends} />
        </Container>
    )
}
