import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';

const PATHS = ['/', '/casas', '/nosotros', '/experiencias', '/estadias', '/ubicacion', '/la-casita', '/en'];

export async function POST() {
  try {
    for (const path of PATHS) {
      revalidatePath(path);
    }
    revalidatePath('/', 'layout');
    return NextResponse.json({ ok: true, revalidated: PATHS, timestamp: new Date().toISOString() });
  } catch (err) {
    return NextResponse.json({ ok: false, error: String(err) }, { status: 500 });
  }
}
