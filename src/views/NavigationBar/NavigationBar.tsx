import React, { useState, useEffect } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import LoginModal from './Login/LoginModal';
import { getProperty, setProperty } from '../../utils/localStorage';
import './NavigationBar.scss';

const NavigationBar: React.FC = props => {
  const [isOpen, setIsOpen] = useState(false);
  const [userInfo, setUserInfo]: any = useState();
  const toggle = (): void => setIsOpen(!isOpen);

  const getUserInfo = (): void => {
    let user: any = getProperty('user');
    if (!user) return;
    user = JSON.parse(user);
    setUserInfo(user);
  };

  useEffect(() => getUserInfo(), []);

  return (
    <div>
      <Navbar className="nav-bar" color="primary" light expand="md">
        <NavbarBrand href="/">The Music Timeline</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink href="/#/timeline/">Timeline</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/media/">Media</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/map/">Map</NavLink>
            </NavItem>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                About
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem href="https://gustavomorais.me">Gustavo Morais</DropdownItem>
                <DropdownItem href="https://github.com/Guttz">Github</DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
          {!userInfo ? (
            <LoginModal buttonLabel="Login"></LoginModal>
          ) : (
            <div className="user-details">
              <UncontrolledDropdown>
                <DropdownToggle>
                  {userInfo['name']} <FontAwesomeIcon className="ml-2" icon={faUserCircle} />
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem
                    onClick={() => {
                      setProperty('user', '');
                      window.location.reload();
                    }}
                  >
                    {' '}
                      Logout
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </div>
          )}
        </Collapse>
      </Navbar>
    </div>
  );
};

export default NavigationBar;
