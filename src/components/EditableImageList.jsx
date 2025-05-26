const EditableImageList = ({ images, setImages }) => {
  const handleChange = (i, newDescription) => {
    setImages((prev) => {
      const updated = [...prev];
      updated[i] = { ...updated[i], description: newDescription };
      return updated;
    });
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", margin: 10 }}>
      {images.map((img, i) => (
        <div style={{ display: "flex", gap: 15, marginTop: 10 }} key={img.url}>
          <img src={img.url} alt="" width={140} />
          <textarea
            value={img.description}
            onChange={(e) => handleChange(i, e.target.value)}
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

export default EditableImageList;
