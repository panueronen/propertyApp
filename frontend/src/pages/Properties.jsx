import React, { useEffect, useState } from 'react';
import { fetchProperties, deleteProperty, updateProperty } from '../services/api';
import PropertyForm from '../components/PropertyForm';

const Properties = () => {
  const [properties, setProperties] = useState([]);
  const [editProperty, setEditProperty] = useState(null); // Track the property being edited

  const loadProperties = async () => {
    try {
      const data = await fetchProperties();
      setProperties(data);
    } catch (error) {
      console.error('Error fetching properties:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this property?')) {
      try {
        await deleteProperty(id);
        alert('Property deleted successfully!');
        loadProperties();
      } catch (error) {
        console.error('Error deleting property:', error);
      }
    }
  };

  const handleEdit = (property) => {
    setEditProperty(property); // Set the property to be edited
  };

  useEffect(() => {
    loadProperties();
  }, []);

  return (
    <div>
      <h2>Properties</h2>
      {editProperty ? (
        <PropertyForm
          property={editProperty} // Pass the property being edited
          onSave={() => {
            loadProperties();
            setEditProperty(null); // Clear edit state after saving
          }}
        />
      ) : (
        <PropertyForm onAddProperty={loadProperties} />
      )}
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Address</th>
            <th>Owner</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {properties.map((property) => (
            <tr key={property._id}>
              <td>{property.name}</td>
              <td>{property.address}</td>
              <td>{property.owner}</td>
              <td>{property.status}</td>
              <td>
                <button onClick={() => handleEdit(property)}>Edit</button>
                <button onClick={() => handleDelete(property._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Properties;
