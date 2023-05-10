import styled from "styled-components";
import Star from "../image/Star.svg";
import Cloud from "../image/Cloud.png";
import CreateModal from "../component/modal/CreateModal";
import { useState } from "react";

interface BackgroundToString {
  readonly background: string;
}

const Main = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <MainWrap>
      <img src={Cloud} alt="cloud" className="cloud" />
      <div className="star" />
      <div className="inner">
        <span className="subTitle">우리의 이야기</span>
        <h2>ZARI</h2>
      </div>

      <CreateModal handleClose={() => setIsOpen(false)} isOpen={isOpen} />
    </MainWrap>
  );
};

const MainWrap = styled.section`
  padding: 5rem 2rem 6rem;
  height: calc(100vh - 11rem);
  .star {
    position: absolute;
    width: 95%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    height: 95%;
    background-image: url(${Star});
    background-size: cover;
    background-position: center center;
  }
  .cloud {
    position: absolute;
    bottom: -14rem;
    left: 50%;
    transform: translateX(-50%);
  }
  .inner {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
    h2 {
      font-weight: 800;
      font-size: var(--main-title-font);
      line-height: 7.5rem;
      letter-spacing: 0.2em;
    }
    .subTitle {
      font-size: var(--sub-title-font);
      line-height: 3.8rem;
      mix-blend-mode: lighten;
      text-shadow: 0px 0px 16px #ffffff;
    }
  }
  > button {
    margin-top: 8rem;
    position: relative;
  }
`;

export default Main;
