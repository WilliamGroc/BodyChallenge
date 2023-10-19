import InputGroup from "@/app/_components/input-group";
import styles from "./styles.module.css";
import Button from "@/app/_components/button";

export default function Signup() {
  return <main>
    <section className="flex flex-col items-center h-screen">
      <form method="post" action="/api/auth/register" className={`flex flex-col w-1/3 ${styles.form}`}>
        <InputGroup label="Email" name="email" type="email" />
        <InputGroup label="Password" name="password" type="password" />
        <InputGroup label="Password validation" name="passwordValidate" type="password" />
        <Button type="submit">Register</Button>
      </form>
    </section>
  </main>
}