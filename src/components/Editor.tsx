"use client";

import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const Editor: React.FC = () => {
    const [content, setContent] = useState<string>("");

    const handleChange = (value: string) => {
        setContent(value);
    };

    return (
        <div className="container mx-auto">
            <ReactQuill
                value={content}
                onChange={handleChange}
                theme="snow"
                className="h-64"
            />
            <div className="mt-16">
                <h3 className="text-lg font-semibold">Preview:</h3>
                <div
                    className="border p-4 mt-2"
                    dangerouslySetInnerHTML={{ __html: content }}
                ></div>
            </div>
        </div>
    );
};

export default Editor;
