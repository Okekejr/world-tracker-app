import { FC } from "react";
import { Card } from "./ui/card";
import { AuthenticationForm } from "./ui/form";
import { SectionContainer } from "./sectionContainer";

const SignUpPage: FC = () => {
  return (
    <>
      <SectionContainer>
        <Card header="Register" subHeader="Create a new account">
          <AuthenticationForm submitUrl="/api/users/register" />
        </Card>
      </SectionContainer>
    </>
  );
};

export default SignUpPage;
