import whois from 'whois-json';

export default async function handler(request, response) {
  // جبد الدومين من الليان
  const domain = request.query.domain;

  if (!domain) {
    return response.status(400).json({ error: 'كتب شي دومين بعدا!' });
  }

  try {
    const result = await whois(domain);

    // إلا كان عامر، راه عامر
    if (result.registrar) {
      return response.status(200).json({ domain: domain, status: 'registered' });
    }
    // إلا كان خاوي، راه خاوي
    return response.status(200).json({ domain: domain, status: 'available' });

  } catch (e) {
    // إلا تفركع شي حاجة، يعني راه خاوي
    return response.status(200).json({ domain: domain, status: 'available' });
  }
}
