const ImageList = (images) => {
  return (
    <div style={{ display: "flex", gap: 10, margin: 10 }}>
      {images.map((file, idx) => (
        <div key={idx}>
          <img src={URL.createObjectURL(file)} alt="" width={100} />
        </div>
      ))}
    </div>
  );
};

export default ImageList;
