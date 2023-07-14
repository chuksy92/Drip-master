import { useState } from "react";
import Joi from "joi-browser";
import Input from "../components/Input";
import auth from "../services/authService";
import Button from "../components/Button";

const SignIn = () => {
  const [errors, setErrors] = useState({});
  const [user, setUser] = useState({});

  const schema = {
    name: Joi.string().min(2).required().label("name"),
    email: Joi.string().email().min(5).required().label("email"),
    password: Joi.string().min(6).required().label("password"),
    repeat_password: Joi.ref("password"),
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
      const data = user;
      const { data: jwt } = await auth.login(data.email, data.password);
      localStorage.setItem("token", jwt);
      window.location = "/";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const error = { ...errors };
        error.email = ex.response.data;
        setErrors(error);
      }
    }
  };

  return (
    <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col items-center gap-4">
          <div className="font-bold text-2xl">Log In</div>
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
            onChange={handleChange}
          />
          <Button label="Log In" />
        </div>
      </form>
    </div>
  );
};

export default SignIn;
