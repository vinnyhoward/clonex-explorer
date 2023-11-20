'use client'
import React from 'react';
import styled from 'styled-components';

const ParentLayoutContainer = styled.div`
  padding-left: 100px;
`;

const ParentLayout: React.FC = ({ children }) => {
  return <ParentLayoutContainer>{children}</ParentLayoutContainer>;
};

export default ParentLayout;
