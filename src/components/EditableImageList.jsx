const EditableImageList = ({ images, setImages }) => {
  const handleChange = (i, newDescription) => {
    setImages((prev) => {
      const updated = [...prev];
      updated[i] = { ...updated[i], description: newDescription };
      return updated;
    });
  };

  const handleRemove = (i) => {
    setImages((prev) => prev.filter((_, idx) => idx !== i));
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", margin: 10 }}>
      {images.map((img, i) => (
        <div
          style={{
            display: "flex",
            gap: 15,
            marginTop: 10,
          }}
          key={img.url}
        >
          <button style={{ padding: 10 }} onClick={() => handleRemove(i)}>
            x
          </button>
          <img src={img.url} alt="" width={140} />
          <textarea
            style={{ padding: 10, resize: "none" }}
            value={img.description}
            onChange={(e) => handleChange(i, e.target.value)}
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
