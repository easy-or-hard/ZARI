import {
  ALERT_HANDLER,
  CONFIRM_HANDLER,
  ModalAction,
  SET_ALERT_CONTENT,
  SET_CONFIRM_CONTENT,
} from "../actions/modalAction";

export const modalHandlerReducer = (
  state = { alert: false, confirm: false },
  action: ModalAction
) => {
  switch (action.type) {
    case ALERT_HANDLER:
      return { ...state, alert: action.payload };
    case CONFIRM_HANDLER:
      return { ...state, confirm: action.payload };
    default:
      return state;
  }
};

export const modalContentsReducer = (
  state = { alertContent: "", confirmContent: {} },
  action: ModalAction
) => {
  switch (action.type) {
    case SET_ALERT_CONTENT:
      return { ...state, alertContent: action.payload };
    case SET_CONFIRM_CONTENT:
      return { ...state, confirmContent: action.payload };
    default:
      return state;
  }
};
