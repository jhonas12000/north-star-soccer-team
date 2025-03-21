import React, { useEffect, useState } from "react";
import { Pencil, Trash2, Plus, Check, X } from "lucide-react";

interface Contact {
  id: number;
  firstName: string;
  lastName: string;
  telephone: string;
  email: string;
  role: string;
}

const ContactList: React.FC = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingContact, setEditingContact] = useState<Contact | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newContact, setNewContact] = useState<Contact>({
    id: 0,
    firstName: "",
    lastName: "",
    telephone: "",
    email: "",
    role: "",
  });

  useEffect(() => {
    fetch("http://localhost:8080/contact/contacts")
      .then((response) => response.json())
      .then((data) => {
        setContacts(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const handleDelete = (id: number) => {
    if (!window.confirm("Are you sure you want to delete this contact?")) return;
    fetch(`http://localhost:8080/contact/delete/${id}`, { method: "DELETE" })
      .then(() => setContacts(contacts.filter((contact) => contact.id !== id)))
      .catch((err) => alert("Error deleting contact: " + err.message));
  };

  const handleEdit = (contact: Contact) => {
    setEditingContact({ ...contact });
  };

  const handleSave = () => {
    if (!editingContact) return;

    fetch(`http://localhost:8080/contact/update/${editingContact.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editingContact),
    })
      .then((response) => response.json())
      .then((updatedContact) => {
        setContacts(
          contacts.map((contact) => (contact.id === updatedContact.id ? updatedContact : contact))
        );
        setEditingContact(null);
      })
      .catch((err) => alert("Error updating contact: " + err.message));
  };

  const handleAddNew = () => {
    setShowAddForm(true);
  };

  const handleSaveNew = () => {
    fetch(`http://localhost:8080/contact/create`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newContact),
    })
      .then((response) => response.json())
      .then((data) => {
        setContacts([...contacts, data]);
        setShowAddForm(false);
        setNewContact({ id: 0, firstName: "", lastName: "", telephone: "", email: "", role: "" });
      })
      .catch((err) => alert("Error adding contact: " + err.message));
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Contact List</h1>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-blue-600"
          onClick={handleAddNew}
        >
          <Plus size={18} /> Add New Contact
        </button>
      </div>

      {showAddForm && (
        <div className="mb-4 p-4 border rounded bg-gray-100">
          <h2 className="text-lg font-bold mb-2">New Contact</h2>
          <div className="grid grid-cols-2 gap-4">
            {["firstName", "lastName", "telephone", "email", "role"].map((field) => (
              <input
                key={field}
                type="text"
                placeholder={field}
                value={(newContact as any)[field]}
                onChange={(e) => setNewContact({ ...newContact, [field]: e.target.value })}
                className="border p-2 rounded"
              />
            ))}
          </div>
          <div className="mt-2 space-x-2">
            <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600" onClick={handleSaveNew}>
              Save
            </button>
            <button className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500" onClick={() => setShowAddForm(false)}>
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Make table scrollable on small screens */}
      <div className="table-container">
        <table className="w-full table-auto border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-4 py-2">#</th>
              <th className="border px-4 py-2">First Name</th>
              <th className="border px-4 py-2">Last Name</th>
              <th className="border px-4 py-2">Tel</th>
              <th className="border px-4 py-2">Email</th>
              <th className="border px-4 py-2">Role</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((contact) => (
              <tr key={contact.id} className="hover:bg-gray-50">
                <td className="border px-4 py-2">{contact.id}</td>

                {["firstName", "lastName", "telephone", "email", "role"].map((field) => (
                  <td key={field} className="border px-4 py-2">
                    {editingContact?.id === contact.id ? (
                      <input
                        type="text"
                        value={(editingContact as any)[field]}
                        onChange={(e) =>
                          setEditingContact({ ...editingContact, [field]: e.target.value })
                        }
                        className="border p-1 rounded"
                      />
                    ) : (
                      (contact as any)[field]
                    )}
                  </td>
                ))}

                <td className="border px-4 py-2 flex gap-2">
                  {editingContact?.id === contact.id ? (
                    <>
                      <button className="bg-green-500 text-white px-2 py-1 rounded" onClick={handleSave}>
                        <Check size={16} />
                      </button>
                      <button className="bg-gray-400 text-white px-2 py-1 rounded" onClick={() => setEditingContact(null)}>
                        <X size={16} />
                      </button>
                    </>
                  ) : (
                    <>
                      <button onClick={() => handleEdit(contact)} className="text-blue-500">
                        <Pencil size={20} />
                      </button>
                  <button onClick={() => handleDelete(contact.id)} className="text-red-500">
                    <Trash2 size={20} />
                  </button>
                </>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>
  );
};

export default ContactList;

