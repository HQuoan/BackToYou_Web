import * as signalR from '@microsoft/signalr';

export const notificationHub = new signalR.HubConnectionBuilder()
    .withUrl(`https://notification.backtoyou.io.vn/hubs/notification`, {
    // .withUrl(`http://localhost:6005/hubs/notification`, {
          withCredentials: true
    })
    .withAutomaticReconnect()
    .build();


export default notificationHub;
