import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api';
import { Manufacturer } from '../types';
import { AxiosResponse } from 'axios';

const ManufacturerDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [manufacturer, setManufacturer] = useState<Manufacturer | null>(null);

  useEffect(() => {
    api.get(`/manufacturers/${id}`)
      .then((res: AxiosResponse<Manufacturer>) => setManufacturer(res.data))
      .catch((err: unknown) => {
        console.error("Failed to fetch manufacturer", err);
      });
  }, [id]);

  if (!manufacturer) return <p>Loading manufacturer...</p>;

  return (
    <div style={{
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      background: '#f7f7f7'
    }}>
      <div style={{
        padding: '30px',
        borderRadius: '8px',
        background: '#fff',
        boxShadow: '0 0 10px rgba(0,0,0,0.1)',
        width: '400px'
      }}>
        <h2>{manufacturer.name}</h2>
        <p><strong>Category:</strong> {manufacturer.category}</p>
        <p><strong>City:</strong> {manufacturer.city}</p>
        <h3>Products:</h3>
        <ul>
          {manufacturer.products.map((product) => (
            <li key={product.id}>
              {product.name} – ₹{product.price}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ManufacturerDetail;
