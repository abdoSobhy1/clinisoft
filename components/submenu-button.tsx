import Link from "next/link";

type Props = {
    label: string;
    href: string;
    isActive: boolean;
}

export default function SubNav(props: Props) {
    return (
        <Link href={props.href} className={`text-teal fs-var-base opacity-70 font-medium relative px-2 py-2 transition duration-300 uppercase hover:opacity-100 hover:bg-white ${props.isActive ? 'opacity-100 bg-white' : ''}`}>
            {props.label}
        </Link>
    )
}
