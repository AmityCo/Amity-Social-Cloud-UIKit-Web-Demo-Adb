import React from 'react';

const EmptyFeed = ({ color = '#A5A9B5', ...props }: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M39.5107 25.2362C38.8869 25.2362 38.2747 25.3041 37.6818 25.4335C39.2923 23.0401 40.2282 20.2639 40.3918 17.3437H40.9769C41.4947 17.3437 41.9144 16.9239 41.9144 16.4062C41.9144 15.8884 41.4947 15.4687 40.9769 15.4687H40.3906C39.8967 6.85584 32.7344 0 24 0C15.2657 0 8.10337 6.85584 7.60959 15.4687H7.02319C6.50541 15.4687 6.08569 15.8884 6.08569 16.4062C6.08569 16.9239 6.50541 17.3437 7.02319 17.3437H7.60819C7.83019 21.3069 9.47447 25.0053 12.2966 27.8409L18.5743 34.1488V40.8825C17.1898 39.7625 15.4512 39.1327 13.6085 39.1327C11.1596 39.1327 8.89809 40.2416 7.40456 42.1379C6.75394 41.8646 6.05334 41.7226 5.33981 41.7226C2.39541 41.7227 0 44.1181 0 47.0625C0 47.5802 0.419719 48 0.9375 48H26.7872C28.2551 48 29.4494 46.8058 29.4494 45.3378V34.6875H33.7843C34.3021 34.6875 34.7218 34.2677 34.7218 33.75C34.7218 33.2323 34.3021 32.8125 33.7843 32.8125H26.8347C27.2541 31.151 28.7614 29.9174 30.5513 29.9174C31.2803 29.9174 31.9902 30.1238 32.6043 30.5145C32.8151 30.6486 33.0706 30.6929 33.3142 30.6379C33.5579 30.5827 33.7694 30.4328 33.9021 30.2212C35.1218 28.2738 37.2186 27.1112 39.5108 27.1112C42.8483 27.1112 45.6163 29.5958 46.0623 32.8125H42.2219C41.7041 32.8125 41.2844 33.2323 41.2844 33.75C41.2844 34.2677 41.7041 34.6875 42.2219 34.6875H47.0619C47.5728 34.6875 47.9887 34.2787 47.9993 33.7697C47.9997 33.7551 48.0001 33.7403 48.0001 33.7254C48 29.0445 44.1917 25.2362 39.5107 25.2362ZM24.8224 32.8125H23.1776L21.2122 26.8848C20.6679 25.2436 20.2627 23.2201 20.0246 21.0234C21.093 21.9445 22.482 22.5035 24 22.5035C25.518 22.5035 26.907 21.9446 27.9754 21.0234C27.7372 23.22 27.332 25.2435 26.7878 26.8848L24.8224 32.8125ZM24 1.875C24.6738 1.875 25.8003 2.89453 26.7577 5.76816C27.6264 8.37581 28.1352 11.791 28.2102 15.4687H19.79C19.8649 11.7909 20.3738 8.37581 21.2425 5.76806C22.1997 2.89463 23.3262 1.875 24 1.875ZM28.116 17.3437C27.6883 19.2219 26.0059 20.6284 24 20.6284C21.9941 20.6284 20.3117 19.2219 19.884 17.3437H28.116ZM38.5117 15.4687H30.0854C30.009 11.5909 29.466 7.96575 28.5365 5.17547C28.1202 3.92606 27.6695 2.96681 27.2081 2.23219C33.39 3.62953 38.091 8.97506 38.5117 15.4687ZM38.4354 17.3437C38.0078 19.2219 36.3253 20.6284 34.3194 20.6284C32.3136 20.6284 30.6311 19.2219 30.2034 17.3437H38.4354ZM20.7919 2.23228C20.3304 2.96691 19.8798 3.92616 19.4635 5.17556C18.534 7.96575 17.991 11.591 17.9146 15.4688H9.48825C9.909 8.97506 14.61 3.62953 20.7919 2.23228ZM17.7966 17.3437C17.3689 19.2219 15.6864 20.6284 13.6806 20.6284C11.6747 20.6284 9.99225 19.2219 9.56456 17.3437H17.7966ZM10.3957 21.5388C11.3445 22.1482 12.4716 22.5034 13.6806 22.5034C15.4158 22.5034 16.9827 21.7735 18.0941 20.6063C18.3314 23.1704 18.7869 25.5278 19.4325 27.4748L21.2022 32.8125H19.8896L13.6257 26.5184C12.1913 25.0772 11.1009 23.3838 10.3957 21.5388ZM5.33981 43.5977C5.99878 43.5977 6.6405 43.7843 7.19569 44.1375C7.40644 44.2716 7.662 44.316 7.90556 44.2609C8.14922 44.2057 8.36072 44.0557 8.49337 43.8442C9.60572 42.0681 11.5179 41.0077 13.6085 41.0077C15.6067 41.0077 17.445 41.9782 18.5743 43.6152V45.3379C18.5743 45.6118 18.6159 45.8762 18.6932 46.1251H2.00391C2.41369 44.6685 3.75403 43.5977 5.33981 43.5977ZM27.5744 45.3378C27.5744 45.7718 27.2213 46.125 26.7872 46.125H21.2366C20.8026 46.125 20.4494 45.7718 20.4494 45.3378V40.5H27.5744V45.3378ZM27.5744 34.6875V38.625H20.4494V34.6875H27.5744ZM28.2125 28.5457L28.5675 27.4748C29.2131 25.5278 29.6685 23.1704 29.9059 20.6063C31.0173 21.7736 32.5842 22.5034 34.3194 22.5034C35.5285 22.5034 36.6555 22.1482 37.6043 21.5388C36.899 23.3837 35.8087 25.0771 34.3743 26.5184L32.5115 28.3901C31.887 28.1615 31.2246 28.0423 30.5513 28.0423C29.7181 28.0424 28.9268 28.2233 28.2125 28.5457Z"
        fill={color}
      />
    </svg>
  );
};

export default EmptyFeed;
