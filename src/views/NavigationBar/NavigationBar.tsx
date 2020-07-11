import React, { useState } from 'react';
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
import LoginModal from './Login/LoginModal';

const NavigationBar: React.FC = props => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = (): void => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar color="primary" style={{ display: 'flex', flexDirection: 'row' }} light expand="md">
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
          <LoginModal buttonLabel="Login"></LoginModal>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default NavigationBar;
