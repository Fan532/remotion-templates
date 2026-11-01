from pathlib import Path
import urllib.request,json,hashlib
r=Path(__file__).resolve().parents[1];cfg=json.loads((r/'config.json').read_text());p=r/cfg['model'];p.parent.mkdir(parents=True,exist_ok=True)
if not p.exists():urllib.request.urlretrieve(cfg['model_url'],p)
expected='88d4531297118f595bf2fd60f6f566aec2e559393802d1f436c380f0cbbd2828'
actual=hashlib.sha256(p.read_bytes()).hexdigest()
if actual!=expected:raise RuntimeError('Model hash mismatch: '+actual)
print('Model ready:',p,'SHA256:',actual)
