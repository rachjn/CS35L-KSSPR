import React from "react";
import Link from "next/link";

const IconButton = ({
  href,
  icon: Icon,
  ariaLabel,
  title,
  bgColor,
  hoverBgColor,
}) => (
  <Link href={href} legacyBehavior>
    <a
      className={`w-16 h-16 ${bgColor} ${hoverBgColor} text-white flex items-center justify-center rounded shadow hover:shadow-lg transform hover:scale-105 transition-transform duration-200 focus:outline-none focus:ring-2 focus:ring-${bgColor.split("-")[1]}-300`}
      aria-label={ariaLabel}
      title={title}
    >
      <Icon size={24} />
    </a>
  </Link>
);

export default IconButton;
