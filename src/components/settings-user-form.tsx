import * as React from "react";
import { useFormik, FormikHelpers } from "formik";
import UIInput, { UIInputContainer, UIInputError } from "./ui-input";
import SettingsBlock, { SettingsFormActions } from "./settings-block";
import { Button } from "./button";
import * as API from "../utils/api";
import { AuthContext, AuthContextType } from "./auth";
import { UserSettingsSchema } from "../utils/validations";

interface IUserFormValues {
  username: string;
  email: string;
}

interface ISettingsUserForm {
  user: IUserFormValues;
}

export default function SettingsUser(props: ISettingsUserForm): JSX.Element {
  const [{ token }] = React.useContext<AuthContextType>(AuthContext);

  const onSubmit = async (
    values: IUserFormValues,
    actions: FormikHelpers<IUserFormValues>
  ): Promise<void> => {
    const { host } = document.location;
    const settings = await API.updateSettings(values, { token, host });
    if (settings) {
      actions.setSubmitting(false);
    }
  };

  const formik = useFormik<IUserFormValues>({
    initialValues: { ...props.user },
    onSubmit,
    validationSchema: UserSettingsSchema
  });

  return (
    <SettingsBlock title="User Settings">
      <form onSubmit={formik.handleSubmit}>
        <UIInputContainer>
          <UIInput
            testID="SETTINGS_USERNAME_INPUT"
            placeholder="username"
            label="Username"
            name="username"
            autoComplete="username"
            value={formik.values.username}
            onChange={formik.handleChange}
          />
          {formik.errors.username && (
            <UIInputError>{formik.errors.username}</UIInputError>
          )}
        </UIInputContainer>
        <UIInputContainer>
          <UIInput
            testID="SETTINGS_EMAIL_INPUT"
            placeholder="user@email.com"
            label="Email"
            autoComplete="email"
            type="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
          />
          {formik.errors.email && <UIInputError>{formik.errors.email}</UIInputError>}
        </UIInputContainer>
        <SettingsFormActions>
          <Button type="submit" disabled={formik.isSubmitting}>
            Save
          </Button>
        </SettingsFormActions>
      </form>
    </SettingsBlock>
  );
}