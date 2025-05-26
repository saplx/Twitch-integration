const DragAndDropImages = ({ setImages }) => {
  const handleDrop = (e) => {
    e.preventDefault();
    handleFiles(e.dataTransfer.files);
  };

  const handleFiles = (fileList) => {
    const files = Array.from(fileList).filter((f) =>
      f.type.startsWith("image/")
    );

    const newImages = files.map((file) => {
      const url = URL.createObjectURL(file);
      return { url, description: "" };
    });

    setImages((prev) => [...prev, ...newImages]);
  };

  return (
    <div
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
      style={{ border: "2px dashed #ccc", padding: 20, textAlign: "center" }}
    >
      {"Перетащите изображения сюда или "}
      <input
        type="file"
        accept="image/*"
        multiple
        onChange={(e) => handleFiles(e.target.files)}
      />
    </div>
  );
};

export default DragAndDropImages;
