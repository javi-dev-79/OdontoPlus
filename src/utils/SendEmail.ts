import emailjs from '@emailjs/browser'

interface EmailTemplateParams {
  [key: string]: string | number | boolean
}

const EMAILJS_SERVICE_ID = import.meta.env.VITE_MY_API_KEY

const sendEmail = async (
  templateParams: EmailTemplateParams,
  templateId: string
): Promise<void> => {
  if (!EMAILJS_SERVICE_ID) {
    throw new Error('EmailJS Service ID no configurado')
  }

  if (!templateId) {
    throw new Error('Template ID es requerido')
  }

  try {
    const response = await emailjs.send(
      EMAILJS_SERVICE_ID,
      templateId,
      templateParams
    )
    console.log('Email enviado con éxito:', response.status, response.text)
  } catch (error) {
    console.error('Error al enviar el email:', error)
    throw error
  }
}

export default sendEmail
