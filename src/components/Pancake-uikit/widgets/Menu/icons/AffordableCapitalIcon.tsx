import React from "react";
import styled, { useTheme } from "styled-components";
import { SvgProps } from "components/Pancake-uikit/components/Svg/types";

const StyleDiv = styled.div`
  padding-right: 0px;
`
const AffordableCapitalIcon: React.FC<SvgProps> = (props) => {

  const theme = useTheme();
  const primaryColor = theme.isDark ? "#FFFFFF":  "#000000";

  return (
      <StyleDiv>
        <svg width="70" height="69" viewBox="0 0 70 69" fill={primaryColor}>
          <g clipPath="url(#clip0)">
          <path d="M68.0946 10.8856L59.1251 0.661875C59.108 0.642486 59.0904 0.623766 59.0719 0.605848C58.2887 -0.160199 57.0186 -0.205528 56.1805 0.502354L49.0331 6.53807C48.1555 7.27898 48.0584 8.57346 48.8164 9.43204L49.0963 9.74908L48.6352 10.1385C47.4117 11.1719 45.5704 11.4811 43.7102 10.9651C43.6725 10.9546 38.379 9.48539 38.3407 9.4767C37.376 9.25741 34.8797 8.91109 32.4957 10.4154C32.4573 10.4369 18.798 18.0829 18.761 18.1066C15.0406 20.4768 16.832 24.5598 19.6699 25.0041C19.7935 28.2382 23.9661 29.7279 26.1766 27.2303C31.6482 21.0474 31.468 21.3163 31.7546 20.7507L31.9635 20.6664C32.2364 21.6673 32.9824 22.6636 34.507 23.0862C40.9015 24.86 42.1855 25.358 43.9596 25.1663C48.9176 24.6467 50.0538 24.4876 52.5509 23.082C54.3469 22.0709 56.095 20.8891 57.7599 19.5627L58.0643 19.9076C58.8233 20.767 60.1477 20.8594 61.0235 20.1195L67.8271 14.374C68.8814 13.484 69.0011 11.9191 68.0946 10.8856ZM24.6261 25.9172C23.6004 27.0761 21.6647 26.3078 21.7212 24.8046C21.7211 24.8046 27.7796 22.3534 27.7802 22.3532L24.6261 25.9172ZM51.5281 21.3431C49.4036 22.5391 48.6884 22.6527 43.7626 23.1693C42.4114 23.3109 41.3416 22.8968 35.0669 21.1562C34.2612 20.9328 34.0508 20.5114 33.9627 20.2141C33.8423 19.8077 33.9191 19.4194 33.9188 19.4194C33.9704 19.2005 34.0644 19.0132 34.1688 18.8756C34.3216 18.6739 34.5517 18.4775 35.1021 18.5519C37.0426 18.813 41.6634 19.4173 41.7098 19.4234C42.2729 19.4968 42.7872 19.1112 42.8622 18.5622C42.9372 18.0131 42.5431 17.5085 41.9817 17.4351C41.9352 17.4291 37.3183 16.8254 35.3817 16.5647C33.5694 16.3204 32.5007 17.4154 32.0796 18.4498L30.5837 19.053C30.5837 19.053 21.472 22.7711 20.5635 23.0275C18.9142 23.2541 17.7848 21.1547 19.8581 19.802L33.5377 12.1435C33.5386 12.1431 33.5396 12.1426 33.5405 12.142C33.5571 12.1327 33.5735 12.1229 33.5895 12.1127C35.3022 11.0222 37.1256 11.2634 37.8536 11.4256L43.1506 12.8951C45.6766 13.5955 48.2282 13.1326 49.9756 11.6569L50.4367 11.2675C51.2188 12.1535 55.7248 17.2572 56.4197 18.0444C54.854 19.2878 53.2123 20.395 51.5281 21.3431ZM66.487 12.8555C66.4319 12.9021 59.6646 18.6503 59.6172 18.5964C59.5699 18.5428 50.3188 8.10279 50.3735 8.05652L57.5209 2.02068H57.521C57.5348 2.00904 57.552 2.00329 57.5693 2.00329C57.5832 2.00329 57.597 2.00704 57.6091 2.01452L66.5379 12.192C66.7104 12.3885 66.6877 12.6862 66.487 12.8555Z" />
          <path d="M35.7907 33.4755V31.3229C36.6288 31.384 36.9163 31.7754 37.2664 31.7754C37.7292 31.7754 37.9294 31.2127 37.9294 30.9314C37.9294 30.2219 36.6038 29.9896 35.7907 29.965V29.6471C35.7907 29.4881 35.5781 29.3412 35.3656 29.3412C35.128 29.3412 34.9406 29.4881 34.9406 29.6471V29.9895C33.69 30.1485 32.5144 30.8212 32.5144 32.3744C32.5144 33.9401 33.8024 34.417 34.9406 34.8329V37.2669C33.84 37.1445 33.4648 36.3495 32.9896 36.3495C32.6019 36.3495 32.2891 36.8632 32.2891 37.2056C32.2891 37.8906 33.4272 38.6856 34.9406 38.7224V39.0648C34.9406 39.2242 35.128 39.3709 35.3656 39.3709C35.5782 39.3709 35.7907 39.2242 35.7907 39.0651V38.686C37.1914 38.4659 38.1544 37.5974 38.1544 36.0929C38.1546 34.4296 36.904 33.8791 35.7907 33.4755ZM35.0404 33.2065C34.4651 32.9863 34.04 32.7539 34.04 32.2157C34.04 31.751 34.4152 31.4574 35.0404 31.3595V33.2065ZM35.6909 37.2551V35.1268C36.2286 35.3592 36.6288 35.6528 36.6288 36.2521C36.6288 36.827 36.2411 37.1449 35.6909 37.2551Z" />
          <path d="M50.5305 43.5039C50.4069 40.2696 46.2338 38.7802 44.0239 41.2777L38.9609 46.9988C38.7557 47.2307 38.5838 47.4849 38.4458 47.7575L38.2369 47.8417C37.964 46.8409 37.2179 45.8446 35.6933 45.4219C28.9683 43.5563 28.092 43.1827 26.2606 43.34C26.254 43.3405 26.2474 43.3412 26.2409 43.3419C21.2829 43.8617 20.1465 44.0207 17.6495 45.4262C15.8533 46.4373 14.1052 47.6192 12.4405 48.9455L12.136 48.6007C11.3795 47.7443 10.0523 47.6492 9.17687 48.3888L2.00256 54.4469C1.58966 54.7954 1.34152 55.2806 1.30379 55.8127C1.26619 56.345 1.44338 56.8589 1.80322 57.26L11.2584 67.7983C11.9662 68.5871 13.1975 68.6859 14.0011 68.0212C14.0044 68.0184 14.0167 68.0082 14.0201 68.0054L21.1674 61.9696C22.045 61.2284 22.1422 59.934 21.3842 59.0756L21.1044 58.7585L21.5654 58.3693C22.7889 57.336 24.6302 57.0267 26.4904 57.5427L31.6845 58.9836C32.2293 59.1347 32.7964 58.8253 32.951 58.2924C33.1055 57.7596 32.789 57.2049 32.2442 57.0538L27.05 55.6129C24.524 54.9124 21.9725 55.3754 20.225 56.851L19.764 57.2402L15.8158 52.7683L13.7809 50.4636C15.3464 49.2202 16.988 48.1129 18.6725 47.1647C20.7988 45.9679 21.5127 45.855 26.4494 45.3375C27.8443 45.2188 28.6138 45.5431 35.1337 47.3517C35.9394 47.5751 36.1498 47.9964 36.2379 48.2938C36.3583 48.7002 36.2815 49.0885 36.2818 49.0885C36.232 49.3024 36.1377 49.4927 36.0319 49.6324C35.879 49.8339 35.6478 50.0302 35.0986 49.9562C33.1579 49.695 28.5372 49.0908 28.4909 49.0846C27.9276 49.0116 27.4135 49.3967 27.3385 49.9459C27.2634 50.4949 27.6576 50.9995 28.2189 51.0729C28.2654 51.079 32.8823 51.6827 34.8189 51.9433C34.9928 51.9667 35.1597 51.9778 35.32 51.9778C36.8302 51.9778 37.7396 50.9934 38.1205 50.0584L39.6169 49.455C39.6169 49.455 48.4298 45.9049 48.5397 45.8502C49.1254 45.5552 49.488 45.5226 49.6376 45.4803C51.2868 45.2541 52.4158 47.3534 50.3425 48.7061C35.9338 56.7725 36.2585 56.6007 36.2585 56.6007C35.7614 56.8661 35.5785 57.4756 35.8502 57.9616C36.1217 58.4477 36.745 58.627 37.2417 58.361C37.2418 58.361 51.4394 50.4013 51.4395 50.4013C55.1584 48.0325 53.3697 43.9483 50.5305 43.5039ZM19.8316 60.3866C19.8795 60.44 12.8092 66.3776 12.7543 66.424L3.3584 55.952L10.5171 49.9065C10.5215 49.9029 10.533 49.8934 10.551 49.8956C10.5706 49.8969 10.5795 49.9071 10.5832 49.9114L19.8316 60.3866ZM42.4204 46.1545L45.5745 42.5903C46.5828 41.4509 48.5367 42.1751 48.4793 43.703C48.4793 43.7032 42.4214 46.1541 42.4204 46.1545Z" />
          <path d="M42.7428 35.6116C42.2008 35.4496 41.6278 35.7474 41.462 36.2771C40.6201 38.9659 38.0726 40.7719 35.2466 40.7719C31.6873 40.7719 28.7444 37.9466 28.7444 34.4126C28.7444 30.9062 31.6613 28.0535 35.2466 28.0535C37.968 28.0533 40.4231 29.7333 41.3559 32.2338C41.5499 32.7542 42.1383 33.0221 42.6707 32.8324C43.203 32.6425 43.4769 32.0668 43.2828 31.5465C42.0559 28.2574 38.8265 26.0475 35.2466 26.0475C30.5302 26.0475 26.6934 29.8002 26.6934 34.4126C26.6934 39.0699 30.5707 42.7779 35.2466 42.7779C38.9481 42.7779 42.3096 40.4212 43.4231 36.8644C43.5889 36.3348 43.2843 35.7738 42.7428 35.6116Z" />
          </g>
          <defs>
          <clipPath id="clip0">
          <rect width="70" height="68.4615"/>
          </clipPath>
          </defs>
        </svg>
      </StyleDiv>
  );
};

export default AffordableCapitalIcon;
