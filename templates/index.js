const app = {
    // Application Constructor
    initialize: function () {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    onDeviceReady: function () {
        this.receivedEvent('deviceready');

        ___NEXT_JS___;
    },

    receivedEvent: function (id) {
        const parentElement = document.getElementById(id);

        console.log('Received Event: ' + id);
    },
};

app.initialize();
