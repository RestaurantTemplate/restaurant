import React from 'react';
import {
    Container,
    Paper,
    Box
} from '@material-ui/core';
import { useStyles } from '../../css/css';
import BaseLayout from './../../components/BaseLayout';
import {Tabmenu} from './containers'
export function Salerecord(props) {
    return(
        <BaseLayout>
            <Box display={{ xs: 'block', md: 'block' }}>
                <Container maxWidth={'md'}>
                    <Paper style={{padding:'5%'}} elevation={4} >
                        <h2>{'บันทึกการขาย'}</h2>
                        <Tabmenu />
                    </Paper>
                </Container>              
            </Box>
        </BaseLayout>
    );
}
export default  Salerecord;