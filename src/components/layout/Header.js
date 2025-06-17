import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';

const HeaderContainer = styled.header`
  background-color: ${props => props.theme.colors.primary};
  color: white;
  padding: ${props => props.theme.spacing.md};
  box-shadow: ${props => props.theme.shadows.medium};
`;

const NavContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
`;

const Logo = styled(Link)`
  font-size: ${props => props.theme.fontSizes.xlarge};
  font-weight: 700;
  color: white;
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};

  &:hover {
    color: white;
    opacity: 0.9;
  }
`;

const LogoIcon = styled.div`
  width: 32px;
  height: 32px;
  background-color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    width: 24px;
    height: 24px;
    fill: ${props => props.theme.colors.primary};
  }
`;

const NavLinks = styled.nav`
  display: flex;
  gap: ${props => props.theme.spacing.lg};
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    display: ${props => (props.mobileMenuOpen ? 'flex' : 'none')};
    flex-direction: column;
    position: absolute;
    top: 60px;
    left: 0;
    right: 0;
    background-color: ${props => props.theme.colors.primary};
    padding: ${props => props.theme.spacing.md};
    z-index: ${props => props.theme.zIndices.dropdown};
  }
`;

const NavLink = styled(Link)`
  color: white;
  padding: ${props => props.theme.spacing.sm};
  font-weight: ${props => (props.active ? '700' : '400')};
  border-bottom: ${props => (props.active ? '2px solid white' : '2px solid transparent')};
  
  &:hover {
    color: white;
    opacity: 0.9;
  }
`;

const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  color: white;
  font-size: ${props => props.theme.fontSizes.large};
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    display: block;
  }
`;

const UploadButton = styled(Link)`
  background-color: white;
  color: ${props => props.theme.colors.primary};
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.lg};
  border-radius: ${props => props.theme.borderRadius.medium};
  font-weight: 500;
  transition: all ${props => props.theme.transitions.short};
  
  &:hover {
    background-color: ${props => props.theme.colors.accent};
    color: ${props => props.theme.colors.primary};
    transform: translateY(-2px);
  }
`;

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <HeaderContainer>
      <NavContainer>
        <Logo to="/">
          <LogoIcon>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <path d="M256 0C114.6 0 0 114.6 0 256s114.6 256 256 256s256-114.6 256-256S397.4 0 256 0zM256 464c-114.7 0-208-93.31-208-208S141.3 48 256 48s208 93.31 208 208S370.7 464 256 464zM368 224c0-11.69-3.331-22.61-8.928-32H288V160h50.75c-4.5-10.25-10.88-19.5-18.5-27.5L288 160H224c-8.838 0-16 7.162-16 16v64c0 8.836 7.164 16 16 16h64V384c0 8.836 7.164 16 16 16c8.838 0 16-7.164 16-16V256c8.838 0 16-7.164 16-16V224z" />
            </svg>
          </LogoIcon>
          Shot Form Analyzer
        </Logo>
        
        <MobileMenuButton onClick={toggleMobileMenu}>
          ☰
        </MobileMenuButton>
        
        <NavLinks mobileMenuOpen={mobileMenuOpen}>
          <NavLink to="/" active={location.pathname === '/' ? 1 : 0}>
            Home
          </NavLink>
          <NavLink to="/progress" active={location.pathname === '/progress' ? 1 : 0}>
            My Progress
          </NavLink>
          <UploadButton to="/upload">Upload Shot</UploadButton>
        </NavLinks>
      </NavContainer>
    </HeaderContainer>
  );
};

export default Header;