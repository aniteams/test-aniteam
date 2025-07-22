"use client";
import React, { useState } from 'react';

function Addtolist({ session, setList, list, id, eplength, Handlelist }) {
  const [selectedStatus, setSelectedStatus] = useState(list?.status || 'PLANNING');
  const [progress, setProgress] = useState(list?.progress || 0);
  const [submitting, setSubmitting] = useState(false);

  const statusOptions = [
    { value: 'CURRENT', label: 'Watching' },
    { value: 'PLANNING', label: 'Plan to Watch' },
    { value: 'COMPLETED', label: 'Completed' },
    { value: 'PAUSED', label: 'On Hold' },
    { value: 'DROPPED', label: 'Dropped' }
  ];

  const handleSave = async () => {
    if (!session?.user?.name) return;
    
    setSubmitting(true);
    
    try {
      const response = await fetch('/api/anilist/storeSub', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          mediaId: id,
          status: selectedStatus,
          progress: progress
        })
      });
      
      const data = await response.json();
      
      if (data.success) {
        setList({
          status: selectedStatus,
          progress: progress
        });
        Handlelist();
      }
    } catch (error) {
      console.error('Error updating list:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleRemove = async () => {
    if (!session?.user?.name) return;
    
    setSubmitting(true);
    
    try {
      const response = await fetch('/api/anilist/storeSub', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          mediaId: id
        })
      });
      
      const data = await response.json();
      
      if (data.success) {
        setList(null);
        Handlelist();
      }
    } catch (error) {
      console.error('Error removing from list:', error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="text-white">
      <div className="mb-6">
        <h3 className="text-lg font-medium mb-2">Status</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
          {statusOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => setSelectedStatus(option.value)}
              className={`py-2 px-3 rounded-md text-sm transition-colors ${
                selectedStatus === option.value
                  ? 'bg-[#1a365d] text-white'
                  : 'bg-[#333] text-[#ccc] hover:bg-[#444]'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-medium">Episodes Progress</h3>
          <span className="text-sm text-[#ccc]">{progress} / {eplength || '?'}</span>
        </div>
        <input
          type="range"
          min="0"
          max={eplength || 100}
          value={progress}
          onChange={(e) => setProgress(parseInt(e.target.value))}
          className="w-full h-2 bg-[#333] rounded-lg appearance-none cursor-pointer"
        />
        <div className="flex justify-between mt-2">
          <button
            onClick={() => setProgress(Math.max(0, progress - 1))}
            className="py-1 px-3 bg-[#333] hover:bg-[#444] rounded-md text-sm transition-colors"
            disabled={progress === 0}
          >
            -
          </button>
          <button
            onClick={() => setProgress(Math.min(eplength || 100, progress + 1))}
            className="py-1 px-3 bg-[#333] hover:bg-[#444] rounded-md text-sm transition-colors"
            disabled={progress === (eplength || 100)}
          >
            +
          </button>
        </div>
      </div>

      <div className="flex justify-between">
        <button
          onClick={handleRemove}
          className="py-2 px-4 bg-[#333] hover:bg-[#444] text-white rounded-md transition-colors"
          disabled={submitting || !list}
        >
          {submitting ? 'Processing...' : 'Remove'}
        </button>
        <button
          onClick={handleSave}
          className="py-2 px-4 bg-[#1a365d] hover:bg-[#2a466d] text-white rounded-md transition-colors"
          disabled={submitting}
        >
          {submitting ? 'Saving...' : 'Save'}
        </button>
      </div>
    </div>
  );
}

export default Addtolist; 