import { AppBar, Container, Toolbar, Typography } from '@material-ui/core'
import React from 'react'

const NavBar = () => {
    return (
        <AppBar >
            <Container style={{maxWidth:"992px"}}>
                <Toolbar >
                    <Typography>
                        AppBar
                    </Typography>
                </Toolbar>
            </Container>
           
        </AppBar>
    )
}

export default NavBar
