import React, { useState } from 'react';

const Jobs = () => {
  const [name, setName] = useState('');

  const createJob = async () => {
    const res = await fetch('/jobs/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name }),
    });

    console.log(await res.text());
  };

  return (
    <form onSubmit={createJob}>
      <input
        type="text"
        value={name}
        onChange={(event) => setName(event.target.value)}
      />
      <button>Create</button>
    </form>
  );
};

export default Jobs;
