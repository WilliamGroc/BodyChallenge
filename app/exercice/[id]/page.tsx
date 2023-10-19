import Link from "next/link";
import FormExercice from "./form";
import Button from "@/app/_components/button";

export default function Exercice() {
  return <main>
    <Link href="/"><Button>Back</Button></Link>
    <section>
      <FormExercice />
    </section>
  </main>
}