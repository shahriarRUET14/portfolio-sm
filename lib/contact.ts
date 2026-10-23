// NEXT_PUBLIC_ values are inlined at build time, so this is safe on server and client.
export const emailJsConfig = {
  serviceId: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID ?? '',
  templateId: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID ?? '',
  publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY ?? '',
};

export const contactFormEnabled = Boolean(
  emailJsConfig.serviceId && emailJsConfig.templateId && emailJsConfig.publicKey
);
