const updateJsonPath = "update.json";
const GITHUB_REPO = "geanferreira96/CC_Tools-mirror";

const themeBtn = document.getElementById("theme-toggle");
const sunIcon = document.getElementById("sun-icon");
const moonIcon = document.getElementById("moon-icon");
const body = document.body;

function setTheme(theme) {
  if (theme === "dark") {
    body.setAttribute("data-theme", "dark");
    sunIcon.style.display = "none";
    moonIcon.style.display = "block";
  } else {
    body.setAttribute("data-theme", "light");
    sunIcon.style.display = "block";
    moonIcon.style.display = "none";
  }
  localStorage.setItem("theme", theme);
}

themeBtn.addEventListener("click", () => {
  const currentTheme = body.getAttribute("data-theme");
  setTheme(currentTheme === "dark" ? "light" : "dark");
});

const savedTheme =
  localStorage.getItem("theme") ||
  (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
setTheme(savedTheme);

function updateBtn(btn, url, unavailableLabel) {
  if (!btn) return;
  const label = btn.querySelector("span");
  if (!url) {
    btn.classList.add("disabled");
    btn.removeAttribute("href");
    if (label) label.textContent = unavailableLabel;
    return;
  }
  btn.href = url;
  btn.classList.remove("disabled");
}

function setStatus(message, isError = false) {
  const banner = document.getElementById("update-status");
  if (!banner) return;
  banner.textContent = message;
  banner.classList.toggle("error", isError);
}

async function loadUpdateInfo() {
  try {
    const response = await fetch(updateJsonPath, { cache: "no-store" });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const data = await response.json();

    const appName = data.app_name || "G Updater";
    document.title = `${appName} - Atualizações`;
    document.getElementById("app-title").textContent = appName;

    document.getElementById("current-version").textContent = data.version || "Indisponível";
    document.getElementById("recommended-compiler").textContent = data.compiler || "pyinstaller";

    const rawDate = data.updated_at || data.lastUpdate;
    let updateText = "Indisponível";
    if (rawDate) {
      const parsed = new Date(rawDate);
      updateText = Number.isNaN(parsed.getTime())
        ? rawDate
        : parsed.toLocaleString("pt-BR");
    }
    document.getElementById("last-update").textContent = updateText;

    const releaseFlag = data.release === true || String(data.release).toLowerCase() === "true";
    document.getElementById("release-status").textContent = releaseFlag ? "Estável" : "Beta / teste";

    updateBtn(
      document.getElementById("pyinstaller-link"),
      data.pyinstaller_download_url || data.pyinstallerDownloadUrl,
      "Windows indisponível"
    );
    updateBtn(
      document.getElementById("apk-link"),
      data.apk_arm64_download_url || data.apkDownloadUrl,
      "Android indisponível"
    );
    updateBtn(
      document.getElementById("github-link"),
      data.github_release || `https://github.com/${GITHUB_REPO}/releases/latest`,
      "GitHub indisponível"
    );

    if (data.pyinstaller_sha256) {
      document.getElementById("pyinstaller-sha").textContent = data.pyinstaller_sha256;
    }
    if (data.apk_sha256) {
      document.getElementById("apk-sha").textContent = data.apk_sha256;
    }

    setStatus("Manifesto de atualização carregado com sucesso.");
  } catch (error) {
    console.error("Erro ao carregar update.json:", error);
    setStatus("Não foi possível carregar update.json. Verifique o deploy do GitHub Pages.", true);
  }
}

loadUpdateInfo();
