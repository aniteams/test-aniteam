"use client";
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function Tag({ icon, text }) {
  return (
    <div className="flex items-center gap-1 px-2 py-1 bg-[#333] rounded text-xs text-white">
      {icon && <FontAwesomeIcon icon={icon} className="text-xs" />}
      <span>{text}</span>
    </div>
  );
}

export default Tag; 