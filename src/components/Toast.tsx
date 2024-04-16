import {
  ToastContainer,
  ToastPosition,
  Theme as ToastTheme,
} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface ToastPropTypes {
  position?: ToastPosition;
  autoCloseTime?: number;
  hideProgressBar?: boolean;
  newestOnTop?: boolean;
  doesCloseOnClick?: boolean;
  isRightToLeft?: boolean;
  isPauseOnFocusLoss?: boolean;
  isDraggable?: boolean;
  pauseOnHover?: boolean;
  theme?: ToastTheme;
}

function Toast({
  position,
  autoCloseTime,
  hideProgressBar,
  newestOnTop,
  doesCloseOnClick,
  isRightToLeft,
  isPauseOnFocusLoss,
  isDraggable,
  pauseOnHover,
  theme,
}: ToastPropTypes) {
  return (
    <div className="toast">
      <ToastContainer
        position={position}
        autoClose={autoCloseTime}
        hideProgressBar={hideProgressBar}
        newestOnTop={newestOnTop}
        closeOnClick={doesCloseOnClick}
        rtl={isRightToLeft}
        pauseOnFocusLoss={isPauseOnFocusLoss}
        draggable={isDraggable}
        pauseOnHover={pauseOnHover}
        theme={theme}
      />
    </div>
  );
}

Toast.defaultProps = {
  position: "top-center",
  autoCloseTime: 3000,
  hideProgressBar: true,
  newestOnTop: true,
  doesCloseOnClick: true,
  isRightToLeft: false,
  isPauseOnFocusLoss: true,
  isDraggable: true,
  pauseOnHover: true,
  theme: "light",
};

export default Toast;
