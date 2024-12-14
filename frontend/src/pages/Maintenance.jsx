import React, { useState, useEffect } from 'react';
import {
  fetchMaintenanceTasks,
  createMaintenanceTask,
  updateMaintenanceTask,
  deleteMaintenanceTask,
  fetchProperties,
  fetchTenants,
  fetchMaintenanceXML,
  importMaintenanceXML, // Import the XML import function
} from '../services/api';

const Maintenance = () => {
  const [tasks, setTasks] = useState([]);
  const [properties, setProperties] = useState([]);
  const [tenants, setTenants] = useState([]);
  const [form, setForm] = useState({
    description: '',
    propertyId: '',
    tenantId: '',
    priority: 'medium',
  });
  const [xmlFile, setXmlFile] = useState(null); // State for the uploaded XML file

  // Fetch tasks, properties, and tenants on mount
  useEffect(() => {
    const loadData = async () => {
      try {
        const [taskData, propertyData, tenantData] = await Promise.all([
          fetchMaintenanceTasks(),
          fetchProperties(),
          fetchTenants(),
        ]);

        setTasks(taskData);
        setProperties(propertyData);
        setTenants(tenantData);
      } catch (error) {
        console.error('Error loading data:', error);
      }
    };

    loadData();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAddTask = async (e) => {
    e.preventDefault();
    try {
      const newTask = await createMaintenanceTask(form);
      setTasks([...tasks, newTask]);
      setForm({ description: '', propertyId: '', tenantId: '', priority: 'medium' });
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  const handleUpdateStatus = async (id, status) => {
    try {
      const updatedTask = await updateMaintenanceTask(id, { status });
      setTasks(tasks.map((task) => (task._id === id ? updatedTask : task)));
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      await deleteMaintenanceTask(id);
      setTasks(tasks.filter((task) => task._id !== id));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const handleDownloadXML = async () => {
    try {
      const xmlData = await fetchMaintenanceXML();
      const blob = new Blob([xmlData], { type: 'application/xml' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'maintenance_requests.xml';
      link.click();
      URL.revokeObjectURL(link.href);
    } catch (error) {
      console.error('Error downloading XML:', error);
    }
  };

  const handleUploadXML = async () => {
    if (!xmlFile) {
      alert('Please select an XML file to upload.');
      return;
    }

    try {
      const result = await importMaintenanceXML(xmlFile);
      alert(result.message || 'XML imported successfully!');
      // Refresh tasks after import
      const updatedTasks = await fetchMaintenanceTasks();
      setTasks(updatedTasks);
    } catch (error) {
      console.error('Error importing XML:', error);
      alert('Failed to import XML.');
    }
  };

  const handleFileChange = (e) => {
    setXmlFile(e.target.files[0]); // Set the selected XML file
  };

  return (
    <div>
      <h2>Maintenance Tasks</h2>

      {/* Task List */}
      <ul>
        {tasks.map((task) => (
          <li key={task._id}>
            <h4>{task.description}</h4>
            <p>Property: {task.propertyId?.name || 'Unknown'}</p>
            <p>Tenant: {task.tenantId?.name || 'None'}</p>
            <p>Priority: {task.priority}</p>
            <p>Status: {task.status}</p>
            <button onClick={() => handleUpdateStatus(task._id, 'in-progress')}>
              Mark as In Progress
            </button>
            <button onClick={() => handleUpdateStatus(task._id, 'closed')}>Mark as Closed</button>
            <button onClick={() => handleDeleteTask(task._id)}>Delete</button>
          </li>
        ))}
      </ul>

      {/* Add Task Form */}
      <form onSubmit={handleAddTask}>
        <h3>Add New Task</h3>
        <label>
          Description:
          <input
            type="text"
            name="description"
            value={form.description}
            onChange={handleChange}
            required
          />
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
                {property.name}
              </option>
            ))}
          </select>
        </label>

        <label>
          Tenant:
          <select
            name="tenantId"
            value={form.tenantId}
            onChange={handleChange}
          >
            <option value="">Select a tenant (optional)</option>
            {tenants.map((tenant) => (
              <option key={tenant._id} value={tenant._id}>
                {tenant.name}
              </option>
            ))}
          </select>
        </label>

        <label>
          Priority:
          <select
            name="priority"
            value={form.priority}
            onChange={handleChange}
            required
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </label>

        <button type="submit">Add Task</button>
      </form>

      {/* Download XML Button */}
      <button onClick={handleDownloadXML}>Download XML</button>

      {/* Upload XML */}
      <h3>Import Maintenance Tasks from XML</h3>
      <input type="file" accept=".xml" onChange={handleFileChange} />
      <button onClick={handleUploadXML}>Upload XML</button>
    </div>
  );
};

export default Maintenance;
