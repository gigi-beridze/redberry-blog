import React, { useState, ChangeEvent } from 'react';
// import './uploader.css';
// import { MdCloudUpload, MdDelete } from 'react-icons/md';
// import { AiFillFileImage } from 'react-icons/ai';

function Uploader() {
  const [image, setImage] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string>("No selected file");

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files[0]) {
      setFileName(files[0].name);
      setImage(URL.createObjectURL(files[0]));
    }
  };

  const handleDeleteClick = () => {
    setFileName("No selected File");
    setImage(null);
  };

  return (
    <main>
      <form onClick={() => document.querySelector<HTMLInputElement>(".input-field")?.click()}>
        <input
          type="file"
          accept="image/*"
          className="input-field"
          hidden
          onChange={handleFileChange}
        />

        {image ? (
          <img src={image} width={150} height={150} alt={fileName} />
        ) : (
          <>
            <button color="#1475cf">fa</button>
            <p>Browse Files to upload</p>
          </>
        )}
      </form>

      <section className="uploaded-row">
        <button color="#1475cf">aaaa</button>
        <span className="upload-content">
          {fileName} - 
          <button onClick={handleDeleteClick}>delete</button>
        </span>
      </section>
    </main>
  );
}

export default Uploader;
