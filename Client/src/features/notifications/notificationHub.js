import * as signalR from '@microsoft/signalr';
import { ServiceRoutes } from './../../services/ServiceRoutes';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const notificationHub = new signalR.HubConnectionBuilder()
    .withUrl(`${API_BASE_URL}${ServiceRoutes.notification}/hubs/notification`, {
          withCredentials: true
    })
    .withAutomaticReconnect()
    .build();


export default notificationHub;
