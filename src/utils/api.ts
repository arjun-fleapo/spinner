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

export async function getUserIntent(userId: string, mangoId: string) {
  const response = await fetch(
    `https://api-prod-new.tagmango.com/spin-the-wheel/get-user-intent?userId=${userId}&mangoId=${mangoId}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );

  if (!response.ok) {
    throw new Error(`API call failed: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

