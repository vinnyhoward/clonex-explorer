"use client";
import styled from "styled-components";

const NavBarContainer = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  height: 100vh;
  width: 100px;
  background-color: ${(props) => props.theme.colors.darkBlue};
  z-index: 1;
`;

const VerticalNavBar = () => {
  return (
    <NavBarContainer>
      <div>Vertical Nav Bar</div>
    </NavBarContainer>
  );
};

export default VerticalNavBar;
