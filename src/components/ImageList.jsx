import { useState } from "react";

const ImageList = ({ images, description, setDescription }) => {
  const handleChange = (e, i) => {
    const updatedDesc = [...description];
    updatedDesc[i] = e.target.value;
    setDescription(updatedDesc);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", margin: 10 }}>
      {images.map((url, i) => (
        <div style={{ display: "flex", gap: 15, marginTop: 10 }} key={url}>
          <img src={url} alt="" width={140} />
          <textarea
            value={description[i]}
            onChange={(e) => handleChange(e, i)}
            style={{ padding: 10, resize: "none" }}
            rows={3}
            type="text"
            placeholder="Описание/автор"
          />
        </div>
      ))}
    </div>
  );
};

export default ImageList;
