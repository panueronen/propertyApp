import React, { useState, useEffect } from 'react';
import { createProperty, updateProperty } from '../services/api';

const PropertyForm = ({ property, onAddProperty, onSave }) => {
  const [form, setForm] = useState({
    name: '',
    address: '',
    owner: '',
    status: 'active',
  });

  useEffect(() => {
    // If editing, populate the form with property data
    if (property) {
      setForm({
        name: property.name || '',
        address: property.address || '',
        owner: property.owner || '',
        status: property.status || 'active',
      });
    }
  }, [property]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (property) {
        // Update existing property
        await updateProperty(property._id, form);
        alert('Property updated successfully!');
        if (onSave) onSave();
      } else {
        // Create new property
        await createProperty(form);
        alert('Property added successfully!');
        if (onAddProperty) onAddProperty();
      }
      setForm({ name: '', address: '', owner: '', status: 'active' });
    } catch (error) {
      console.error('Error saving property:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input type="text" name="name" value={form.name} onChange={handleChange} required />
      </label>
      <label>
        Address:
        <input type="text" name="address" value={form.address} onChange={handleChange} required />
      </label>
      <label>
        Owner:
        <input type="text" name="owner" value={form.owner} onChange={handleChange} required />
      </label>
      <label>
        Status:
        <select name="status" value={form.status} onChange={handleChange}>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </label>
      <button type="submit">{property ? 'Update Property' : 'Add Property'}</button>
    </form>
  );
};

export default PropertyForm;
