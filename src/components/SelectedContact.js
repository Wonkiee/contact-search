import React from "react";

const SelectedContact = ({ selectedContacts }) => (
  <div>
    <h3>Selected Contacts</h3>
    {selectedContacts.length > 0 ? (
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Address</th>
          </tr>
        </thead>
        <tbody>
          {selectedContacts.map((contact, index) => (
            <tr key={index}>
              <td>{`${contact.firstName} ${contact.lastName}`}</td>
              <td>{contact.email}</td>
              <td>{contact.phone}</td>
              <td>{`${contact.address.street}, ${contact.address.city}, ${contact.address.state}, ${contact.address.zip}`}</td>
            </tr>
          ))}
        </tbody>
      </table>
    ) : (
      <p>No contact selected</p>
    )}
  </div>
);

export default SelectedContact;
