import { FC } from "react";
import { Card } from "./ui/card";
import { AuthenticationForm } from "./ui/form";

const LoginPage: FC = () => {
  return (
    <>
      <Card header="Login" subHeader="Welcome back.">
        <AuthenticationForm submitUrl="/api/users/login" btnText="Login In" />
      </Card>
    </>
  );
};

export default LoginPage;
