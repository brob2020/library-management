"use client";
import config from "@/lib/config";
import { toast } from "sonner";
import { IKImage, IKUpload, ImageKitProvider } from "imagekitio-next";
import { useRef, useState } from "react";
import Image from "next/image";
import { set } from "zod";

const authenticator = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_ENDPOINT}/imagekit`
    );
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Request failed with status:${response.status}, ${errorText}`
      );
    }
    const data = await response.json();
    const { token, expire, signature } = data;
    return { token, expire, signature };
  } catch (error: any) {
    throw new Error(`Authentication request failed: ${error.message}`);
  }
};

const {
  env: {
    imagekit: { publicKey, urlEndpoint },
  },
} = config;

const ImageUpload = ({
  onFileChange,
}: {
  onFileChange: (filePath: String) => void;
}) => {
  const ikUploadRef = useRef(null);
  const [file, setFile] = useState<{ filePath: String } | null>(null);
  const onError = (err: any) => {
    console.error("Error during upload:", err);
    toast.error("File upload failed. Please try again.", {
      description: `You can try uploading a different file or check your internet connection.`,
    });
  };
  const onSuccess = (res: any) => {
    setFile(res);
    onFileChange(res.filePath);
    toast.success("File uploaded successfully!", {
      description: `${res.filePath} has been uploaded successfully.`,
    });
  };

  return (
    <ImageKitProvider
      urlEndpoint={urlEndpoint}
      publicKey={publicKey}
      authenticator={authenticator}
    >
      <IKUpload
        className="hidden"
        ref={ikUploadRef}
        onError={onError}
        onSuccess={onSuccess}
        fileName="test-file.jpg"
      />
      <button
        className="upload-btn"
        onClick={(e) => {
          e.preventDefault();
          if (ikUploadRef.current) {
            // @ts-ignore
            ikUploadRef.current?.click();
          }
        }}
      >
        <Image
          src="/icons/upload.svg"
          alt="upload-icon"
          width={20}
          height={20}
          className="object-contain"
        />
        <p className="text-base text-light-100">Upload a file</p>
        {file && <p className="upload-filemane">{file.filePath}</p>}
      </button>
      {file && (
        <IKImage
          alt={file.filePath as string}
          path={file.filePath as string}
          width={500}
          height={300}
        />
      )}
    </ImageKitProvider>
  );
};

export default ImageUpload;
