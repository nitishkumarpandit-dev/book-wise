"use client";

import AuthForm from "@/components/AuthForm";
import { signUpSchema } from "@/lib/validations";
import React from "react";

const SignUp = () => {
  return (
    <AuthForm
      type="SIGN_UP"
      schema={signUpSchema}
      defaultValues={{
        fullName: "",
        email: "",
        universityId: 0,
        password: "",
        universityCard: "",
      }}
      onSubmit={(data) => {
        console.log(data);
      }}
    />
  );
};

export default SignUp;
