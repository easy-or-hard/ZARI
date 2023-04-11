import styled from "styled-components";
import Button from "../component/common/Button";
import centerStar from "../image/centerStar.png";
import Star from "../image/Star.png";
import CreateModal from "../component/modal/CreateModal";
import { useState } from "react";

interface BackgroundToString {
  readonly background: string;
}

const MainWrap = styled.article`
  text-align: center;
  padding: 8rem 2rem 3rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: calc(100vh - 11rem);
  h2 {
    position: relative;
    font-weight: 300;
    letter-spacing: 1rem;
    line-height: 3rem;
    margin-bottom: 3rem;
  }
  >button {
    margin-top: 8rem;
    position: relative;
  }
`;

const CircleWrap = styled.div`
  width: 90%;
  max-width: 34rem;
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin: auto;
  ::after {
    padding-bottom: 100%;
    display: block;
    content: "";
  }
  background-image: url(${centerStar});
  background-position: center center;
  background-repeat: no-repeat;
  div {
    border-radius: 50%;
    width: 100%;
    height: 100%;
    position: absolute;
    animation-duration: 15s;
    animation-iteration-count: infinite;
    animation-timing-function: linear;
    span {
      position: absolute;
      width: 18px;
      height: 18px;
      border-radius: 50%;
    }
  }
  .puppleCircleWrap {
    animation-name: circleRotate;
    border: 0.5px solid #9e01ff;
    .puppleCircle {
      top: -9px;
      background-color: #9e01ff;
    }
  }
  .greenCircleWrap {
    animation-name: circleRotateReverse;
    width: 84%;
    height: 84%;
    border: 0.5px solid #01ffc2;
    .greenCircle {
      top: 50%;
      right: -9px;
      background-color: #01ffc2;
    }
  }
  .blueCircleWrap {
    animation-name: circleRotate;
    width: 66%;
    height: 66%;
    border: 0.5px solid #0167ff;
    animation-duration: 14s;
    .blueCircle {
      top: 65%;
      left: 0;
      background-color: #0167ff;
    }
  }
  .whiteCircleWrap {
    animation-name: circleRotateReverse;
    width: 50%;
    height: 50%;
    border: 0.5px solid #fff;
    animation-duration: 12s;
    .whiteCircle {
      top: 0px;
      left: 22%;
      background-color: #fff;
    }
  }
  .yellowCircleWrap {
    animation-name: circleRotate;
    width: 33%;
    height: 33%;
    border: 0.5px solid #ffea7e;
    animation-duration: 10s;
    .yellowCircle {
      bottom: -7px;
      left: 30%;
      background-color: #ffea7e;
    }
  }
  @keyframes circleRotate {
    to {
      transform: rotate(360deg);
    }
  }
  @keyframes circleRotateReverse {
    to {
      transform: rotate(-360deg);
    }
  }
`;

const StarImg = styled.div<BackgroundToString>`
  position: absolute;
  width: 95%;
  top: 50%;
  transform: translateY(-50%);
  height: 95%;
  background-image: url(${(props) => props.background});
  background-size: cover;
  background-position: center center;
`;

const Main = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleIsOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <MainWrap>
      <StarImg background={Star} />
      <h2>
        CREATE YOUR
        <br />
        UNIVERSE
      </h2>
      
      <CircleWrap>
        <div className="puppleCircleWrap">
          <span className="puppleCircle" />
        </div>
        <div className="greenCircleWrap">
          <span className="greenCircle" />
        </div>
        <div className="blueCircleWrap">
          <span className="blueCircle" />
        </div>
        <div className="whiteCircleWrap">
          <span className="whiteCircle" />
        </div>
        <div className="yellowCircleWrap">
          <span className="yellowCircle" />
        </div>
      </CircleWrap>
      <Button text={"나의 우주 만들기"} onClick={() => handleIsOpen()} />
      <CreateModal handleClose={() => setIsOpen(false)} isOpen={isOpen} />
    </MainWrap>
  );
};

export default Main;
