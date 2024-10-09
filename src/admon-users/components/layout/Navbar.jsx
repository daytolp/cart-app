import React, { useContext, useState } from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { LocalGroceryStore } from '@mui/icons-material';
import { Constantes } from '../../commons/Constants';
import { MENU } from '../../../reducer/itemsActions';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../auth/context/AuthContext';

const pages = ['USUARIOS', Constantes.optionRegisterMenu, 'HOME', 'CARRITO', 'CATALOGO'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];


export const Navbar = () => {
    const { login, handlerLogout } = useContext(AuthContext);
    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);
    const navigate = useNavigate();

    const handleOpenNavMenu = (event) => {
      setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
      setAnchorElUser(event.currentTarget);
    };
  
    const handleCloseNavMenu = ({ target: { innerText } }) => {
      switch (innerText) {
        case Constantes.optionUsersMenu:
          navigate('/users');
          break;
        case Constantes.optionRegisterMenu:
          navigate('/users/register');
          break;
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
  
    const handleCloseUserMenu = (setting) => {
      setAnchorElUser(null);
      if (setting === Constantes.settingsLogout) {
        handlerLogout();
      }
    };

    
  return (
    <>
 <AppBar position="static" sx={{ backgroundColor:"#4e4b6b"}}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
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
            CartApp
          </Typography>

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
            { login?.isAuth && 
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
               {pages.map((page) => (
                 <MenuItem key={page} onClick={handleCloseNavMenu}>
                   <Typography sx={{ textAlign: 'center' }}>{page}</Typography>
                 </MenuItem>
               ))}
             </Menu>
            }
           
          </Box>
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
            CartApp
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            { login?.isAuth && pages.map((page) => (
               (page === Constantes.optionRegisterMenu) ?
                  login.isAdmin && 
                  <Button
                    key={page}
                    onClick={handleCloseNavMenu}
                    sx={{ my: 2, color: 'white', display: 'block' }}
                  >
                    {page} 
                  </Button>
              : <Button
              key={page}
              onClick={handleCloseNavMenu}
              sx={{ my: 2, color: 'white', display: 'block' }}
            >
              {page} 
            </Button>
            ))}
          </Box>
          { login?.isAuth && 
              <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" src="/static/images/goku-perfil.jpg" />
                </IconButton>
              </Tooltip>
              {/* MENÚ DEL PERFIL DEL USUARIO */}
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={() => handleCloseUserMenu(setting)}>
                    <Typography sx={{ textAlign: 'center' }}>{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          }
        
        </Toolbar>
      </Container>
    </AppBar>
    </>
  )
}
