import React from 'react';

const EditableImageList = ({ images, setImages }) => {
  const handleChange = (index, newDescription) => {
    setImages(prev =>
      prev.map((img, idx) =>
        idx === index ? { ...img, description: newDescription } : img
      )
    );
  };

  const handleRemove = index => {
    setImages(prev => prev.filter((_, idx) => idx !== index));
  };

  return (
    <div className="flex flex-col m-2 min-w-1/4 items-center">
      {images.map((img, index) => (
        <div key={img.url} className="flex items-center gap-4 mt-2">
          <button
            onClick={() => handleRemove(index)}
            className="p-2 bg-red-900 text-white rounded-sm hover:bg-red-600 hover:cursor-pointer transition"
          >
            ×
          </button>

          <img
            src={img.url}
            alt={img.description || 'Загруженное изображение'}
            className="w-36 h-auto rounded-md shadow"
          />

          <textarea
            value={img.description}
            onChange={e => handleChange(index, e.target.value)}
            rows={3}
            placeholder="Описание/автор"
            className="flex-1 p-2 border border-gray-600 rounded-md bg-gray-800 text-white resize-none focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
      ))}
    </div>
  );
};

export default EditableImageList;
