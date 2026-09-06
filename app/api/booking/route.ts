import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { name, phone, time, topic } = await req.json();

    // Очищаем переменные от возможных кавычек и пробелов из .env.local
    const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN?.replace(/^["']|["']$/g, '').trim();
    const CHAT_ID = process.env.TELEGRAM_CHAT_ID?.replace(/^["']|["']$/g, '').trim();

    // --- DEBUG LOGS ---
    console.log('--- [DEBUG TELEGRAM ROUTE] ---');
    console.log('BOT_TOKEN exists:', !!BOT_TOKEN, '| Token preview:', BOT_TOKEN ? `${BOT_TOKEN.slice(0, 6)}...` : 'NONE');
    console.log('CHAT_ID:', CHAT_ID);
    console.log('Request URL:', `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`);
    console.log('-------------------------------');

    if (!BOT_TOKEN || !CHAT_ID) {
      return NextResponse.json(
        { success: false, error: 'Telegram credentials missing' },
        { status: 500 }
      );
    }

    const message = `
<b>📥 Новая запись на консультацию!</b>

<b>Имя:</b> ${escapeHtml(name)}
<b>Телефон/Telegram:</b> ${escapeHtml(phone)}
<b>Удобное время:</b> ${escapeHtml(time || 'Не указано')}
<b>Тема запроса:</b> ${escapeHtml(topic || 'Не указана')}
    `.trim();

    const res = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: message,
        parse_mode: 'HTML',
      }),
    });

    if (!res.ok) {
      const errorData = await res.json();
      console.error('Telegram API Error:', errorData);
      return NextResponse.json({ success: false }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Booking API Error:', error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}

function escapeHtml(text: string): string {
  return (text || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}
