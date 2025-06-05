import * as signalR from '@microsoft/signalr';
import { ServiceRoutes } from './../../services/ServiceRoutes';


// VITE_API_BASE_URL=https://api.backtoyou.io.vn
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const notificationHub = new signalR.HubConnectionBuilder()
    .withUrl(`${API_BASE_URL}${ServiceRoutes.notification}/hubs/notification`, {
          withCredentials: true
    })
    .withAutomaticReconnect()
    .build();


export default notificationHub;



// https://notification.backtoyou.io.vn/hubs/notification