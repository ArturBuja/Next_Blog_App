import mailchimp from '@mailchimp/mailchimp_marketing';

import { NextResponse } from 'next/server';

mailchimp.setConfig({
  apiKey: process.env.MAILCHIMP_API_KEY,
  server: process.env.MAILCHIMP_API_SERVER,
});

const API_KEY = process.env.MAILCHIMP_API_KEY;
const API_SERVER = process.env.MAILCHIMP_API_SERVER;
const AUDIENCE_ID = process.env.MAILCHIMP_AUDIENCE_ID;
export const POST = async (req: Request, res: Response) => {
  const body = await req.json();
  const { email } = body;

  if (!email || !email.length) {
    return new NextResponse(
      JSON.stringify({ message: 'Adres emial nie może być pusty' }),
      {
        status: 400,
      }
    );
  }

  const url = `https://${API_SERVER}.api.mailchimp.com/3.0/lists/${AUDIENCE_ID}/members`;

  const data = {
    email_address: email,
    status: 'subscribed',
  };

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `api_key ${API_KEY}`,
    },
    body: JSON.stringify(data),
  };
  try {
    const response = await fetch(url, options);
    const responseData = await response.json();

    if (responseData.status >= 400) {
      return new NextResponse(
        JSON.stringify({
          message:
            responseData.detail ??
            `Wystąpił bład podczas dodawania emaila do list. Napisz do mnie na artur.buja2@gmail.com, a dodam Cię do listy. `,
        }),
        {
          status: responseData.status,
        }
      );
    }
    return new NextResponse(JSON.stringify({ message: responseData.detail }), {
      status: 201,
    });
  } catch (error) {
    console.log(error);
    return new NextResponse(JSON.stringify({ message: 'Coś poszło nie tak' }), {
      status: 500,
    });
  }
};
