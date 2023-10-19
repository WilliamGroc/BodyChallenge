import InputGroup from "@/app/_components/input-group";
import Button from "@/app/_components/button";
import Form from "@/app/_components/form";

export default function Signup() {
  return <main>
    <section className="flex flex-col items-center h-screen">
      <Form method="post" action="/api/auth/register">
        <InputGroup label="Email" name="email" type="email" />
        <InputGroup label="Password" name="password" type="password" />
        <InputGroup label="Password validation" name="passwordValidate" type="password" />
        <Button type="submit">Register</Button>
      </Form>
    </section>
  </main>
}