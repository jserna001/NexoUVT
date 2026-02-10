export const prerender = false;

import type { APIRoute } from 'astro';
import { Resend } from 'resend';

const resend = new Resend(import.meta.env.RESEND_API_KEY);

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email || typeof email !== 'string') {
      return new Response(
        JSON.stringify({ error: 'Email es requerido' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return new Response(
        JSON.stringify({ error: 'Email inválido' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const siteUrl = import.meta.env.SITE || 'https://nexouvt.cloution.cloud';
    const pdfUrl = `${siteUrl}/pdf/tabla-retencion-fuente-2026.pdf`;

    await resend.emails.send({
      from: 'Nexo UVT <uvt@cloution.cloud>',
      to: email,
      subject: 'Tu Tabla de Retención en la Fuente 2026 - Nexo',
      html: `
        <div style="font-family: 'Poppins', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #252A34; font-size: 24px;">Nexo <span style="color: #08D9D6;">UVT</span></h1>
          </div>
          <h2 style="color: #252A34; font-size: 20px;">¡Aquí tienes tu tabla de retención!</h2>
          <p style="color: #64748B; line-height: 1.6;">
            Gracias por descargar la Tabla de Retención en la Fuente 2026.
            Puedes acceder al PDF haciendo clic en el siguiente enlace:
          </p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${pdfUrl}"
               style="background-color: #08D9D6; color: white; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-weight: 600; display: inline-block;">
              Descargar PDF
            </a>
          </div>
          <hr style="border: none; border-top: 1px solid #E2E8F0; margin: 30px 0;" />
          <p style="color: #94A3B8; font-size: 12px; text-align: center;">
            Enviado por <a href="https://nexo.com.co" style="color: #08D9D6;">Nexo</a> ·
            Herramientas para contadores colombianos
          </p>
        </div>
      `,
    });

    return new Response(
      JSON.stringify({ success: true }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error sending email:', error);
    return new Response(
      JSON.stringify({ error: 'Error al enviar el email' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
