import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchSounds,
  addSound,
  updateSound,
  deleteSound
} from '../redux/postSlice';

const PostDashboard = () => {
  const dispatch = useDispatch();
  const { sounds, status, error } = useSelector((state) => state.sounds);
  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({});

  useEffect(() => {
    dispatch(fetchSounds());
  }, [dispatch]);

  const handleAdd = () => {
    const newSound = {
      id: Date.now(),
      name: 'Custom Sound',
      duration: 10,
      type: 'Synth',
    };
    dispatch(addSound(newSound));
  };

  const handleEditClick = (sound) => {
    setEditId(sound.id);
    setEditData({
      name: sound.name,
      duration: sound.duration,
      type: sound.type,
    });
  };

  const handleUpdate = (id) => {
    dispatch(updateSound({ id, ...editData }));
    setEditId(null);
  };

  const handleDelete = (id) => {
    dispatch(deleteSound(id));
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6 text-center text-indigo-600">API Dashboard</h2>

      <div className="flex justify-center mb-6">
        <button
          onClick={handleAdd}
          className="bg-indigo-500 text-white px-6 py-2 rounded hover:bg-indigo-600 transition"
        >
          Add Sound
        </button>
      </div>

      {status === 'loading' && <p className="text-center text-gray-500">Loading...</p>}
      {error && <p className="text-center text-red-500">Error: {error}</p>}

      <div className="grid gap-6">
        {sounds.map((sound) => (
          <div key={sound.id} className="bg-white rounded-lg shadow p-6 space-y-3 border border-gray-200">
            {editId === sound.id ? (
              <>
                <input
                  type="text"
                  value={editData.name}
                  onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                  className="w-full border p-2 rounded focus:outline-none focus:ring focus:border-blue-300"
                  placeholder="Sound Name"
                />
                <input
                  type="number"
                  value={editData.duration}
                  onChange={(e) => setEditData({ ...editData, duration: e.target.value })}
                  className="w-full border p-2 rounded focus:outline-none focus:ring focus:border-blue-300"
                  placeholder="Duration"
                />
                <input
                  type="text"
                  value={editData.type}
                  onChange={(e) => setEditData({ ...editData, type: e.target.value })}
                  className="w-full border p-2 rounded focus:outline-none focus:ring focus:border-blue-300"
                  placeholder="Type"
                />
                <div className="flex gap-4 mt-3">
                  <button
                    onClick={() => handleUpdate(sound.id)}
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditId(null)}
                    className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                  >
                    Cancel
                  </button>
                </div>
              </>
            ) : (
              <>
                <h3 className="text-xl font-semibold text-indigo-700">{sound.name}</h3>
                <p className="text-gray-600">Duration: {sound.duration}</p>
                <p className="text-gray-600">Type: {sound.type || 'N/A'}</p>
                <div className="flex gap-4 mt-3">
                  <button
                    onClick={() => handleEditClick(sound)}
                    className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDelete(sound.id)}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostDashboard;
