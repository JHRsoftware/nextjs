"use client";

import { useState, useEffect } from "react";

export default function Home() {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [status, setStatus] = useState("");
  const [data, setData] = useState([]);

  const baseURL = "https://script.google.com/macros/s/AKfycbzH5MCkUY2BvJ5LTskpArSfAfGQg9YYwn3Kpdagh07F9l0uVBVFyUVXBHbtPtbgqw/exec";

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = \`\${baseURL}?name=\${encodeURIComponent(name)}&address=\${encodeURIComponent(address)}\`;

    try {
      await fetch(url);
      setStatus("Submitted successfully!");
      setName("");
      setAddress("");
      loadData();
    } catch (err) {
      console.error("Submit Error:", err);
      setStatus("Error submitting data.");
    }
  };

  const loadData = async () => {
    try {
      const res = await fetch(baseURL);
      const json = await res.json();
      setData(json);
    } catch (err) {
      console.error("Load Error:", err);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Submit Name & Address</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <input
          type="text"
          placeholder="Name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border px-3 py-2 rounded"
        />
        <input
          type="text"
          placeholder="Address"
          required
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="border px-3 py-2 rounded"
        />
        <button type="submit" className="bg-blue-600 text-white py-2 rounded">
          Submit
        </button>
      </form>
      {status && <p className="mt-2 text-green-600">{status}</p>}

      <h2 className="text-xl font-bold mt-8 mb-4">Submitted Data</h2>
      <div className="overflow-x-auto">
        <table className="w-full border text-sm">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-2 py-1">Name</th>
              <th className="border px-2 py-1">Address</th>
              <th className="border px-2 py-1">Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, i) => (
              <tr key={i} className="text-center">
                <td className="border px-2 py-1">{row.name}</td>
                <td className="border px-2 py-1">{row.address}</td>
                <td className="border px-2 py-1">{row.timestamp}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
