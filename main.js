import whatsaap from "whatsapp-web.js";
import qrcode from "qrcode-terminal";
import { getAiResponse } from "./chat.js";

const client = new whatsaap.Client({
  authStrategy: new whatsaap.LocalAuth(),
});

// Show QR code
client.on('qr', (qr) => {
  console.log('📱 Scan this QR code with WhatsApp:');
  qrcode.generate(qr, { small: true });
});

// Bot ready
client.on('ready', () => {
  console.log('🤖 Bot is ready!  Send messages to test it.');
});
// Handle messages
client.on('message_create', async (message) => {
  const msg = message.body.toLowerCase();
  console.log('📩 Received:', msg);

  // Skip group messages
  if (message.from.includes('@g.us')) return;

  // Skip your own messages (IMPORTANT!)
  if (message.fromMe) return;

  try {
    const aiResponse = await getAiResponse(message.body);
    await message.reply(aiResponse);
    console.log('✅ Reply sent');
  } catch (error) {
    console.log('❌ Error:', error);
  }
});

client.initialize();
