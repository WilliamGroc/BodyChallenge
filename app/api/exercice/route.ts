export async function POST(req: Request) {
  const formData = await req.formData();

  console.log(formData.get('name'));

  return new Response('ok');
}