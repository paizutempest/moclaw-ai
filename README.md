# 🌊 MOCLAW AUTO TRIAL SNIPER - DEEP OCEAN EDITION
> **By Paizutempest | Deep Ocean Protocol v2.0**
> *Automated Account Generator & Trial Claimer for MoClaw AI*

---

## 🚀 OVERVIEW
**MoClaw Auto Trial** adalah tools otomasi berbasis **Playwright** yang dirancang khusus untuk melakukan registrasi massal dan klaim trial 1.000 credits secara otomatis di platform MoClaw AI. Dengan integrasi **Deep Ocean Identity**, setiap akun yang dibuat akan memiliki identitas perangkat yang unik untuk meminimalisir deteksi sistem.

## ✨ KEY FEATURES
* **Deep Ocean Identity Engine**: Menghasilkan identitas perangkat (User Agent, Platform, Screen) secara acak dan organik.
* **Auto-Email Generator**: Terintegrasi dengan `generator.email` untuk pengambilan email sementara secara instan.
* **Smart OTP Bypass**: Otomatis memantau kotak masuk email dan memasukkan kode verifikasi 6-digit ke sistem MoClaw.
* **Trial Sniper**: Otomatis mengklaim paket trial 1.000 credits tanpa intervensi manual.
* **Secure Database**: Menyimpan daftar email sukses ke dalam `moclaw_accounts.json` untuk penggunaan di masa mendatang.

## 🛠️ INSTALLATION
Pastikan lu udah install **Node.js** versi terbaru di VPS atau ip local lu.

1. **Clone/Download Project**
2. **Install Dependencies**
   ```bash
   npm install playwright-extra puppeteer-extra-plugin-stealth chalk gradient-string @inquirer/prompts dayjs fs table
