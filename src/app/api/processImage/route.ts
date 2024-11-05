import { NextResponse } from 'next/server';
import { PythonShell } from 'python-shell';

export async function POST(req: Request) {
    const formData = await req.formData();
    const imageFile = formData.get('image') as File | null;

    if (!imageFile) {
        return NextResponse.json({ error: 'No image file uploaded' }, { status: 400 });
    }

    const buffer = Buffer.from(await imageFile.arrayBuffer());

    const base64Image = buffer.toString('base64');

    const options = {
        args: [base64Image],
        scriptPath: './src/python',
    };

    try {
        const results = await new Promise<string[]>((resolve, reject) => {
            const pythonProcess = PythonShell.run('process_image.py', options);
            pythonProcess.then(resolve).catch(reject);
        });

        const output = results && results.length > 0 ? JSON.parse(results[0]) : null;

        return NextResponse.json(output);
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        return NextResponse.json({ error: 'Error executing Python script', details: errorMessage }, { status: 500 });
    }
}
