import React from "react";

const ContactTable = ({ data, onSelect }) => (
  <table>
    <thead>
      <tr>
        <th>Select</th>
        <th>Name</th>
        <th>Date of Birth</th>
        <th>Address</th>
        <th>City</th>
        <th>State</th>
        <th>Zip</th>
        <th>Email</th>
        <th>Phone</th>
      </tr>
    </thead>
    <tbody>
      {data.map((contact, index) => (
        <tr key={index}>
          <td>
            <input
              type="checkbox"
              onChange={(e) => onSelect(contact, e.target.checked)}
            />
          </td>
          <td>{`${contact.firstName} ${contact.lastName}`}</td>
          <td>{contact.dob}</td>
          <td>{contact.address.street}</td>
          <td>{contact.address.city}</td>
          <td>{contact.address.state}</td>
          <td>{contact.address.zip}</td>
          <td>{contact.email}</td>
          <td>{contact.phone}</td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default ContactTable;
