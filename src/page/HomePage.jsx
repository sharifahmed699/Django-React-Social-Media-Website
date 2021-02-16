import { Container, Grid } from '@material-ui/core'
import React from 'react'
import AllPost from '../components/AllPost'

const HomePage = () => {
    return (
        
        <Container maxWidth="md" style={{marginTop:"60px"}}>
            <Grid Container >
                <Grid item xm={12} sm={12} md={12} lg={12}>
                    <AllPost/>
                </Grid>
            </Grid>
        </Container>
    )
}

export default HomePage
