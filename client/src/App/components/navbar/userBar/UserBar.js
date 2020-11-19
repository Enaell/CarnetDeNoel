import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import Badge from '@material-ui/core/Badge';
import {getLogMenu, getLogMobileMenu} from './logMenu.js'



const UserBar = ({ user, onLogout, classes }) => {

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  
  function handleProfileMenuOpen(event) {
    setAnchorEl(event.currentTarget);
  }
  
  function handleMobileMenuClose() {
    setMobileMoreAnchorEl(null);
  }
  
  function handleMenuClose() {
    setAnchorEl(null);
    handleMobileMenuClose();
  }
  
  function handleMobileMenuOpen(event) {
    setMobileMoreAnchorEl(event.currentTarget);
  }
  
  function handleLogout(event){
    handleMenuClose();
    onLogout(event.currentTarget);
  }

  const LogMenu = getLogMenu(anchorEl, isMenuOpen, handleMenuClose, handleLogout);

  const LogMobileMenu = getLogMobileMenu(mobileMoreAnchorEl, isMobileMenuOpen, handleProfileMenuOpen, handleMobileMenuClose, user);
  
  return (
    <div>
      <div className={classes.sectionDesktop}>
        {user.messages &&
          <IconButton color="inherit">
            <Badge badgeContent={4} color="secondary">
              <MailIcon />
            </Badge>
          </IconButton>
        }
        {user.notifications &&  
          <IconButton color="inherit">
            <Badge badgeContent={17} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          }
        <IconButton
          aria-owns={isMenuOpen ? 'material-appbar' : undefined}
          aria-haspopup="true"
          onClick={handleProfileMenuOpen}
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        {LogMenu}
      </div>
      <div className={classes.sectionMobile}>
        <IconButton aria-haspopup="true" onClick={handleMobileMenuOpen} color="inherit">
          <MoreIcon />
        </IconButton>
          {LogMobileMenu}
      </div>
    </div>
  )}

export default UserBar;