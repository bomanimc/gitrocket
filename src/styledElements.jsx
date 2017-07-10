import styled, { keyframes } from 'styled-components';

export const launch = keyframes`
  0%   { top: calc(100% + 100px); display: block; }
  100% { top: -100px; display: block; }
`;

// Markup and styling for this section is adapted from Kevin Boudot's Pen at
// https://codepen.io/kevinboudot/pen/EaQeNL
export const wiggling = keyframes`
  0% {
    transform: translate3d(0px, 0px, 0);
  }
  50% {
    transform: translate3d(0px, -4px, 0);
  }
  100% {
    transform: translate3d(0px, 0px, 0);
  }
`;

export const vrouming = keyframes`
  0% {
    transform: translate3d(0px, 0, 0);
  }
  50% {
    transform: translate3d(5px, 0, 0);
  }
  100% {
    transform: translate3d(0px, 0, 0);
  }
`;

export const wasting = keyframes`
  0% {
    transform: translate3d(0px, 0, 0);
  }
  100% {
    transform: translate3d(-40px, -5px, 0);
  }
`;
export const wasting2 = keyframes`
  0% {
    transform: translate3d(0px, 0, 0);
  }
  100% {
    transform: translate3d(-40px, 5px, 0);
  }
`;

export const Rocket = styled.div`
  display: ${props => (props.display ? 'block' : 'none')};
  position: absolute;
  left: calc(100% - 60px);
  top: calc(100% + 100px);
  transform: rotate(-90deg);
  animation: ${launch} 4s cubic-bezier(.81,.13,.89,.6);
`;

export const RocketSpan = styled.i`
  display: block;
  width: 65px;
  height: 20px;
  background-color: #d11c40;
  position: absolute;
  border-bottom-right-radius: 100%;
  border-top-right-radius: 100%;
  border-left: 3px solid #5b595d;
  border-right: 3px solid #D11C40;
  animation: ${wiggling} 300ms infinite;
  animation-timing-function: ease-out;

  :before, :after {
    content: '';
    position: absolute;
    display: block;
    width: 51%;
    top:50%;
    height: 50%;
    background-color: #a71732;
  }

  :before {
    right: 0;
    border-bottom-right-radius: 100%;
  }

  :after {
    left: -3px;
    border-left: 3px solid #444244;
  }
`;

export const Fin = styled.i`
  display: block;
  position: absolute;
  left: -4px;
  width: 10px;
  height: 10px;
  background-color: #7f0e27;
  border-left: 3px solid #D11C40;

  :before {
    content: '';
    position: absolute;
    left: 5px;
    width: 10px;
    height: 100%;
    background-color: #7f0e27;
    bottom: 0;
  }
`;

export const FinTop = Fin.extend`
  top: -10px;
  transform: skew(35deg, 0deg);

  :before {
    transform: skew(40deg, 0deg);
  }
`;

export const FinBottom = Fin.extend`
  bottom: -10px;
  transform: skew(-35deg, 0deg);

  :before {
    transform: skew(-40deg, 0deg);
  }
`;

export const Fire = styled.i`
  position: absolute;
  display: block;
  left: -33px;
  width: 30px;
  height: 100%;
  overflow: hidden;

  :before {
    position: absolute;
    content: '';
    display: block;
    width: 220px;
    height: 20px;
    left: 0;
    top:0;
    border-radius: 100%;
    background-color: #f45224;
    animation: ${vrouming} 200ms infinite;
  }

  :after {
    position: absolute;
    content: '';
    display: block;
    width: 220px;
    height: 10px;
    left: 10px;
    top: 5px;
    border-radius: 100%;
    background-color: #ffedd5;
    animation: ${vrouming} 200ms infinite;
  }
`;

export const Wastes = styled.i`
  position: absolute;
  left: -53px;
  top: -10px;
  width: 50px;
  height: 200%;

  i {
    position: absolute;
    width: 3px;
    right: 0;
    height: 1px;
    background-color: rgba(255, 255, 255, 0.5);
  }

  i:nth-child(1) {
    top: 15px;
    animation: ${wasting} 500ms infinite 100ms;
  }

  i:nth-child(2) {
    top: 17px;
    animation: ${wasting2} 500ms infinite 200ms;
  }

  i:nth-child(3) {
    top: 19px;
    animation: ${wasting} 500ms infinite 300ms;
  }

  i:nth-child(4) {
    top: 21px;
    animation: ${wasting2} 500ms infinite 400ms;
  }

  i:nth-child(5) {
    top: 23px;
    animation: ${wasting} 500ms infinite 100ms;
  }
`;
