import React, { useEffect, useState } from "react";

const CocheIndividual = () => {
  const [isEditing, setEditing] = useState(true);
  const handleKeyDown = (event, type) => {
    // Handle when key is pressed
  };
  return (
    <div>
      {isEditing ? (
        <div onClick={() => setEditing(false)}>adios</div>
      ) : (
        <input />
      )}
    </div>
  );
};

export default CocheIndividual;
