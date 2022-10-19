import { motion, useMotionValue, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";
import styled from "styled-components";

// styled components with motion
const Wrapper = styled(motion.div)`
  height: 200vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
`;
const BiggerBox = styled(motion.div)`
  width: 600px;
  height: 600px;
  background-color: rgba(255,255,255,0.2);
  border-radius: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;
const Box = styled(motion.div)`
  width: 200px;
  height: 200px;
  border-radius: 15px;
  background-color: white;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;
const BoxOne = styled(motion.div)`
  width: 200px;
  height: 200px;
  background-color: rgba(255,255,255,0.2);
  border-radius: 15px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
  display: grid;
  grid-template-columns: repeat(2,1fr);
`;
const Circle = styled(motion.div)`
  background-color: white;
  height: 70px;
  width: 70px;
  place-self: center;
  border-radius: 35px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;
const Svg = styled.svg`
  width: 300px;
  height: 300px;
  path {
    stroke: white;
    stroke-width: 2;
  }
`;

// variants
const sample = {
  start: {},    // initial="start"
  end : {},     // animate="end"
  hover : {},   // whileHover="hover"
  click : {},   // whileTap="click"
  drag : {},    // whileDrag="drag"
}
const myVariants = {
  start: {scale:0},
  end : {scale:1, rotateZ:360, transition:{type:"spring", duration:0.5, delay:1}}
};
const boxVariants = {
  start: {
    opacity: 0,
    scale: 0.5
  },
  end : {
    opacity: 1,
    scale: 1,
    transition : {
      type:"spring",
      duration: 0.5,
      delay: 1,
      delayChildren: 1.5,
      // 하위 요소에 지정한 값만큼 순차적으로 발동시킨다.
      staggerChildren: 0.2,
    }
  }
};
const circleVariants = {
  start: {
    opacity:0,
    y:100
  },
  end : {
    opacity:1,
    y:0,
    transition:{
      type:"spring",
      duration:1
    }
  }
};
const hoverClickVariants = {
  hover : {
    scale:1, 
    rotateZ:90
  },
  click : {
    borderRadius:"100px", 
    scale:1
  },
  drag : {
    backgroundColor: "rgb(46, 204, 113)",
    transition : {
      duration: 1
    }
  }
};
const svg = {
  start: { pathLength: 0, fill: "rgba(255, 255, 255, 0)" },
  end: {
    fill: "rgba(255, 255, 255, 1)",
    pathLength: 1,
  },
};

const BasicPractice = () => {
  const biggerBoxRef = useRef(null);
  const x = useMotionValue(0);
  const rotateZ = useTransform(x, [-600,600],[-360,360])
  const gradient = useTransform( x, [-800, 800], [ "linear-gradient(135deg, rgb(0, 210, 238), rgb(0, 83, 238))", "linear-gradient(135deg, rgb(0, 238, 155), rgb(238, 178, 0))",]);
  const { scrollY, scrollYProgress } = useScroll();
  const scale = useTransform(scrollYProgress, [0,1], [1,1])
  return (
    <Wrapper style={{ background: gradient }}>
      <div>
        {/* basic 레벨 */}
        <div style={{display:"flex"}}>
          <Box animate={{scale:1, rotateZ:360,}} initial={{scale:0}} transition={{type:"spring", duration:1, delay:1}} />
          <Box variants={myVariants} initial="start" animate="end" />
          <BoxOne variants={boxVariants} initial="start" animate="end" >
            <Circle variants={circleVariants} />
            <Circle variants={circleVariants} />
            <Circle variants={circleVariants} />
            <Circle variants={circleVariants} />
          </BoxOne>
          <Box variants={hoverClickVariants} whileHover="hover" whileTap="click" />
        </div>
        {/* 드래그 관련 */}
        <div style={{display:"flex"}}>
          <BiggerBox ref={biggerBoxRef}>
            <Box 
              drag 
              dragSnapToOrigin
              dragElastic={0.2}
              variants={hoverClickVariants}  
              dragConstraints={biggerBoxRef} 
              whileHover="hover" 
              style={{x, rotateZ}}
            />
          </BiggerBox>
        </div>
        {/* 스크롤 관련 */}
        <div>
          <Box style={{scale}}/>
        </div>
        {/* stroke(테두리선)과 속을 섹쉬하게 채우기 */}
        <div>
          <Svg
            focusable="false"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
          >
            <motion.path
              variants={svg}
              initial="start"
              animate="end"
              transition={{
                // 이렇게 하나하나 지정해서 듀레이션 딜레이 맥이면 따로따로 작동시킬수 있다.
                pathLength: { duration: 5 },
                fill: { duration: 1, delay: 3 },
              }}
              d="M224 373.12c-25.24-31.67-40.08-59.43-45-83.18-22.55-88 112.61-88 90.06 0-5.45 24.25-20.29 52-45 83.18zm138.15 73.23c-42.06 18.31-83.67-10.88-119.3-50.47 103.9-130.07 46.11-200-18.85-200-54.92 0-85.16 46.51-73.28 100.5 6.93 29.19 25.23 62.39 54.43 99.5-32.53 36.05-60.55 52.69-85.15 54.92-50 7.43-89.11-41.06-71.3-91.09 15.1-39.16 111.72-231.18 115.87-241.56 15.75-30.07 25.56-57.4 59.38-57.4 32.34 0 43.4 25.94 60.37 59.87 36 70.62 89.35 177.48 114.84 239.09 13.17 33.07-1.37 71.29-37.01 86.64zm47-136.12C280.27 35.93 273.13 32 224 32c-45.52 0-64.87 31.67-84.66 72.79C33.18 317.1 22.89 347.19 22 349.81-3.22 419.14 48.74 480 111.63 480c21.71 0 60.61-6.06 112.37-62.4 58.68 63.78 101.26 62.4 112.37 62.4 62.89.05 114.85-60.86 89.61-130.19.02-3.89-16.82-38.9-16.82-39.58z"
            ></motion.path>
          </Svg>
        </div>
      </div>
    </Wrapper>
  );
}

export default BasicPractice;

// 만약 부모요소에 (variants={boxVariants} initial="start" animate="end") 꼴이 있다면,
// 자식요소에 기본값으로 (initial="start" animate="end") 가 전달 된다.
