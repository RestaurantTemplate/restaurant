import React from 'react';
import {
    Container,
    Box
} from '@material-ui/core';
import BaseLayout from './../../components/BaseLayout';
import {EnhancedTable} from './containers'
export function Salerecord(props) {
    return(
        <BaseLayout>
            <Box display={{ xs: 'block', md: 'block' }}>
                <Container maxWidth={'md'}>
                    <EnhancedTable />
                </Container>              
            </Box>
        </BaseLayout>
    );
}
export default  Salerecord;