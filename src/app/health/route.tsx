function healthCheck() {
  return new Response(
    JSON.stringify({ status: 'ok', date: new Date().toISOString() }),
    { status: 200 },
  );
}

export const GET = healthCheck;
export const POST = healthCheck;
