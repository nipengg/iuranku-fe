import { API_FLASK_URL } from '@/constant';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    const formData = await req.formData();
    const imageFile = formData.get('image') as File | null;

    if (!imageFile) {
        return NextResponse.json({ error: 'No image file uploaded' }, { status: 400 });
    }

    const form = new FormData();
    form.append('image', imageFile, imageFile.name);

    try {
        const response = await fetch(`${API_FLASK_URL}/process-image`, {
            method: 'POST',
            body: form,
        });

        if (!response.ok) {
            const errorDetails = await response.json();
            return NextResponse.json(
                { error: 'Error from Flask API', details: errorDetails },
                { status: response.status }
            );
        }

        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        return NextResponse.json(
            { error: 'Error communicating with Flask API', details: errorMessage },
            { status: 500 }
        );
    }
}
