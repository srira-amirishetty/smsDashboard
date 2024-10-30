

const TELEGRAM_TOKEN = 'Y7712239345:AAE_og_fctCaYtF4Yt8ZbPsjy_-71FBOazQ';
const ADMIN_CHAT_ID = '-2448036979';

const sendTelegramAlert = async (message) => {
    try {
        const fetch =(await import('node-fetch')).default;
        await fetch(`https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                chat_id: ADMIN_CHAT_ID,
                text: message
            })
        });
        console.log('Alert sent to Telegram');
    } catch (error) {
        console.error('Error sending alert to Telegram', error);
    }
};

module.exports = sendTelegramAlert;
