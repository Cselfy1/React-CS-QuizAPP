import React, { useEffect, useState } from 'react';

interface Category {
  id: string;
  name: string;
}

interface CategorySelectProps {
  onSelectCategory: (categoryId: string) => void;
}

export const CategorySelect: React.FC<CategorySelectProps> = ({ onSelectCategory }) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('https://localhost:7091/api/Quiz/categories')
      .then(res => res.json())
      .then(data => setCategories(data))
      .catch(() => setError('Failed to load categories'));
  }, []);

  if (error) {
    return <div style={{textAlign: 'center', color: 'red'}}>{error}</div>;
  }

  return (
    <div style={{maxWidth: 400, margin: '50px auto', padding: 20, textAlign: 'center'}}>
      <h2>Select Quiz Category</h2>
      <ul style={{listStyle: 'none', padding: 0}}>
        {categories.map(cat => (
          <li key={cat.id} style={{margin: '12px 0'}}>
            <button 
              onClick={() => onSelectCategory(cat.id)}
              style={{
                padding: '12px 20px',
                borderRadius: 10,
                border: 'none',
                backgroundColor: '#000',
                color: '#fff',
                cursor: 'pointer',
                fontSize: 16,
                width: '100%'
              }}
            >
              {cat.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
