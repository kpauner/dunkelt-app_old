import React from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

export default function SignInForm() {
  return (
    <div>
      <form>
        <Input type="email" placeholder="Email" />
        <Input type="email" placeholder="Email" />
        <Button type="submit">Sign In</Button>
      </form>
    </div>
  );
}
