import React, { Component } from 'react';

function TechItem({tech, onDelete}) {
  return (
    <li key={tech} >
      {tech}
      <button
        onClick={onDelete}
        type="button">
        Remover
      </button>
    </li>
  );
}

export default TechItem;
