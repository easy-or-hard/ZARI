export const SET_ALERT_CONTENT = "SET_ALERT_CONTENT";
export const SET_CONFIRM_CONTENT = "SET_CONFIRM_CONTENT";
export const ALERT_HANDLER = "ALERT_HANDLER";
export const CONFIRM_HANDLER = "CONFIRM_HANDLER";

export type ModalAction =
  | ReturnType<typeof setAlertContentAction>
  | ReturnType<typeof setConfirmContentAction>
  | ReturnType<typeof alertHandler>
  | ReturnType<typeof confirmHandler>;

interface ConfirmContent {
  content: String;
  confirmFunc: () => void;
}
type ContentProps = String | ConfirmContent;

export const setAlertContentAction = (data: ContentProps) => {
  return {
    type: SET_ALERT_CONTENT,
    payload: data,
  };
};

export const setConfirmContentAction = (data: ContentProps) => {
  return {
    type: SET_CONFIRM_CONTENT,
    payload: data,
  };
};

export const alertHandler = (data: boolean) => {
  return {
    type: ALERT_HANDLER,
    payload: data,
  };
};

export const confirmHandler = (data: boolean) => {
  return {
    type: CONFIRM_HANDLER,
    payload: data,
  };
};
