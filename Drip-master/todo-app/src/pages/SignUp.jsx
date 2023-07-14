import { useState } from "react";
import Button from "../components/Button";
import Joi from "joi-browser";
import * as userService from "../services/userService";
import auth from "../services/authService";
import Input from "../components/Input";

const SignUp = () => {
  const [errors, setErrors] = useState({});
  const [user, setUser] = useState({});

  const schema = {
    name: Joi.string().required().min(2).label("name"),
    email: Joi.string().email().required().min(5).label("email"),
    password: Joi.string().required().min(6).label("password"),
    repeat_password: Joi.string().required(),
  };

  const handleChange = ({ currentTarget: input }) => {
    const error = { ...errors };
    const errorMessage = validateOnChange(input);

    if (errorMessage) {
      error[input.name] = errorMessage;
    } else {
      delete error[input.name];
    }

    const data = { ...user };
    data[input.name] = input.value;
    setUser(data);
    setErrors(error);
  };

  const validateOnChange = ({ name, value }) => {
    const obj = { [name]: value };
    const schemaValidate = { [name]: schema[name] };
    const { error } = Joi.validate(obj, schemaValidate);
    return error ? error.details[0].message : null;
  };

  const validate = () => {
    const options = { abortEarly: false };
    const result = Joi.validate(user, schema, options);
    if (!result.error) return null;
    const errors = {};
    for (let item of result.error.details) {
      errors[item[path[0]]] = item.message;
    }
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await userService.register(user);
      auth.loginWithJwt(response.headers["x-auth-token"]);
      window.location = "/";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const error = { ...errors };
        error.email = ex.response.data;
        setErrors(error);
      }
    }
    console.log("submitted");
  };

  return (
    <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col items-center gap-4">
          <div className="font-bold text-2xl">Create an account</div>
          <Input
            type="text"
            placeholder="Full name"
            name="name"
            onChange={handleChange}
            errors={errors.name}
          />
          <Input
            type="email"
            placeholder="Email"
            name="email"
            errors={errors.email}
            onChange={handleChange}
          />

          <Input
            type="password"
            placeholder="Password"
            name="password"
            errors={errors.password}
            onChange={handleChange}
          />
          {/* <Input
            type="password"
            placeholder="Repeat Password"
            name="repeat_password"
            errors={() => {
              user.password !== user.repeat_password
                ? console.log("Passwords must be the same")
                : "";
            }}
            onChange={handleChange}
          /> */}
          <Button label="Sign Up" />
        </div>
      </form>
    </div>
  );
};

export default SignUp;
