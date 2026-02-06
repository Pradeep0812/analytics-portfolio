import { NextResponse } from 'next/server';
import { getSearchIndex } from '@/lib/content';

export async function GET() {
    const searchIndex = getSearchIndex();
    return NextResponse.json(searchIndex);
}
