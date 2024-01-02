import { readFileSync } from 'fs'
import path from 'path'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
	const body = (await request.json()) as { url: string }
	const block_list = readFileSync(path.join(process.cwd(), 'public', 'block-list.txt'))
	const regex = new RegExp(` ${body.url.replace(/(https:\/\/|(^|\/)www\.)/, '')}`, 'gm')
	const block = regex.test(block_list.toString())
	return NextResponse.json({ block })
}
