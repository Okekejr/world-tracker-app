import { FC } from "react";
import { Card } from "./ui/card";
import { AuthenticationForm } from "./ui/form";
import { SectionContainer } from "./sectionContainer";

const LoginPage: FC = () => {
  return (
    <>
      <SectionContainer>
        <Card header="Login" subHeader="Welcome back.">
          <AuthenticationForm submitUrl="/api/users/login" btnText="Login In" />
        </Card>
      </SectionContainer>
    </>
  );
};

export default LoginPage;
