import React from 'react';
import { Manufacturer } from '../types';
import { useNavigate } from 'react-router-dom';

interface Props {
  manufacturer: Manufacturer;
}

const ManufacturerCard: React.FC<Props> = ({ manufacturer }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/manufacturer/${manufacturer.id}`)}
      style={{
        border: '1px solid #ccc',
        padding: '10px',
        marginBottom: '10px',
        cursor: 'pointer'
      }}
    >
      <h3>{manufacturer.name}</h3>
      <p><strong>Category:</strong> {manufacturer.category}</p>
      <p><strong>City:</strong> {manufacturer.city}</p>
    </div>
  );
};

export default ManufacturerCard;
