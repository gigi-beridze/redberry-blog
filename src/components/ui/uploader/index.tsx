import React, { useState, ChangeEvent, useRef, useEffect } from 'react';
import ImageIcon from '../../../assets/formImageIcon.svg';
import RemoveIcon from '../../../assets/formRemoveIcon.svg';

export const Uploader = () => {
  const [imageInfo, setImageInfo] = useState<{ link: string | null; name: string }>({ link: null, name: 'No selected file' });
  const inputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  useEffect(() => {
    const storedImageInfo = localStorage.getItem('uploadedImageInfo');
    if (storedImageInfo) {
      setImageInfo(JSON.parse(storedImageInfo));
    }
  }, []);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;

    if (files && files[0]) {
      const newImageInfo = {
        link: URL.createObjectURL(files[0]),
        name: files[0].name,
      };
      setImageInfo(newImageInfo);

      // Save the image info in local storage
      localStorage.setItem('uploadedImageInfo', JSON.stringify(newImageInfo));
    }

    const file: any = event.target.files?.[0] || null;
    setSelectedFile(file);
  };

  const handleClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const handleRemove = () => {
    setSelectedFile(null);
    setImageInfo({ link: null, name: 'No selected file' });

    // Remove the image info from local storage
    localStorage.removeItem('uploadedImageInfo');
  };

  return (
    <div>
      {imageInfo.link || selectedFile ? (
        <UploadedImage handleRemove={handleRemove} selectedFile={selectedFile} imageInfo={imageInfo} />
      ) : (
        <div className="uploader">
          <div style={{ paddingBottom: '8px' }}>
            <span className="input-title" style={{ marginTop: '24px' }}>
              ატვირთეთ ფოტო
            </span>
          </div>
          <form onClick={handleClick}>
            <input
              ref={inputRef}
              type="file"
              accept="image/*"
              className="input-field"
              hidden
              onChange={handleFileChange}
            />
            <>
              <button className="input-field-uploader">
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
                  <path
                    opacity="0.4"
                    d="M36.233 15.7333H3.33301V10.7C3.33301 6.63333 6.63301 3.33333 10.6997 3.33333H14.583C17.2997 3.33333 18.1497 4.21667 19.233 5.66667L21.5663 8.76667C22.083 9.45 22.1497 9.55 23.1163 9.55H27.7663C31.7163 9.53333 35.083 12.1333 36.233 15.7333Z"
                    fill="#5D37F3"
                  />
                  <path
                    d="M36.6497 18.0667C36.6163 17.25 36.483 16.4833 36.233 15.7333H3.33301V27.75C3.33301 32.6667 7.33301 36.6667 12.2497 36.6667H27.7497C32.6663 36.6667 36.6663 32.6667 36.6663 27.75V18.45C36.6663 18.3333 36.6663 18.1833 36.6497 18.0667ZM24.1663 27.0833H21.3497V30C21.3497 30.6833 20.783 31.25 20.0997 31.25C19.4163 31.25 18.8497 30.6833 18.8497 30V27.0833H15.833C15.1497 27.0833 14.583 26.5167 14.583 25.8333C14.583 25.15 15.1497 24.5833 15.833 24.5833H18.8497V21.6667C18.8497 20.9833 19.4163 20.4167 20.0997 20.4167C20.783 20.4167 21.3497 20.9833 21.3497 21.6667V24.5833H24.1663C24.8497 24.5833 25.4163 25.15 25.4163 25.8333C25.4163 26.5167 24.8497 27.0833 24.1663 27.0833Z"
                    fill="#5D37F3"
                  />
                </svg>
              </button>
              <p className="input-field-uploader-text">
                ჩააგდეთ ფაილი აქ ან <a className="uploader-a">აირჩიეთ ფაილი</a>
              </p>
            </>
          </form>
        </div>
      )}
    </div>
  );
};

const UploadedImage = ({ handleRemove, selectedFile, imageInfo }: { handleRemove: () => void; selectedFile: any; imageInfo: any }) => {
  return (
    <div className="uploaded-image">
      <div className="uploaded-image-item">
        <img src={ImageIcon} alt="image_icon" />
        <span className="selected-image-form">Selected Image: {selectedFile?.name || imageInfo.name}</span>
      </div>
      <button className="image-remove-form" onClick={handleRemove}>
        <img src={RemoveIcon} alt="remove_icon" />
      </button>
    </div>
  );
};
