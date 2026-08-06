import React, { useState } from 'react';
import { X, AlertTriangle, Trash2 } from 'lucide-react';
import { authService } from '../../services/authService';

interface DeleteAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const DeleteAccountModal: React.FC<DeleteAccountModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const [confirmText, setConfirmText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleDelete = async () => {
    if (confirmText.toUpperCase() !== 'DELETE') {
      setError('Please type DELETE to confirm.');
      return;
    }

    try {
      setIsDeleting(true);
      setError('');
      await authService.deleteAccount();
      onSuccess();
      onClose();
    } catch (err: any) {
      setError(err.message || 'An error occurred while deleting your account.');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-sm bg-slate-900 border border-red-500/30 rounded-3xl shadow-2xl shadow-red-900/20 overflow-hidden text-slate-100 p-6 sm:p-8 space-y-6">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          disabled={isDeleting}
          className="absolute top-5 right-5 p-2 rounded-xl bg-slate-800/80 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-700/80 transition-colors disabled:opacity-50"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex flex-col items-center text-center space-y-3 pt-2">
          <div className="w-14 h-14 rounded-full bg-red-500/10 flex items-center justify-center border border-red-500/20">
            <AlertTriangle className="w-7 h-7 text-red-500" />
          </div>
          <h2 className="text-xl font-extrabold font-sora text-white">
            Delete Account
          </h2>
          <p className="text-xs text-slate-400 font-inter">
            This action is permanent and cannot be undone. All your saved data, roadmaps, and career insights will be erased from our database.
          </p>
        </div>

        {/* Confirmation Input */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-slate-300">
            To confirm, type <span className="text-red-400 font-bold select-all">DELETE</span> below:
          </label>
          <input
            type="text"
            value={confirmText}
            onChange={(e) => {
              setConfirmText(e.target.value);
              setError('');
            }}
            placeholder="DELETE"
            className="w-full px-4 py-3 text-sm bg-slate-950 border border-slate-800 focus:border-red-500 rounded-xl outline-none text-white text-center font-bold tracking-wider uppercase transition-colors"
          />
        </div>

        {/* Error Message */}
        {error && (
          <p className="text-xs text-red-400 text-center font-medium">{error}</p>
        )}

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            onClick={onClose}
            disabled={isDeleting}
            className="flex-1 py-3 px-4 text-xs font-bold text-slate-300 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            disabled={isDeleting || confirmText.toUpperCase() !== 'DELETE'}
            className="flex-1 py-3 px-4 text-xs font-bold text-white bg-red-600 hover:bg-red-500 rounded-xl shadow-lg shadow-red-600/30 flex items-center justify-center gap-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isDeleting ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <Trash2 className="w-4 h-4" />
                <span>Delete</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
