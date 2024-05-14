import React, { useEffect, useState, useRef } from 'react';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { Toast } from 'primereact/toast';

const OrderNotification = ({ Notification, accept, decline }) => {
  const [visible, setVisible] = useState(false);
  const [isAccept, setIsAccept] = useState('');
  const toast = useRef(null);
  


  const acceptModal = () => {
    debugger
    if (isAccept) {
      accept(Notification)

    }
    else {
      decline(Notification)
    }

   
  }

  const rejectModal = () => {


  }

  const customFooter = (
    <div className="flex justify-end mt-4">
      <button
        onClick={acceptModal}
        className="mr-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 focus:outline-none focus:border-green-700 focus:ring focus:ring-green-200"
      >
        Yes
      </button>
      <button
        onClick={rejectModal}
        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none focus:border-red-700 focus:ring focus:ring-red-200"
      >
        No
      </button>
    </div>
  );
  return (
    <div>  <Toast ref={toast} />

      <ConfirmDialog
        group="declarative"
        visible={visible}
        onHide={() => setVisible(false)}
        message="Are you sure you want to proceed?"
        header="Confirmation"
        icon="pi pi-exclamation-triangle"
        footer={customFooter}
        className="max-w-md mx-auto bg-white p-6 rounded shadow-md border-2 border-gray-300"
      >
        {/* Custom content within the ConfirmDialog, if needed */}
        <p className="text-gray-800">This is a custom message.</p>
      </ConfirmDialog>

      <div className="flex justify-between px-3 py-1 bg-white items-center gap-1 rounded-lg border border-gray-100 my-3">
        <div className="flex items-center">
          <div className="relative">
            <div className="w-16 h-16 rounded-full hover:bg-red-700 bg-gradient-to-r from-purple-400 via-blue-500 to-red-400">
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-14 h-14 bg-gray-200 rounded-full border-2 border-white">
                <img
                  className="w-full h-full object-cover rounded-full"
                  src={Notification.sender.profilePicture}
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
          {/* Add your new item here */}
          <span className="block text-gray-500 text-sm">Offer: {Notification.order.offer.name} </span>
        </div>
        <div className="flex flex-col items-center">
          <div className="flex gap-2">
            <button
              onClick={() => { setIsAccept(true); setVisible(true); }}
              className="bg-green-500 text-white px-2 py-1 rounded-full"
            >
              Yes
            </button>
            <button
              onClick={() => { setIsAccept(false); setVisible(true); }}
              className="bg-red-500 text-white px-2 py-1 rounded-full"
            >
              No
            </button>
          </div>
          <span className="block text-gray-500 text-xs">{Notification.dateStamp}</span>
        </div>
      </div>

    </div>
  );
};

export default OrderNotification;
