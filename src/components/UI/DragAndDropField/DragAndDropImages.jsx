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
    className="border-dashed border-gray-300 border-2 mt-4 p-6 text-center"
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
    >
      {"Перетащите изображения сюда или "}
      <input
        className="border-2 border-solid border-teal-700 cursor-pointer pl-5 p-1 justify-center text-center hover:bg-teal-700 transition-all duration-200 ease-in-out"
        type="file"
        accept="image/*"
        multiple
        onChange={(e) => handleFiles(e.target.files)}
      />
    </div>
  );
};

export default DragAndDropImages;
