"use client";

import { useRef } from "react";

const FileInputTest = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  function handleChange(files: FileList | null): void {
    console.log("Detected onChange event:");
    console.log(files);
    console.log(files ? files[0] : "No files");
  }

  return (
    <>
      <input
        type="file"
        ref={fileInputRef}
        id="fileInput"
        className="hidden"
        onChange={(e) => handleChange(e.target.files)}
        onClick={(e) => {
          console.log("Detected click on fileInput");

          (e.target as HTMLInputElement).value = "";
        }}
      />
      <button
        onClick={() => {
          console.log("Detected click on button");
          fileInputRef.current?.click();
        }}
      >
        Choose File
      </button>
    </>
  );
};

export default FileInputTest;
