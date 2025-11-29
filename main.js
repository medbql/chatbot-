import whatsaap from "whatsapp-web.js";
import qrcode from "qrcode-terminal";


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
    // Simple responses
    if (msg.includes('hello') || msg.includes('hi')) {
      await message.reply('Hi! 👋 How can I help you? ');
    }
    else if (msg.includes('price')) {
      await message.reply('Our prices start at $50.  Contact us for details!');
    }
    else if (msg.includes('service')) {
      await message.reply('We offer web development, apps, and consulting.');
    }
    else if (msg.includes('contact')) {
      await message.reply('📞 Phone: +1234567890\n📧 Email: info@company.com');
    }
    else {
      await message.reply('Thanks for your message! Type "hello" to start.');
    }

    console.log('✅ Reply sent');

  } catch (error) {
    console.log('❌ Error:', error);
  }
});

client.initialize();
