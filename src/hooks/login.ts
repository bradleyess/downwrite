import * as React from "react";
import { AuthContext, AuthContextType } from "../components/auth";
import { useUINotifications, NotificationType } from "../reducers/notifications";
import { StringTMap } from "../utils/types";
import { useLoginUserMutation, useCreateUserMutation } from "../utils/generated";

export interface IRegisterValues extends StringTMap<string | boolean> {
  username: string;
  password: string;
  legalChecked: boolean;
  email: string;
}

export interface ILoginValues extends StringTMap<string> {
  user: string;
  password: string;
}

interface IFormHandlers {
  onLoginSubmit: (values: ILoginValues) => void;
  onRegisterSubmit: (values: IRegisterValues) => void;
}

export default function useLoginFns(): IFormHandlers {
  const [, { signIn }] = React.useContext<AuthContextType>(AuthContext);
  const [{ notifications }, actions] = useUINotifications();
  const [createUser] = useCreateUserMutation();

  const [authenticateUser] = useLoginUserMutation();

  const onLoginSubmit = React.useCallback(async (values: ILoginValues): Promise<
    void
  > => {
    await authenticateUser({
      variables: {
        username: values.user,
        password: values.password
      }
    })
      .then(value => {
        if (value.data.authenticateUser.token) {
          const token = value.data.authenticateUser.token;
          signIn(token !== undefined, token);
          if (notifications.length > 0) {
            notifications.forEach(n => {
              actions.removeNotification(n);
            });
          }
        }
      })
      .catch(error => {
        actions.addNotification(error.message, NotificationType.ERROR);
      });
  }, []);

  const onRegisterSubmit = React.useCallback(
    async (values: IRegisterValues): Promise<void> => {
      if (values.legalChecked) {
        await createUser({
          variables: {
            email: values.email,
            username: values.username,
            password: values.password
          }
        })
          .then(value => {
            const token = value.data.createUser.token;

            signIn(token !== undefined, token);
          })
          .catch(error => {
            actions.addNotification(error.message, NotificationType.ERROR);
          });
      }
    },
    []
  );

  return {
    onLoginSubmit,
    onRegisterSubmit
  };
}