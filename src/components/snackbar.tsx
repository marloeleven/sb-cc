import { useAppDispatch } from "@/store";
import { Notification, recipeActions, recipeSelectors } from "@/store/recipe";
import { Alert } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import { useSelector } from "react-redux";

export function NotificationArea() {
  const notifications = useSelector(recipeSelectors.getNotifications);
  const dispatch = useAppDispatch();

  const onClose = (id: Notification["id"]) => () => {
    dispatch(recipeActions.removeNotification(id));
  };

  return (
    <>
      {notifications.map((notification) => (
        <Snackbar
          key={notification.id}
          open={true}
          autoHideDuration={notification?.duration || 3000}
          onClose={onClose(notification.id)}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        >
          <Alert
            onClose={onClose(notification.id)}
            severity={notification.type}
            variant="filled"
            sx={{ width: "100%" }}
          >
            {notification.message}
          </Alert>
        </Snackbar>
      ))}
    </>
  );
}
