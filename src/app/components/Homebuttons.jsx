import Link from "next/link";
export default function Homebutton({ text, href }) {
  return (
    <Link href={href}>
      <button className="bg-transparent text-2xl p-3 h-20 w-48 font-se text-white border   border-b-8 border-primary font-lexend hover:bg-primary hover:text-black hover:border-b-8">
        {text}
      </button>
    </Link>
  );
}
