import React, { useState, useEffect } from 'react';
import { createTenant, updateTenant, fetchProperties } from '../services/api';

const TenantForm = ({ tenant, onAddTenant, onSave }) => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    propertyId: '',
    unitNumber: '',
  });

  const [properties, setProperties] = useState([]);

  useEffect(() => {
    const loadProperties = async () => {
      try {
        const data = await fetchProperties();
        setProperties(data);
      } catch (error) {
        console.error('Error fetching properties:', error);
      }
    };
    loadProperties();

    // If editing, populate the form with tenant data
    if (tenant) {
      setForm({
        name: tenant.name || '',
        email: tenant.email || '',
        phone: tenant.phone || '',
        propertyId: tenant.propertyId?._id || '',
        unitNumber: tenant.unitNumber || '',
      });
    }
  }, [tenant]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (tenant) {
        // Update existing tenant
        await updateTenant(tenant._id, form);
        alert('Tenant updated successfully!');
        if (onSave) onSave();
      } else {
        // Create new tenant
        await createTenant(form);
        alert('Tenant added successfully!');
        if (onAddTenant) onAddTenant();
      }
      setForm({ name: '', email: '', phone: '', propertyId: '', unitNumber: '' });
    } catch (error) {
      console.error('Error saving tenant:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input type="text" name="name" value={form.name} onChange={handleChange} required />
      </label>
      <label>
        Email:
        <input type="email" name="email" value={form.email} onChange={handleChange} required />
      </label>
      <label>
        Phone:
        <input type="text" name="phone" value={form.phone} onChange={handleChange} required />
      </label>
      <label>
        Property:
        <select
          name="propertyId"
          value={form.propertyId}
          onChange={handleChange}
          required
        >
          <option value="">Select a property</option>
          {properties.map((property) => (
            <option key={property._id} value={property._id}>
              {property.name} - {property.address}
            </option>
          ))}
        </select>
      </label>
      <label>
        Unit Number:
        <input type="text" name="unitNumber" value={form.unitNumber} onChange={handleChange} required />
      </label>
      <button type="submit">{tenant ? 'Update Tenant' : 'Add Tenant'}</button>
    </form>
  );
};

export default TenantForm;
