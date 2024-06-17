const { app, output } = require('@azure/functions');

const wpsAction = output.generic({
    type: 'webPubSub',
    name: 'action',
    hub: 'sample_notification'
});

app.timer('notification', {
    schedule: "*/30 * * * * *",
    extraOutputs: [wpsAction],
    handler: (myTimer, context) => {
        context.extraOutputs.set(wpsAction, {
            actionName: 'sendToAll',
            data: data(),
            dataType: 'text',
        });
    },
});

function data(){
    return JSON.stringify({
        datetime: new Date(),
        temperature: `${getValue(22, 1)}\xB0C`,
        humidity: `${getValue(40, 2)}%`
    })
}

function getValue(baseNum, floatNum) {
    return (baseNum + 2 * floatNum * (Math.random() - 0.5)).toFixed(3);
}
