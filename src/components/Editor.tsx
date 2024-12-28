"use client";

import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

interface EditorProps {
    value: string;
    readOnly: boolean;
    onChange: (value: string) => void;
}

const Editor: React.FC<EditorProps> = ({ value, readOnly, onChange }) => {
    return (
        <div className="container mx-auto">
            <ReactQuill
                value={value}
                onChange={onChange}
                theme="snow"
                className="h-64"
                readOnly={readOnly}
            />
        </div>
    );
};

export default Editor;
