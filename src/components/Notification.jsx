import React, { useEffect, useState,useRef } from 'react';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { Toast } from 'primereact/toast';
const Notification = ({ Notification}) => {
  return (
    <div className="flex justify-between px-3 py-1 bg-white items-center gap-1 rounded-lg border border-gray-100 my-3">
      <div className="flex items-center">
        <div className="relative">
          <div className="w-16 h-16 rounded-full hover:bg-red-700 bg-gradient-to-r from-purple-400 via-blue-500 to-red-400">
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-14 h-14 bg-gray-200 rounded-full border-2 border-white">
              <img
                className="w-full h-full object-cover rounded-full"
                src={Notification.sender.profilePicture}
                alt=""
              />
            </div>
          </div>
        </div>
        <div className="ml-2">
          <span className="font-bold">{Notification.sender.username}</span>
        </div>
      </div>
      <div>
        <span className="font-bold">{Notification.name}</span>
        <span className="block font-mono">{Notification.message}</span>
      </div>
      <div>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path
            fillRule="evenodd"
            d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"
            clipRule="evenodd"
          />
       
        </svg>
        <span className="block text-gray-500 text-xs">{Notification.dateStamp}</span>
      </div>
    </div>
  );
};

export default Notification;
