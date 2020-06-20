import * as React from "react";
import { useFormik } from "formik";
import "isomorphic-unfetch";
import UIInput, { UIInputError, UIInputContainer } from "./ui-input";
import { Button } from "./button";
import LegalBoilerplate from "./legal-boilerplate";
import { useLoginFns, IRegisterValues } from "../hooks";
import { RegisterFormSchema } from "../utils/validations";
import { StringTMap } from "../utils/types";

interface IInput extends StringTMap<string> {
  name?: string;
  type?: string;
  placeholder?: string;
  label?: string;
  autoComplete?: string;
}

const REGISTER_INPUTS: IInput[] = [
  {
    name: "username",
    label: "Username",
    placeholder: "Try for something unique",
    type: "text",
    autoComplete: "email"
  },
  {
    name: "email",
    type: "email",
    placeholder: "mail@email.com",
    label: "Email",
    autoComplete: "email"
  },
  {
    name: "password",
    type: "password",
    placeholder: "*********",
    label: "Password",
    autoComplete: "current-password"
  }
];

export default function RegisterForm(): JSX.Element {
  const { onRegisterSubmit } = useLoginFns();

  const { values, handleChange, handleSubmit, errors } = useFormik<IRegisterValues>({
    initialValues: {
      legalChecked: false,
      username: "",
      password: "",
      email: ""
    },
    validationSchema: RegisterFormSchema,

    onSubmit: onRegisterSubmit
  });

  return (
    <form onSubmit={handleSubmit}>
      <div>
        {REGISTER_INPUTS.map(input => (
          <UIInputContainer key={input.name}>
            <UIInput
              type={input.type}
              placeholder={input.placeholder}
              label={input.label}
              autoComplete={input.autoComplete}
              name={input.name}
              value={values[input.name] as string}
              onChange={handleChange}
            />
            {errors[input.name] && <UIInputError>{errors[input.name]}</UIInputError>}
          </UIInputContainer>
        ))}
      </div>
      <LegalBoilerplate
        name="legalChecked"
        checked={values.legalChecked}
        onChange={handleChange}
      />
      <div className="u-right">
        <UIInputContainer style={{ display: "inline-block" }}>
          <Button disabled={!values.legalChecked} type="submit">
            Register
          </Button>
        </UIInputContainer>
      </div>
    </form>
  );
}