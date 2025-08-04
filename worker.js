import { getAssetFromKV } from '@cloudflare/kv-asset-handler';

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event));
});

async function handleRequest(event) {
  try {
    // リクエストされたパスが "/" の場合は index.html を返す
    if (event.request.url.endsWith('/')) {
      const response = await getAssetFromKV(event, { mapRequestToAsset: req => new Request(`${new URL(req.url).origin}/index.html`, req) });
      return response;
    }
    // 他のファイルリクエストにも対応可能（例：画像やjs）
    return await getAssetFromKV(event);
  } catch (e) {
    return new Response('Not found', { status: 404 });
  }
}
