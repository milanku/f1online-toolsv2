import Link from "next/link";

const TOOLS = [{ title: "Formulár na výrobu kvízov", link: "/quizcreator" }];

export default function Home() {
  return TOOLS.map((item) => (
    <Link href={item.link}>
      <a>{`> ${item.title}`} </a>
    </Link>
  ));
}
