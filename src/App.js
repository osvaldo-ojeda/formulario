import React, { useState, useEffect } from "react";
import { Service } from "./Service";

function App() {
  const [tenants, seTenants] = useState([]);

  const [form, setForm] = useState({
    name: "",
    paymentStatus: "CURRENT",
    leaseEndDate: "",
  });

  useEffect(() => {
    Service.getTenants()
      .then((e) => seTenants(e))
      .catch((e) => console.log("e", e));
  }, []);

  const handleDelete = (id) => {
    Service.deleteTenant(id)
      .then((e) => console.log(e))
      .then(() =>
        Service.getTenants()
          .then((e) => seTenants(e))
          .catch((e) => console.log(e))
      )
      .catch((e) => console.log(e));
  };

  function handleSubmit(e) {
    e.preventDefault();
    Service.addTenant(form)
      .then(() =>
        Service.getTenants()
          .then((e) => seTenants(e))
          .catch((e) => console.log("e", e))
      )
      .catch((e) => console.log(e));
    e.target.reset();
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmitReset = (e) => {
    e.preventDefault();
    e.target.reset();
  };

  return (
    <>
      <div className="container">
        <h1>Tenants</h1>
        <ul className="nav nav-tabs">
          <li className="nav-item">
            <a className="nav-link active" href="#/">
              All
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#/">
              Payment is late
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#/">
              Lease ends in less than a month
            </a>
          </li>
        </ul>
        {/* ---------------- */}
        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Payment Status</th>
              <th>Lease End Date</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {tenants.length > 0 &&
              tenants.map((tenant) => (
                <tr key={tenant.id}>
                  <th>{tenant.id}</th>
                  <td>{tenant.name}</td>
                  <td>{tenant.paymentStatus}</td>
                  <td>{tenant.leaseEndDate}</td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDelete(tenant.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      {/* -------------------- */}
      <div className="container">
        <button className="btn btn-secondary">Add Tenant</button>
      </div>
      <div className="container">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              id="name"
              className="form-control"
              type="text"
              name="name"
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="paymentStatus">Payment Status</label>
            <select
              id="paymentStatus"
              className="form-control"
              name="paymentStatus"
              onChange={handleChange}
            >
              <option value="CURRENT">CURRENT</option>
              <option value="LATE">LATE</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="date">Lease End Date</label>
            <input
              id="datetimeLocal"
              className="form-control"
              type="date"
              name="leaseEndDate"
              onChange={handleChange}
            />
          </div>

          <button className="btn btn-primary" onSubmit={handleSubmit}>
            Save
          </button>
          <button className="btn" onSubmit={handleSubmitReset}>
            Cancel
          </button>
        </form>
      </div>
    </>
  );
}

export default App;
