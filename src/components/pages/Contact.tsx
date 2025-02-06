// import React from "react";

// const Contact: React.FC = () => {
//   return (
//     <section id="contact" className="bg-gray-200 py-10 shadow-md">
//       <div className="container mx-auto text-center">
//         <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
//         <p>Email: contact@soccerstars.com</p>
//         <p>Phone: +1 (123) 456-7890</p>
//         <p>Follow us on social media!</p>
//       </div>
//     </section>
//   );
// };

// export default Contact;

import React from 'react';

interface Contact {
  id: number;
  firstName: string;
  lastName: string;
  tel: string;
  email: string;
  role: string;
}

const contacts: Contact[] = [
  { id: 1, firstName: 'John', lastName: 'Doe', tel: '+123456789', email: 'john.doe@example.com', role: 'Manager' },
  { id: 2, firstName: 'Jane', lastName: 'Smith', tel: '+987654321', email: 'jane.smith@example.com', role: 'Developer' },
  { id: 3, firstName: 'Alice', lastName: 'Johnson', tel: '+112233445', email: 'alice.johnson@example.com', role: 'Designer' },
];

const Contact: React.FC = () => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Contact List</h1>
      <table className="w-full table-auto border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-4 py-2 text-left">#</th>
            <th className="border border-gray-300 px-4 py-2 text-left">First Name</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Last Name</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Tel</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Email</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Role</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((contact) => (
            <tr key={contact.id} className="hover:bg-gray-50">
              <td className="border border-gray-300 px-4 py-2">{contact.id}</td>
              <td className="border border-gray-300 px-4 py-2">{contact.firstName}</td>
              <td className="border border-gray-300 px-4 py-2">{contact.lastName}</td>
              <td className="border border-gray-300 px-4 py-2">{contact.tel}</td>
              <td className="border border-gray-300 px-4 py-2">
                <a href={`mailto:${contact.email}`} className="text-blue-500 hover:underline">
                  {contact.email}
                </a>
              </td>
              <td className="border border-gray-300 px-4 py-2">{contact.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Contact;
