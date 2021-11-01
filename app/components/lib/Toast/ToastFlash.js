import { ToastProvider, useToasts } from 'react-toast-notifications';
import { Provider } from 'react-redux';
import React from 'react';
import styled, {keyframes} from "styled-components";

const slideIn = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`;

const Toast = styled.div`
  animation: ${slideIn} 0.5s cubic-bezier(0.4, 0, 0.2, 1) both;
  border-radius: 5px;
  padding: 20px;
  position: fixed;
`;

const ToastFlash =props=>{

  return(<Toast >
    <div>
      {props.msg}
    </div>
  </Toast>);


}

