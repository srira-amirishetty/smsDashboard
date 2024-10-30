class WebSocketService {
    constructor() {
        this.ws = null;
        this.subscribers = [];
    }


    connect(url) {
        this.ws = new WebSocket(url);

        this.ws.onopen = () => {
            console.log("WebSocket connected");
        };

        this.ws.onmessage = (message) => {
            const data = JSON.parse(message.data);
            this.subscribers.forEach((callback) => callback(data));
        };

        this.ws.onclose = () => {
            console.log("WebSocket disconnected");
        };
    }


    subscribe(callback) {
        this.subscribers.push(callback);
    }


    unsubscribe(callback) {
        this.subscribers = this.subscribers.filter((sub) => sub !== callback);
    }


    disconnect() {
        if (this.ws) {
            this.ws.close();
        }
    }
}

export default new WebSocketService();
