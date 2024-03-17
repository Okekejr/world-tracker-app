import { FC } from "react";
import { Card } from "./ui/card";
import { AuthenticationForm } from "./ui/form";

const SignUpPage: FC = () => {
  return (
    <>
      <Card header="Register" subHeader="Create a new account">
        <AuthenticationForm submitUrl="/api/users/register" />
      </Card>
    </>
  );
};

export default SignUpPage;
