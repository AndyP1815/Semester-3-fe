import React,{useState,useEffect}from 'react';
import OrderCard from '../components/OrderCard';
import TokenManager from '../Token/TokenManager';
import useWorkProvider from '../api-layer/api-workProviders';

const ProviderOrders = () => {
    const [user, setUser] = useState();

    const [loading, setLoading] = useState(true);
    const claim = TokenManager.getClaims();
    const [workOrders,setWorkOrders] = useState([]);
  
  
    const setOrder = (notifications) => {
        // Filter orders with status 'to_do' and set them to workOrders
        const WorkNotification = notifications.filter((notification) => notification.order != undefined )
        const toDoOrders = WorkNotification.filter((notification) => notification.order.status === 'To_do');
        setWorkOrders(toDoOrders);
      };
  
    const getUser = async () => {
      try {
        const response = await useWorkProvider.getWorkProviderById(claim.userId);
        setUser(response);
      } catch (error) {
        console.error('Error fetching user:', error);
      } finally {
        setLoading(false); // Set loading to false regardless of success or failure
      }
    };
  
    useEffect(() => {
      getUser();
      
    
    //   setOrder(user.workOrders)
  
    }, []);

    useEffect(() => {
      
      if(workOrders.length != 0)
      {

      }
    
  
    }, [workOrders]);

    useEffect(() => {
        if(user != null ){
        console.log("blabla" ,user)
        setOrder(user.notifications)
        }
    }, [user]);
  
    if (loading) {
      // You can render a loading indicator here
      return <p>Loading...</p>;
    }
    return (
        <div className="text-center">
          <div className=" mb-5 mx-auto max-w-md">
            ProviderOrders
            {/* Render OrderCard for each work order */}
            {workOrders.map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}
          </div>
        </div>
      );
    };

export default ProviderOrders;
