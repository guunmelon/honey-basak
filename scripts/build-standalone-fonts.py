#!/usr/bin/env python3
"""
standalone(단일 HTML) 빌드용 폰트 서브셋 생성기
- src/ 안에서 실제로 쓰인 글자만 모아 각 폰트를 woff2로 서브셋
- base64 data URI로 src/styles/fonts.standalone.css 생성
필요: pip install fonttools brotli / 원본 TTF (google/fonts, OFL)
사용: python3 scripts/build-standalone-fonts.py /tmp/fonts
"""
import base64, io, pathlib, re, string, sys
from fontTools import subset
from fontTools.ttLib import TTFont

ROOT = pathlib.Path(__file__).resolve().parent.parent
SRC_FONTS = pathlib.Path(sys.argv[1] if len(sys.argv) > 1 else '/tmp/fonts')
FRAUNCES = ROOT / 'node_modules/@fontsource-variable/fraunces/files'

chars = set(string.printable)
for p in list((ROOT / 'src').rglob('*.js')) + list((ROOT / 'src').rglob('*.jsx')):
    chars.update(p.read_text(encoding='utf-8'))
chars.update('·–—…“”‘’→←↑↓•♥₩×✺✦~%')
chars = {c for c in chars if c.isprintable() or c == ' '}
text = ''.join(sorted(chars))
hangul = sum(1 for c in text if '\uac00' <= c <= '\ud7a3')
print(f'unique chars: {len(text)} (hangul syllables: {hangul})')

def make_subset(path, keep_variations=False):
    font = TTFont(str(path))
    opts = subset.Options()
    opts.flavor = 'woff2'
    opts.layout_features = ['*']
    opts.name_IDs = ['*']
    opts.notdef_outline = True
    opts.hinting = False
    opts.desubroutinize = True
    sub = subset.Subsetter(opts)
    sub.populate(text=text)
    sub.subset(font)
    buf = io.BytesIO()
    font.flavor = 'woff2'
    font.save(buf)
    return buf.getvalue()

faces = [
    ('Jua', 'normal', '400', SRC_FONTS / 'Jua-Regular.ttf', 'woff2'),
    ('Gaegu', 'normal', '700', SRC_FONTS / 'Gaegu-Bold.ttf', 'woff2'),
    ('Gowun Dodum', 'normal', '400', SRC_FONTS / 'GowunDodum-Regular.ttf', 'woff2'),
    ('Fraunces Variable', 'normal', '100 900', FRAUNCES / 'fraunces-latin-full-normal.woff2', 'woff2-variations'),
    ('Fraunces Variable', 'italic', '100 900', FRAUNCES / 'fraunces-latin-full-italic.woff2', 'woff2-variations'),
]

css = ['/* 자동 생성 파일 — scripts/build-standalone-fonts.py (서브셋 폰트, SIL OFL 1.1) */']
total = 0
for family, style, weight, path, fmt in faces:
    data = make_subset(path)
    total += len(data)
    print(f'{family:18s} {style:6s} {weight:8s} {path.stat().st_size/1024:8.0f} KB -> {len(data)/1024:6.1f} KB')
    b64 = base64.b64encode(data).decode('ascii')
    css.append(
        "@font-face{font-family:'%s';font-style:%s;font-weight:%s;font-display:swap;src:url(data:font/woff2;base64,%s) format('%s');}"
        % (family, style, weight, b64, fmt)
    )
out = ROOT / 'src/styles/fonts.standalone.css'
out.write_text('\n'.join(css) + '\n', encoding='utf-8')
print(f'total font payload: {total/1024:.1f} KB -> {out.relative_to(ROOT)} ({out.stat().st_size/1024:.0f} KB css)')
