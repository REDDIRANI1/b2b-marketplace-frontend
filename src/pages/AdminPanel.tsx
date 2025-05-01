import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { Manufacturer } from '../types';

const AdminPanel: React.FC = () => {
  const [manufacturers, setManufacturers] = useState<Manufacturer[]>([]);
  const [formData, setFormData] = useState({ name: '', category: '', city: '' });
  const [editId, setEditId] = useState<number | null>(null);

  const fetchManufacturers = async () => {
    const res = await api.get('/manufacturers');
    setManufacturers(res.data);
  };

  useEffect(() => {
    fetchManufacturers();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editId) {
      await api.put(`/manufacturers/${editId}`, formData);
    } else {
      await api.post('/manufacturers', formData);
    }
    setFormData({ name: '', category: '', city: '' });
    setEditId(null);
    fetchManufacturers();
  };

  const handleEdit = (manufacturer: Manufacturer) => {
    setEditId(manufacturer.id);
    setFormData({
      name: manufacturer.name,
      category: manufacturer.category,
      city: manufacturer.city
    });
  };

  const handleDelete = async (id: number) => {
    await api.delete(`/manufacturers/${id}`);
    fetchManufacturers();
  };

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
        background: '#fff',
        borderRadius: '8px',
        boxShadow: '0 0 10px rgba(0,0,0,0.1)',
        width: '500px'
      }}>
        <h2 style={{ textAlign: 'center' }}>Admin Panel</h2>

        <form onSubmit={handleSubmit} style={{ marginBottom: '20px', display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
          <input name="name" placeholder="Name" value={formData.name} onChange={handleChange} required style={{ flex: '1' }} />
          <input name="category" placeholder="Category" value={formData.category} onChange={handleChange} required style={{ flex: '1' }} />
          <input name="city" placeholder="City" value={formData.city} onChange={handleChange} required style={{ flex: '1' }} />
          <button type="submit" style={{ flexBasis: '100%' }}>{editId ? 'Update' : 'Add'}</button>
        </form>

        <ul style={{ listStyle: 'none', padding: 0 }}>
          {manufacturers.map(m => (
            <li key={m.id} style={{ marginBottom: '12px' }}>
              <strong>{m.name}</strong> ({m.category}, {m.city}) &nbsp;
              <button onClick={() => handleEdit(m)}>Edit</button>&nbsp;
              <button onClick={() => handleDelete(m.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminPanel;
