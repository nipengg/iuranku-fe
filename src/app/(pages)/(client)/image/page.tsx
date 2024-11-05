'use client'
import React, { useState } from 'react';

const About: React.FC = () => {
    const [image, setImage] = useState<File | null>(null);
    const [response, setResponse] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files && files.length > 0) {
            setImage(files[0]);
        }
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!image) {
            setError('Please upload an image file.');
            return;
        }

        setError(null); // Clear previous errors

        const formData = new FormData();
        formData.append('image', image);

        try {
            const res = await fetch('/api/processImage', {
                method: 'POST',
                body: formData,
            });

            if (!res.ok) {
                throw new Error('Failed to upload image');
            }

            const jsonResponse = await res.json();
            setResponse(jsonResponse);
        } catch (err: any) {
            setError(err.message || 'An error occurred');
        }
    };

    return (
        <div>
            <h1>Upload Image</h1>
            <form onSubmit={handleSubmit}>
                <input type="file" accept="image/*" onChange={handleFileChange} />
                <button type="submit">Upload</button>
            </form>

            {error && <p style={{ color: 'red' }}>{error}</p>}

            {response && (
                <div>
                    <h2>Response</h2>
                    <pre>{JSON.stringify(response, null, 2)}</pre>
                </div>
            )}
        </div>
    );
};

export default About;
