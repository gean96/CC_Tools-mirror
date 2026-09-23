# G Updater

Espelho GitHub Pages do **G Updater** (ConnectCanTools) para distribuição de versões e manifesto de atualização.

## URL publicada

Após configurar GitHub Pages na branch `main` / pasta `/docs`:

**https://gean96.github.io/CC_Tools-mirror/**

## Arquivos principais

| Arquivo | Função |
|---------|--------|
| `docs/index.html` | Página de download e informações da versão |
| `docs/update.json` | Manifesto de atualização (versão, URLs, SHA256) |
| `docs/style.css` | Estilos da página |
| `docs/script.js` | Carrega `update.json` e preenche a UI |
| `docs/logo.png` | Ícone do app |

## Publicar nova versão

1. Atualize `docs/update.json`:
   - `version`
   - `pyinstaller_download_url` / `apk_arm64_download_url`
   - `pyinstaller_sha256` / `apk_sha256` (opcional)
   - `updated_at` (ISO 8601)
2. Crie um release no GitHub com tag `v{versão}-release` (ex.: `v0.22.2-release`).
3. Anexe os artefatos:
   - `ConnectCanTool-{versão}.zip` (PyInstaller)
   - `app-arm64-v8a-release.apk` (Android)
4. Faça commit e push deste repositório.

## Estrutura do `update.json`

```json
{
  "version": "0.22.2",
  "release": true,
  "app_name": "G Updater",
  "pyinstaller_download_url": "https://github.com/geanferreira96/CC_Tools-mirror/releases/download/v0.22.2-release/ConnectCanTool-0.22.2.zip",
  "apk_arm64_download_url": "https://github.com/geanferreira96/CC_Tools-mirror/releases/download/v0.22.2-release/app-arm64-v8a-release.apk",
  "compiler": "pyinstaller",
  "pyinstaller_sha256": "",
  "apk_sha256": "",
  "github_release": "https://github.com/geanferreira96/CC_Tools-mirror/releases/latest",
  "updated_at": "2026-06-25T12:00:00Z"
}
```


