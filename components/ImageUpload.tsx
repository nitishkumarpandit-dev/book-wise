"use client";

import { toast } from "@/hooks/use-toast";
import config from "@/lib/config";
import { IKImage, ImageKitProvider, IKUpload } from "imagekitio-next";
import Image from "next/image";
import React, { useRef, useState } from "react";
import Spinner from "./Spinner";

const authenticator = async () => {
  try {
    const response = await fetch(`${config.env.apiEndpoint}/api/auth/imagekit`);

    if (!response.ok) {
      const errorText = await response.text();

      throw new Error(
        `Request failed with status ${response.status}: ${errorText}`
      );
    }

    const data = await response.json();

    const { signature, expire, token } = data;

    return { signature, expire, token };
  } catch (error: any) {
    throw new Error(`Authentication request failed ${error.message}`);
  }
};

const ImageUpload = ({
  onFileChange,
}: {
  onFileChange: (filePath: string) => void;
}) => {
  const ikUploadRef = useRef(null);

  const [file, setFile] = useState<{ filePath: string } | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const onError = (error: any) => {
    setIsUploading(false);
    console.log("error", error);
    toast({
      title: "Image upload failed",
      description: `Your image could not be uploaded. Please try again`,
      variant: "destructive",
    });
  };

  const onSuccess = (res: any) => {
    setIsUploading(false);
    setFile(res);
    onFileChange(res.filePath);
    toast({
      title: "Image uploaded successfully",
      description: `${res.filePath} uploaded successfully`,
    });
  };

  const onUploadStart = (progress: any) => {
    setIsUploading(true);
  };

  return (
    <ImageKitProvider
      publicKey={config.env.imagekit.publicKey}
      urlEndpoint={config.env.imagekit.urlEndpoint}
      authenticator={authenticator}
    >
      <IKUpload
        className="hidden"
        onError={onError}
        onSuccess={onSuccess}
        ref={ikUploadRef}
        fileName="test-upload.png"
        onUploadProgress={onUploadStart}
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
          src={"/icons/upload.svg"}
          alt="upload-icon"
          width={20}
          height={20}
          className="object-contain"
        />
        {isUploading ? (
          <div className="text-base flex items-center justify-center gap-2 text-light-100">
            Uploading file <Spinner />
          </div> // Change this to a spinner
        ) : (
          <p className="text-base text-light-100">Upload a file</p>
        )}

        {file && <p className="upload-filename">{file.filePath}</p>}
      </button>

      {file && (
        <IKImage
          alt={file.filePath}
          path={file.filePath}
          width={500}
          height={300}
        />
      )}
    </ImageKitProvider>
  );
};

export default ImageUpload;
