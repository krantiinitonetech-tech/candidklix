const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

(async () => {
  console.log("📩 Sending email with:", {
  service_id: process.env.EMAILJS_SERVICE_ID,
  template_id: process.env.EMAILJS_TEMPLATE_ID,
  user_id: process.env.EMAILJS_PUBLIC_KEY,
});

  const res = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      service_id: "service_agjf4mh",
      template_id: "template_h38gjp9",
      user_id: "9mmaAI2_1HbHhT1Ec",
      template_params: {
        name: "Test User",
        phone: "1234567890",
        eventType: "Test Event",
        eventDate: "2025-11-01",
        duration: "2 hours",
        guests: "50",
        location: "Hyderabad",
      },
    }),
  });

  console.log(await res.text());
})();
