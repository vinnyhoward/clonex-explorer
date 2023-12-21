import styled from "styled-components";

const LoaderContainer = styled.div`
  .loading {
    display: inline-block;
    position: relative;
    width: 35px;
    height: 35px;
  }
  .loading div {
    position: absolute;
    background: #fff;
    opacity: 1;
    border-radius: 50%;
    animation: loading 1.4s cubic-bezier(0, 0.2, 0.8, 1) infinite;
  }
  .loading div:nth-child(2) {
    animation-delay: -0.7s;
  }
  @keyframes loading {
    0% {
      top: 20px;
      left: 20px;
      width: 0;
      height: 0;
      opacity: 1;
    }
    100% {
      top: -1px;
      left: -1px;
      width: 40px;
      height: 40px;
      opacity: 0;
    }
  }
`;

export const Loader = () => (
  <LoaderContainer>
    <div className="loading">
      <div></div>
      <div></div>
    </div>
  </LoaderContainer>
);
