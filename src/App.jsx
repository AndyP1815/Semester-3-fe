import React, { useState, useEffect, useCallback, useRef } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import About from './Pages/AboutUs';
import Join from './Pages/LogIn';
import Discover from './Pages/Discover';
import Home from './Pages/Home';
import Profile from './Pages/Profile';
import SignIn from './Pages/SignIn';
import { Navbar, Hero, Promo, WorkServices, Footer, Users } from './components';
import styles from './Style';
import WorkService from './Pages/WorkServive';
import ProductPage from './Pages/ProductPage';
import ChatMessagesPlaceholder from './components/ChatMessagesPlaceHolder';
import SendMessagePlaceholder from './components/SendMessagePlaceholder';
import UsernamePlaceholder from './components/UsernamePlaceholder';
import WebSocketTest from './Pages/WebSocketTest';
import { Client } from '@stomp/stompjs';
import { v4 as uuidv4 } from 'uuid';
import TokenManager from './Token/TokenManager';
import Notifications from './Pages/Notifications';
import BecomeSeller from './Pages/BecomeSeller';
import ProviderOrders from './Pages/ProviderOrders';

// Import the native WebSocket API
// import WebSocket from 'ws';

const App = () => {

  const isLoginPage = window.location.pathname === '/join';
  const isSignInPage = window.location.pathname === '/signIn';

 const claim = TokenManager.getClaims();

  const [stompClient, setStompClient] = useState();
  const [messagesReceived, setMessagesReceived] = useState([]);

  useEffect(() => {

    if (claim != null) {
      if (!stompClient) {
        console.log("Setting up Stomp client...");
        setupStompClient(claim.userId);
      }

      return () => {
        if (stompClient) {
          console.log("Deactivating Stomp client...");
          stompClient.deactivate();
        }
        console.log('i fire once');
      };

    }
  }, [claim]);
  // send the data using Stomp
  const sendOrderNotificationMessage = (OrderNotification, destination) => {
    debugger
    const payload = { 'id': OrderNotification.id, 'name': OrderNotification.name, 'message': OrderNotification.message, 'dateStamp': OrderNotification.dateStamp, 'sender': OrderNotification.sender, 'acceptance': OrderNotification.acceptance, 'order': OrderNotification.order };
    stompClient.publish({ 'destination': `/user/${destination}/queue/inboxmessages`, body: JSON.stringify(payload) });

  };

  const onMessageReceived = (data) => {
    debugger
    const message = JSON.parse(data.body);
    setMessagesReceived((prevMessages) => [...prevMessages, message]);
    console.log("message", message);
    console.log("test", messagesReceived);
  };
  const setupStompClient = useCallback((id) => {
    debugger
    const stompClient = new Client({
      brokerURL: 'ws://localhost:8080/ws',
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000
    });

    stompClient.onConnect = () => {
      // subscribe to the backend public topic
      stompClient.subscribe('/topic/publicmessages', (data) => {
        console.log(data);
        onMessageReceived(data);
      });

      // subscribe to the backend "private" topic
      stompClient.subscribe(`/user/${id}/queue/inboxmessages`, (data) => {
        debugger
        onMessageReceived(data);
      });
    };

    // initiate client
    stompClient.activate();

    // maintain the client for sending and receiving
    setStompClient(stompClient);
  }, [onMessageReceived, setStompClient]);


  return (
    <Router>
      <div className="App">
        <div className="bg-white w-full overflow-hidden">
          <div className={`${styles.paddingX} ${styles.flexCenter}`}>
            <div className={`${styles.boxWidth}`}>
              <Navbar notifications={messagesReceived} />
            </div>
          </div>

          <div>
            <Routes>
              <Route path='/test' element={<WebSocketTest />} />
              <Route path="/" element={<Home />} />
              <Route path="/join" element={<Join setupStompClient={setStompClient}/>} />
              <Route path="/discover" element={<Discover />} />
              <Route path="/aboutUs" element={<About />} />
              <Route path="/SignIn" element={<SignIn />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/workService" element={<WorkService />} />
              <Route path="/notifications" element={<Notifications  notifications={messagesReceived}  />} />
              <Route path="/becomeSeller" element={<BecomeSeller />} />
              <Route path="/providersOrders" element={<ProviderOrders />} />
              <Route
                path="/productPage/:productId"
                element={<ProductPage sendOrderNotificationMessage={sendOrderNotificationMessage} />}
              />

            </Routes>
          </div>

          {!(isLoginPage || isSignInPage) && (
            <div className={` ${styles.flexStart} ${styles.paddingX}`}>
              <div className={`${styles.boxWidth}`}>
                <Footer />
              </div>
            </div>
          )}
        </div>
      </div>
    </Router>
  );
};

export default App;
