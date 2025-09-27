import React, { useState, useRef } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const AvatarUpload = ({ onImageSelect, selectedImage, error }) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileSelect = (file) => {
    if (file && file.type && file.type.startsWith('image/')) {
      // Check file size (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        onImageSelect(null, 'File size must be less than 5MB');
        return;
      }
      
      const reader = new FileReader();
      reader.onload = (e) => {
        onImageSelect(e.target.result);
      };
      reader.onerror = () => {
        onImageSelect(null, 'Error reading file');
      };
      reader.readAsDataURL(file);
    } else {
      onImageSelect(null, 'Please select a valid image file');
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    handleFileSelect(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    handleFileSelect(file);
  };

  const removeImage = () => {
    onImageSelect(null);
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <div
        className={`relative w-32 h-32 rounded-full border-2 border-dashed transition-smooth cursor-pointer ${
          isDragging
            ? 'border-primary bg-primary/10'
            : error
            ? 'border-error bg-error/5' 
            : 'border-border hover:border-primary hover:bg-muted/50'
        }`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={handleClick}
      >
        {selectedImage ? (
          <>
            <Image
              src={selectedImage}
              alt="Profile avatar"
              className="w-full h-full rounded-full object-cover"
            />
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                removeImage();
              }}
              className="absolute -top-2 -right-2 w-6 h-6 bg-error text-error-foreground rounded-full flex items-center justify-center hover:bg-error/90 transition-smooth"
            >
              <Icon name="X" size={14} />
            </button>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center h-full space-y-2">
            <Icon 
              name="Upload" 
              size={24} 
              className={isDragging ? 'text-primary' : 'text-muted-foreground'} 
            />
            <span className="text-xs text-muted-foreground text-center px-2">
              Drop image or click
            </span>
          </div>
        )}
      </div>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />
      <div className="text-center">
        <p className="text-sm text-muted-foreground">
          Upload your profile picture
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          JPG, PNG or GIF (max. 5MB)
        </p>
      </div>
      {error && (
        <p className="text-sm text-error text-center">{error}</p>
      )}
    </div>
  );
};

export default AvatarUpload;