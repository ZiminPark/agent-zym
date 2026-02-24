# Deployment

Deploys to Vercel with configuration in `vercel.json`:

- **Build command**: `npm run build`
- **Output directory**: `dist`
- **Root directory**: Must be set to `blog` in Vercel dashboard (monorepo setup)
- **Vercel project**: `blog` under `zimmys-projects-be125baa` scope
- **Important**: The `blog/` directory must be committed as a regular subdirectory (not a git submodule). If it's registered as a submodule without a `.gitmodules` file, Vercel will fail to fetch it and the build will error with `ENOENT: package.json not found`.

Site URL is configured in `astro.config.mjs` (`site` property) and used for RSS feed generation.

## Debugging Vercel Deployment Failures

```bash
# List recent deployments and find the failed one
vercel ls blog

# Inspect a deployment for basic info (works on errored deployments)
vercel inspect <deployment-url>

# For errored deployments, `vercel logs` won't work. Use the API instead:
VERCEL_TOKEN=$(python3 -c "import json; print(json.load(open('$HOME/Library/Application Support/com.vercel.cli/auth.json'))['token'])")
curl -s "https://api.vercel.com/v2/deployments/<deployment-id>/events" \
  -H "Authorization: Bearer $VERCEL_TOKEN" | python3 -c "
import json, sys
for e in json.load(sys.stdin):
    text = e.get('payload', {}).get('text', '')
    if text: print(e['type'], text)
"
```
