// Remove this line at the top of the file:
// import { Container, TextField, Button, Box, Paper, Typography } from '@mui/material';

// Keep only this import:
import React, { useState } from 'react';
import './custom.css';

function App() {
  const [notes, setNotes] = useState([]);
  const [currentNote, setCurrentNote] = useState('');
  const [title, setTitle] = useState('');
  const [editingId, setEditingId] = useState(null);

  const handleSaveNote = () => {
    if (currentNote.trim() !== '' && title.trim() !== '') {
      if (editingId) {
        // Update existing note
        setNotes(notes.map(note => 
          note.id === editingId 
            ? { ...note, title, content: currentNote }
            : note
        ));
        setEditingId(null);
      } else {
        // Add new note
        setNotes([...notes, { title, content: currentNote, id: Date.now() }]);
      }
      setCurrentNote('');
      setTitle('');
    }
  };

  const handleEditNote = (note) => {
    setEditingId(note.id);
    setTitle(note.title);
    setCurrentNote(note.content);
  };

  const handleDeleteNote = (id) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pattern-bg">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="text-5xl font-bold text-center mb-12 text-gray-800 hover:text-gray-700 transition-colors animate-fade-in">
          📝 Note Taking App
        </h1>
        
        <div className="bg-white/90 backdrop-blur-sm p-6 rounded-xl shadow-lg mb-8 transition-all duration-300 hover:shadow-xl">
          <input
            type="text"
            placeholder="Enter title..."
            className="w-full mb-4 p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/80"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            placeholder="Write your thoughts..."
            className="w-full mb-4 p-3 border border-gray-200 rounded-lg h-40 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none bg-white/80"
            value={currentNote}
            onChange={(e) => setCurrentNote(e.target.value)}
          />
          <button 
            className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 ${
              !currentNote.trim() || !title.trim()
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : 'bg-blue-500 hover:bg-blue-600 text-white shadow-md hover:shadow-lg'
            }`}
            onClick={handleSaveNote}
            disabled={!currentNote.trim() || !title.trim()}
          >
            {editingId ? 'Update Note' : 'Save Note'}
          </button>
          {editingId && (
            <button 
              className="px-6 py-3 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 ml-4 bg-gray-500 hover:bg-gray-600 text-white shadow-md hover:shadow-lg"
              onClick={() => {
                setEditingId(null);
                setTitle('');
                setCurrentNote('');
              }}
            >
              Cancel Edit
            </button>
          )}
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {notes.map((note) => (
            <div 
              key={note.id} 
              className="bg-white/90 backdrop-blur-sm p-6 rounded-xl shadow-md transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1 note-card-enter"
            >
              <h2 className="text-xl font-semibold mb-3 text-gray-800">
                {note.title}
              </h2>
              <p className="text-gray-600 mb-6 whitespace-pre-wrap">
                {note.content}
              </p>
              <div className="flex justify-between items-center">
                <div className="space-x-2">
                  <button 
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200 transform hover:scale-105"
                    onClick={() => handleEditNote(note)}
                  >
                    Edit
                  </button>
                  <button 
                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-200 transform hover:scale-105"
                    onClick={() => handleDeleteNote(note.id)}
                  >
                    Delete
                  </button>
                </div>
                <span className="text-sm text-gray-400">
                  {new Date(note.id).toLocaleDateString()}
                </span>
              </div>
            </div>
          ))}
        </div>
        
        {notes.length === 0 && (
          <div className="text-center text-gray-500 mt-8 animate-pulse">
            No notes yet. Start by creating one!
          </div>
        )}
      </div>
    </div>
  );
}

export default App;