"use client";
import { createContext, useContext, useEffect, useState } from 'react';
import { supabase, getStorageUrl } from '@/lib/supabase';

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [couples, setCouples] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTestimonials = async () => {
    try {
      const { data, error } = await supabase
        .from('testimonials') // Your table name
        .select('*');

      if (error) throw error;

      const formattedData = data.map(item => ({
        ...item,
        coverImage: getStorageUrl(item.cover_image_path)
      }));

      setCouples(formattedData);
    } catch (err) {
      console.error("Error fetching data:", err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchTestimonials(); }, []);

  return (
    <DataContext.Provider value={{ couples, loading }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);