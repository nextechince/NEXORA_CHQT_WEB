import React, { useState, useEffect } from 'react';
import { Camera, Mic, Bell, FolderOpen, Shield, Check, X, Smartphone, Image, Music, PhoneCall } from 'lucide-react';

const PermissionModal = () => {
  const [showModal, setShowModal] = useState(false);
  const [permissions, setPermissions] = useState({
    notifications: false,
    camera: false,
    microphone: false,
    storage: false,
    contacts: false,
    photos: false
  });
  const [requesting, setRequesting] = useState(null);

  useEffect(() => {
    const hasSeenPermissions = localStorage.getItem('hasSeenPermissions');
    if (!hasSeenPermissions) {
      setShowModal(true);
    }
  }, []);

  const requestPermission = async (type) => {
    setRequesting(type);
    try {
      switch (type) {
        case 'notifications':
          if ('Notification' in window) {
            const result = await Notification.requestPermission();
            setPermissions(prev => ({
              ...prev,
              notifications: result === 'granted'
            }));
          }
          break;
        case 'camera':
          try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            stream.getTracks().forEach(track => track.stop());
            setPermissions(prev => ({ ...prev, camera: true }));
          } catch (e) {
            setPermissions(prev => ({ ...prev, camera: false }));
          }
          break;
        case 'microphone':
          try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            stream.getTracks().forEach(track => track.stop());
            setPermissions(prev => ({ ...prev, microphone: true }));
          } catch (e) {
            setPermissions(prev => ({ ...prev, microphone: false }));
          }
          break;
        case 'storage':
          try {
            if ('showDirectoryPicker' in window) {
              await window.showDirectoryPicker();
            }
            setPermissions(prev => ({ ...prev, storage: true }));
          } catch (e) {
            setPermissions(prev => ({ ...prev, storage: true }));
          }
          break;
        case 'contacts':
          try {
            if (navigator.contacts) {
              await navigator.contacts.select(['name', 'tel']);
              setPermissions(prev => ({ ...prev, contacts: true }));
            } else {
              setPermissions(prev => ({ ...prev, contacts: true }));
            }
          } catch (e) {
            setPermissions(prev => ({ ...prev, contacts: false }));
          }
          break;
        case 'photos':
          try {
            const input = document.createElement('input');
            input.type = 'file';
            input.accept = 'image/*';
            setPermissions(prev => ({ ...prev, photos: true }));
          } catch (e) {
            setPermissions(prev => ({ ...prev, photos: false }));
          }
          break;
        default:
          break;
      }
    } catch (error) {
      console.error(`Failed to get ${type} permission:`, error);
    }
    setRequesting(null);
  };

  const handleContinue = () => {
    localStorage.setItem('hasSeenPermissions', 'true');
    setShowModal(false);
  };

  if (!showModal) return null;

  const allGranted = Object.values(permissions).every(p => p === true);

  const permissionsList = [
    { id: 'notifications', icon: Bell, title: 'Notifications', desc: 'Get real-time message alerts' },
    { id: 'camera', icon: Camera, title: 'Camera', desc: 'For video calls & profile pics' },
    { id: 'microphone', icon: Mic, title: 'Microphone', desc: 'For voice messages & calls' },
    { id: 'storage', icon: FolderOpen, title: 'Storage', desc: 'To send and receive files' },
    { id: 'contacts', icon: Smartphone, title: 'Contacts', desc: 'Find friends to chat with' },
    { id: 'photos', icon: Image, title: 'Photos', desc: 'To send images from gallery' },
  ];

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-[9999] animate-fade-in">
      <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 max-w-md w-full mx-4 shadow-2xl animate-scale-in border border-white/10 max-h-[90vh] overflow-y-auto">
        <div className="text-center mb-6">
          <div className="w-20 h-20 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <img src="/icons/app-icon.png" className="w-12 h-12 object-contain" alt="Nexora" />
          </div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-primary-500 to-primary-600 bg-clip-text text-transparent">
            Permissions Required
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
            Nexora Chat needs these permissions for full functionality
          </p>
        </div>

        <div className="space-y-2 max-h-60 overflow-y-auto">
          {permissionsList.map(({ id, icon: Icon, title, desc }) => (
            <div key={id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${permissions[id] ? 'bg-green-100 dark:bg-green-900/30' : 'bg-gray-200 dark:bg-gray-600'}`}>
                  <Icon className={`w-4 h-4 ${permissions[id] ? 'text-green-500' : 'text-gray-400'}`} />
                </div>
                <div>
                  <h4 className="font-medium text-sm">{title}</h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{desc}</p>
                </div>
              </div>
              {permissions[id] ? (
                <span className="text-green-500 font-medium text-xs flex items-center gap-1 bg-green-50 dark:bg-green-900/30 px-2 py-1 rounded-full">
                  <Check className="w-3 h-3" /> Granted
                </span>
              ) : requesting === id ? (
                <div className="w-5 h-5 border-2 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <button 
                  onClick={() => requestPermission(id)} 
                  className="px-3 py-1 bg-primary-500 hover:bg-primary-600 text-white rounded-lg text-xs font-medium transition shadow-sm hover:shadow"
                >
                  Allow
                </button>
              )}
            </div>
          ))}
        </div>

        <button
          onClick={handleContinue}
          disabled={!allGranted}
          className={`
            w-full mt-6 py-3.5 rounded-xl font-semibold transition-all flex items-center justify-center gap-2
            ${allGranted
              ? 'bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white shadow-lg hover:shadow-xl transform hover:scale-[1.02]'
              : 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed'
            }
          `}
        >
          {allGranted ? (
            <>
              <img src="/icons/verified-badge.png" className="w-5 h-5" alt="verified" />
              Continue to Nexora Chat
            </>
          ) : (
            'Grant All Permissions to Continue'
          )}
        </button>

        {!allGranted && (
          <p className="text-xs text-gray-400 text-center mt-3 flex items-center justify-center gap-1">
            <span className="text-yellow-500">⚠️</span> Some features will be limited without all permissions
          </p>
        )}
      </div>
    </div>
  );
};

export default PermissionModal;
