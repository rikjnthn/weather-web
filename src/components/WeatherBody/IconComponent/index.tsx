import React from "react";
import Image from "next/image";

const IconComponent = ({
  src,
  alt,
}: {
  src: string;
  alt: string;
}) => {
  return (
    <Image
      src={src}
      alt={alt}
      width="20"
      height="20"
    />
  );
};

export default IconComponent;
