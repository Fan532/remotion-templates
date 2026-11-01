"""Render middle animation. Final is gated by missing audio and unresolved spoken amount."""
from pathlib import Path
import json,subprocess,sys
R=Path(__file__).resolve().parents[1];O=R.parent/'output'
media=json.loads((R/'src/config/media.json').read_text())
final='--final' in sys.argv
if final:
 missing=[m['scene'] for m in media if not m['audio']]
 if missing:raise SystemExit('FINAL NOT RENDERED: missing narration for scenes '+str(missing))
 review=R/'src/config/review.json'
 if not review.exists() or not json.loads(review.read_text()).get('scene07_ad_amount_confirmed',False):raise SystemExit('FINAL NOT RENDERED: Scene07 spoken advertising amount needs human confirmation/corrected recording.')
name='amazon-profit-middle-final.mp4' if final else 'amazon-profit-middle-preview.mp4';comp='AmazonMiddleAudioDraft' if final else 'AmazonMiddleSilent'
subprocess.run(['npx','remotion','render','src/index.tsx',comp,str(O/name),'--browser-executable=/usr/bin/chromium','--codec=h264','--pixel-format=yuv420p','--concurrency=4','--log=error'],cwd=R,check=True)
