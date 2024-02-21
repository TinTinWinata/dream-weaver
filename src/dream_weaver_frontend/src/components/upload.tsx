import { Dispatch, SetStateAction, useCallback } from 'react';

import { useDropzone } from 'react-dropzone';
import { FaCloudArrowDown } from "react-icons/fa6";


interface IUploadProps {
  title?: string;
  accept: string[];
  label?: string;
  selectedFile: File | undefined | null;
  setSelectedFile: Dispatch<SetStateAction<File | undefined>>;
}

export default function Upload({
  title,
  accept,
  selectedFile,
  label = 'Upload File',
  setSelectedFile,
}: IUploadProps) {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles[0]) {
      setSelectedFile(acceptedFiles[0]);
    }
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  const acceptStr = accept.toString();
  return (
    <div className="">
      <div className="mb-2 text-sm">{label}</div>
      <div
        className={`border focus:outline-none transition-all focus:none border-gray-500 rounded-xl w-full h-[250px] flex flex-col justify-center items-center gap-0 ${
          isDragActive ? 'bg-gray-700' : 'bg-transparent'
        }`}
        {...getRootProps()}
      >
        <input {...getInputProps()} multiple={false} accept={acceptStr} />
        <div className="center">
          <FaCloudArrowDown className='w-24 h-24'/>
        </div>
        <p>{title} </p>
      </div>
      {selectedFile && (
        <p className="text-gray-400 text-sm mt-2">* {selectedFile.name}</p>
      )}
    </div>
  );
}
