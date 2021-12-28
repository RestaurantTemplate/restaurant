import React from 'react';
import {
    Container,
    Box
} from '@material-ui/core';
import {EnhancedTable} from './containers'
export function Salerecord(props) {
    return(
        <Box display={{ xs: 'block', md: 'block' }}>
            <Container maxWidth={'md'}>
                <EnhancedTable />
            </Container>              
        </Box>
    );
}
export default  Salerecord;