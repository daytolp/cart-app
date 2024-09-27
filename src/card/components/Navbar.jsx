import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import { LocalGroceryStore } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { MENU } from '../../reducer/itemsActions';
import { Menu } from '@mui/material';

// const pages = ['Home', 'Catalog', 'Cart'];

export const Navbar = () => {
    const navigate = useNavigate();
    const [anchorElNav, setAnchorElNav] = React.useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = ({ target: { innerText } }) => {
        console.log("option", innerText)
        switch (innerText) {
            case MENU[1].item://catalog
                navigate(MENU[1].link);
                break;
            case MENU[2].item://cart
                navigate(MENU[2].link);
                break;
            default://home
                navigate(MENU[0].link);
                break;
        }
       
        setAnchorElNav(null);
    };

    return (
        <>
            <AppBar position="static" sx={{ backgroundColor:"#16a085"}}>
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        {/* Pantallas grandes y medianas */}
                        <LocalGroceryStore sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                        <Typography
                            variant="h6"
                            noWrap
                            component="a"
                            href="#app-bar-with-responsive-menu"
                            sx={{
                                mr: 2,
                                display: { xs: 'none', md: 'flex' },
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >
                            CART
                        </Typography>
                        {/* Menu items pantallas chicas */}
                        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleOpenNavMenu}
                                color="inherit"
                            >
                                <MenuIcon />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorElNav}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}
                                open={Boolean(anchorElNav)}
                                onClose={handleCloseNavMenu}
                                sx={{ display: { xs: 'block', md: 'none' } }}
                            >
                                {MENU.map((page) => (
                                    <MenuItem key={page.item} onClick={handleCloseNavMenu}>
                                        <Typography sx={{ textAlign: 'center' }}>{page.item}</Typography>
                                    </MenuItem>
                                ))}
                            </Menu>
                        </Box>
                        {/* PAntallas chicas */}
                        <LocalGroceryStore sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
                        <Typography
                            variant="h5"
                            noWrap
                            component="a"
                            href="#app-bar-with-responsive-menu"
                            sx={{
                                mr: 2,
                                display: { xs: 'flex', md: 'none' },
                                flexGrow: 1,
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >
                            CART
                        </Typography>
                        {/* Menu items pantallas grandes y medianas */}
                        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                            {MENU.map((page) => (
                                <Button
                                    key={page.item}
                                    onClick={handleCloseNavMenu}
                                    sx={{ my: 2, color: 'white', display: 'block' }}
                                >
                                    {page.item}
                                </Button>
                            ))}
                        </Box>                       
                    </Toolbar>
                </Container>
            </AppBar>
        </>
    )
}
