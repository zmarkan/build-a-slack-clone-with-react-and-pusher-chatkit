import React, { Component } from 'react'
import styled, { css } from 'styled-components'

const Nav = styled.div`
  position: fixed !important;
  width: 100%;
  height: 38px;
  align-items: center;
  position: relative;
  background-color: #222;
  top: 0;
  z-index: 2;
  display: flex;
  /* -webkit-box-pack: center;
  -ms-flex-pack: center;
  -webkit-justify-content: center;
  justify-content: center; */
}
`;
const InnerWrapper = styled.div`
  width: 970px;
  justify-content: space-between;
  height: 38px;
  margin: 0 auto;
  position: relative;
  display: -webkit-box;
   display: -moz-box;
   display: -ms-flexbox;
   display: -webkit-flex;
   display: flex;

   -webkit-flex-flow: row wrap;
 justify-content: flex-end;
`;

const Logo = styled.a`
  margin-right: 16px;
  text-decoration: none;
  display: block;
`;
const SearchBarContainer = styled.div`
  flex-grow: 2;
  position: static;
  -webkit-flex-flow: column wrap;
   flex-flow: column wrap;
   padding: 0;
`;
const SearchBar = styled.input`
  display: inline-block;
  margin-right: 16px;
  width: calc(100% - 40px);
  height: 24px;
  font-size: 14px;
  /* color: #A9A9A9; */
  background-color: #F7F7F7;
  border-radius: 2px;
  padding: 0 30px 0 10px;
  color: #333;
  margin-top: 5px;
`;
const BarIcons = styled.div`
  height: 100%;
  display: flex;
`;
const BarIconWrapper = styled.span`
  display: block;
  width: 38px;
  min-width: 38px;
  height: 100%;
  position: relative;
  cursor: pointer;
`;
const AlertsIcon = styled.i`
  display: inline-block;
  cursor: pointer;
  vertical-align: middle;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  background-image: URL("https://i-invdn-com.akamaized.net/newSiteIconsSprite_v41m.png");
  background-position: -2px -2518px;
  display: inline-block;
  width: 16px;
  height: 16px;
`;
const PortfolioIcon = styled.i`
  display: inline-block;
  cursor: pointer;
  vertical-align: middle;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  background-image: URL("https://i-invdn-com.akamaized.net/newSiteIconsSprite_v41m.png");
  background-position: -27px -2519px;
  display: inline-block;
  width: 16px;
  height: 16px;
`;
class NavBar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
    }
  }

  render() {
    return (
      <Nav>
        <InnerWrapper>
          <Logo>
            <img src="https://i-invdn-com.akamaized.net/logos/investing-com-logo.png" alt="Investing.com - Financial Markets Worldwide" class="investingLogo" />
          </ Logo>
          <SearchBarContainer>
            <SearchBar placeholder="Search the website" />
          </ SearchBarContainer>
          <BarIcons>
            <BarIconWrapper>
              < AlertsIcon />
            </ BarIconWrapper>
            <BarIconWrapper>
              < PortfolioIcon />
            </ BarIconWrapper>
          </ BarIcons>
        </ InnerWrapper>

      </Nav>
    )
  }
}

export default NavBar
