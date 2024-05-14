import React, { useEffect, useState,useRef } from 'react';
import TokenManager from '../Token/TokenManager';
import useUsersApi from '../api-layer/api-users';
import { Link } from 'react-router-dom';
import Notification from '../components/Notification';
import styles from '../Style';
import OrderNotification from '../components/OrderNotification';
import useOrderNotification from '../api-layer/api-OrderNotification';



const Notifications = ( notifications) => {
    const [user, setUser] = useState();

    const [loading, setLoading] = useState(true);
    const claim = TokenManager.getClaims();
    
    const [request, setRequest] = useState({
      providerId: '',
      userId: '',
      accept: '',
      orderId: '',
    });
  
    useEffect(() => {
     
      if(request.userId != '')
      {
        useOrderNotification.postAcceptOrDecline(request)
        window.location.reload();
      }
  
    }, [request]);
    const Accept = (notification) => {
      debugger
      setRequest({
        ...request,
        userId: notification.sender.id,
        providerId: user.id, // Assuming `user` is defined somewhere
        accept: true,
        orderId: notification.order.id,
      });
  
    };
  
    const Decline = (notification) => {
      setRequest({
        ...request,
        userId: notification.sender.id,
        providerId: user.id, // Assuming `user` is defined somewhere
        accept: false,
        orderId: notification.order.id,
      });
     
    };
    const getUser = async () => {
        try {
            const response = await useUsersApi.getUserById(claim.userId);
            setUser(response);
            console.log(response);
        } catch (error) {
            console.error('Error fetching user:', error);
        } finally {
            setLoading(false); // Set loading to false regardless of success or failure
        }
    };

    useEffect(() => {
        getUser();
        console.log(user)

    }, [notifications]);

   

    if (loading) {
        // You can render a loading indicator here
        return <p>Loading...</p>;
    }

    const sortedNotifications = user.notifications
    .filter((message, index, self) =>
      index === self.findIndex((m) => m.id === message.id)
    )
    .sort((a, b) => {
      // Assuming dateStamp is a property of the message object
      const dateA = new Date(a.dateStamp).getTime();
      const dateB = new Date(b.dateStamp).getTime();
      return dateB - dateA; // Sort in descending order, modify if needed
    });


    return (
      <div className="bg-white w-full overflow-hidden">
        <div className={` ${styles.flexStart} ${styles.paddingX}`}>
          <div className={`${styles.boxWidth}`}>
            {sortedNotifications.map((message) => {
              console.log("Order ID:", message.order?.id); // Log the order id
              return (
                <div key={message.id}>
                  {message.order === undefined ? (
                    <Notification Notification={message} />
                  ) : (
                    message.order.status === 'Processing' ? (
                      <OrderNotification accept={Accept} decline={Decline} Notification={message} />
                    ) : (
                      <> </>
                    )
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

export default Notifications