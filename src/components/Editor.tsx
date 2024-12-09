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
        </div>
    );
};

export default Editor;
