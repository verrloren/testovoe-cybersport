'use client'

import Link from "next/link"


export function Logo() {
	return (
		<Link className="text-write text-4xl" href="/"><i className="text-white font-bold">Match Tracker</i></Link>
	)
}
