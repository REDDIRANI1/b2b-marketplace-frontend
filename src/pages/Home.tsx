import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { Manufacturer } from '../types';
import ManufacturerCard from '../components/ManufacturerCard';

const Home: React.FC = () => {
  const [manufacturers, setManufacturers] = useState<Manufacturer[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [page, setPage] = useState(1);
  const limit = 3;

  const categories = ['All', 'Textile', 'Chemicals', 'Electronics', 'Food'];

  const fetchManufacturers = async (keyword: string = '', page: number = 1) => {
    try {
      const offset = (page - 1) * limit;
      const response = await api.get('/manufacturers', {
        params: {
          local_kw: keyword || undefined,
          limit,
          offset
        }
      });
      setManufacturers(response.data);
    } catch (err) {
      console.error("Failed to fetch manufacturers", err);
    }
  };

  useEffect(() => {
    fetchManufacturers('', page);
  }, [page]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    fetchManufacturers(searchTerm, 1);
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const category = e.target.value;
    setSelectedCategory(category);
    setPage(1);
    fetchManufacturers(category === 'All' ? '' : category, 1);
  };

  const currentKeyword = selectedCategory !== 'All' && selectedCategory !== ''
    ? selectedCategory
    : searchTerm;

  return (
    <div style={{ padding: '20px' }}>
      <h1>B2B Marketplace</h1>

      <form onSubmit={handleSearch} style={{ marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Search by name, city, or category"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ padding: '8px', width: '300px', marginRight: '10px' }}
        />
        <button type="submit" style={{ padding: '8px 16px' }}>Search</button>
      </form>

      <div style={{ marginBottom: '20px' }}>
        <label htmlFor="category">Filter by Category: </label>
        <select
          id="category"
          value={selectedCategory}
          onChange={handleCategoryChange}
          style={{ padding: '8px' }}
        >
          {categories.map(cat => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {manufacturers.length === 0 ? (
        <p>No manufacturers found.</p>
      ) : (
        manufacturers.map((m) => (
          <ManufacturerCard key={m.id} manufacturer={m} />
        ))
      )}

      <div style={{ marginTop: '20px' }}>
        <button
          onClick={() => {
            if (page > 1) {
              const newPage = page - 1;
              setPage(newPage);
              fetchManufacturers(currentKeyword, newPage);
            }
          }}
          disabled={page === 1}
          style={{ padding: '8px', marginRight: '10px' }}
        >
          Previous
        </button>

        <span>Page {page}</span>

        <button
          onClick={() => {
            const newPage = page + 1;
            setPage(newPage);
            fetchManufacturers(currentKeyword, newPage);
          }}
          style={{ padding: '8px', marginLeft: '10px' }}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Home;
