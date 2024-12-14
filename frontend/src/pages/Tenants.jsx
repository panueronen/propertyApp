import React, { useEffect, useState } from 'react';
import { fetchTenants, deleteTenant, updateTenant } from '../services/api';
import TenantForm from '../components/TenantForm';

const Tenants = () => {
  const [tenants, setTenants] = useState([]);
  const [editTenant, setEditTenant] = useState(null); // Track the tenant being edited

  const loadTenants = async () => {
    try {
      const data = await fetchTenants();
      setTenants(data);
    } catch (error) {
      console.error('Error fetching tenants:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this tenant?')) {
      try {
        await deleteTenant(id);
        alert('Tenant deleted successfully!');
        loadTenants();
      } catch (error) {
        console.error('Error deleting tenant:', error);
      }
    }
  };

  const handleEdit = (tenant) => {
    setEditTenant(tenant); // Set the tenant to be edited
  };

  useEffect(() => {
    loadTenants();
  }, []);

  return (
    <div>
      <h2>Tenants</h2>
      {editTenant ? (
        <TenantForm
          tenant={editTenant} // Pass the tenant being edited
          onSave={() => {
            loadTenants();
            setEditTenant(null); // Clear edit state after saving
          }}
        />
      ) : (
        <TenantForm onAddTenant={loadTenants} />
      )}
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Property</th>
            <th>Unit Number</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tenants.map((tenant) => (
            <tr key={tenant._id}>
              <td>{tenant.name}</td>
              <td>{tenant.email}</td>
              <td>{tenant.phone}</td>
              <td>{tenant.propertyId?.name || 'No Property'}</td>
              <td>{tenant.unitNumber}</td>
              <td>
                <button onClick={() => handleEdit(tenant)}>Edit</button>
                <button onClick={() => handleDelete(tenant._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Tenants;
