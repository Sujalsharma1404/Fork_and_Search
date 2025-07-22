import React, { useEffect, useState } from "react";
import { Container, Table } from "react-bootstrap";
import { db } from "../firebase";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import Header from "../Components/Header"; // ✅ use your existing Header

function AdminContacts() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchMessages = async () => {
      const q = query(collection(db, "contacts"), orderBy("createdAt", "desc"));
      const snapshot = await getDocs(q);
      setMessages(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    };

    fetchMessages();
  }, []);

  return (
    <>
      <Header /> {/* ✅ Top header same as site */}
      <Container className="py-5">
        <h2>Contact Messages</h2>
        {messages.length === 0 ? (
          <p>No messages found.</p>
        ) : (
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Message</th>
                <th>Sent At</th>
              </tr>
            </thead>
            <tbody>
              {messages.map((msg) => (
                <tr key={msg.id}>
                  <td>{msg.name}</td>
                  <td>{msg.email}</td>
                  <td>{msg.message}</td>
                  <td>{msg.createdAt?.toDate().toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Container>
    </>
  );
}

export default AdminContacts;
