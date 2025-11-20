export async function recordUserIntent(userId: string, mangoId: string) {
  const response = await fetch(
    'https://api-prod-new.tagmango.com/spin-the-wheel/record-user-intent',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: userId,
        mangoId: mangoId,
      }),
    }
  );

  if (!response.ok) {
    throw new Error(`API call failed: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

