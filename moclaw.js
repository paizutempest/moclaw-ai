import { chromium } from 'playwright-extra';
import stealth from 'puppeteer-extra-plugin-stealth';
import chalk from "chalk";
import gradient from "gradient-string";
import { input, select } from "@inquirer/prompts";
import dayjs from "dayjs";
import fs from "fs";
import { table } from "table";

chromium.use(stealth());

// Banner Mewah Biru Laut Khas FS
// --- UPDATE BANNER MOCLAW OREN-ORENAN ---
function displayBanner() {
    console.clear();
    // Warna oren khas MoClaw (Oren ke Kuning Terang)
    const moclawOrange = gradient(['#FF4500', '#FF8C00', '#FFD700']);
    console.log(moclawOrange(`
    ███╗   ███╗ ██████╗  ██████╗██╗      █████╗ ██╗    ██╗
    ████╗ ████║██╔═══██╗██╔════╝██║     ██╔══██╗██║    ██║
    ██╔████╔██║██║   ██║██║     ██║     ███████║██║ █╗ ██║
    ██║╚██╔╝██║██║   ██║██║     ██║     ██╔══██║██║███╗██║
    ██║ ╚═╝ ██║╚██████╔╝╚██████╗███████╗██║  ██║╚███╔███╔╝
    ╚═╝     ╚═╝ ╚═════╝  ╚═════╝╚══════╝╚═╝  ╚═╝ ╚══╝╚══╝ 
    MOCLAW AUTO TRIAL - Deep Ocean Protocol
    By Paizutempest | Sniper Mode Active
    `));
}

const log = {
    info: (msg) => console.log(`${chalk.cyan('ℹ')} [${dayjs().format('HH:mm:ss')}] ${msg}`),
    success: (msg) => console.log(`${chalk.green('✔')} [${dayjs().format('HH:mm:ss')}] ${msg}`),
    warn: (msg) => console.log(`${chalk.yellow('⚠')} [${dayjs().format('HH:mm:ss')}] ${msg}`),
    error: (msg) => console.log(`${chalk.red('✖')} [${dayjs().format('HH:mm:ss')}] ${msg}`),
    process: (msg) => console.log(`${chalk.blue('⚙')} [${dayjs().format('HH:mm:ss')}] ${chalk.italic(msg)}...`)
};

function getDeepIdentity() {
    const devices = [
        // --- DESKTOP ---
        { ua: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Safari/537.36', platform: 'Windows' },
        { ua: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/147.0.0.0 Safari/537.36', platform: 'MacIntel' },
        { ua: 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Safari/537.36', platform: 'Linux x86_64' },
        
        // --- MOBILE ANDROID (High-End) ---
        { ua: 'Mozilla/5.0 (Linux; Android 14; Pixel 8 Pro) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Mobile Safari/537.36', platform: 'Linux armv8l' },
        { ua: 'Mozilla/5.0 (Linux; Android 13; SM-S918B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/147.0.0.0 Mobile Safari/537.36', platform: 'Linux armv8l' },
        { ua: 'Mozilla/5.0 (Linux; Android 12; M2101K6G) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Mobile Safari/537.36', platform: 'Linux armv8l' },

        // --- MOBILE IOS (iPhone) ---
        { ua: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.4 Mobile/15E148 Safari/604.1', platform: 'iPhone' },
        { ua: 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.6 Mobile/15E148 Safari/604.1', platform: 'iPhone' },

        // --- TABLET ---
        { ua: 'Mozilla/5.0 (iPad; CPU OS 17_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.4 Mobile/15E148 Safari/604.1', platform: 'iPad' },
        { ua: 'Mozilla/5.0 (Linux; Android 13; SM-X906B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Safari/537.36', platform: 'Linux armv8l' }
    ];
    const pick = devices[Math.floor(Math.random() * devices.length)];
    const screens = [
        { width: 1920, height: 1080 },
        { width: 1366, height: 768 },
        { width: 1440, height: 900 }
    ];
    const screen = screens[Math.floor(Math.random() * screens.length)];
    return { ...pick, screen };
}

async function getEmailFromGenerator(browserContext) {
    const page = await browserContext.newPage();
    try {
        log.process("Mengambil email baru dari generator.email");
        await page.goto('https://generator.email/', { waitUntil: 'networkidle' });
        await page.click('button.e7m:has-text("Generate new e-mail")');
        await page.waitForTimeout(2000);
        const email = await page.innerText('#email_ch_text');
        log.success(`Email Berhasil Di-generate: ${chalk.yellow(email)}`);
        return { email, page }; // Balikin page buat pantau OTP nanti
    } catch (err) {
        log.error("Gagal ambil email: " + err.message);
        await page.close();
        return null;
    }
}

async function startEngine(count) {
    for (let i = 1; i <= count; i++) {
        const id = getDeepIdentity();
        log.process(`[Akun ${i}] Inisialisasi Deep Ocean Identity`);

        const browser = await chromium.launch({ 
            headless: true, 
            args: [
                '--disable-blink-features=AutomationControlled',
                '--no-sandbox',
                '--disable-setuid-sandbox',
                '--disable-dev-shm-usage',
                '--disable-accelerated-2d-canvas',
                '--disable-gpu',
                '--no-first-run',
                '--no-zygote',
                '--disable-extensions',
                '--mute-audio', 
                '--disable-background-timer-throttling',
                '--disable-backgrounding-occluded-windows',
                '--disable-renderer-backgrounding'
            ]
        });

        const context = await browser.newContext({ userAgent: id.ua, viewport: id.screen });
        const page = await context.newPage();

        try {
            // 1. Ambil Email
            const genData = await getEmailFromGenerator(context);
            if (!genData) { await browser.close(); continue; }
            const { email, page: emailPage } = genData;

            // 2. Register MoClaw
            log.process(`Navigasi ke MoClaw Auth: ${chalk.cyan(email)}`);
            await page.goto('https://moclaw.ai/auth', { waitUntil: 'networkidle' });
            
            await page.fill('input[type="email"]', email);
            await page.click('button[type="submit"]:has-text("Continue with email")');
            log.info("Email dikirim, menunggu kode OTP...");

            // 3. Ambil OTP dari Generator
            let otp = null;
            for (let retry = 0; retry < 10; retry++) {
                await emailPage.reload({ waitUntil: 'networkidle' });
                const otpElement = await emailPage.$('div[style*="font-size: 34px"]');
                if (otpElement) {
                    otp = (await otpElement.innerText()).trim();
                    break;
                }
                await page.waitForTimeout(5000);
            }

            if (!otp) throw new Error("OTP tidak ditemukan setelah 50 detik.");
            log.success(`OTP Terdeteksi: ${chalk.magenta(otp)}`);

            // 4. Masukkan OTP
            await page.fill('input[autocomplete="one-time-code"]', otp);
            log.process("Memproses login...");
            await page.waitForURL('**/chat', { timeout: 15000 });

            // 5. Start Free Trial
            log.process("Mencoba klaim 1.000 Credits Trial...");
            const btnTrial = page.locator('button:has-text("Start Free Trial")');
            await btnTrial.waitFor({ state: 'visible', timeout: 10000 });
            await btnTrial.click();

            // 6. Validasi Sukses
            const successHeader = page.locator('h3:has-text("Trial started!")');
            await successHeader.waitFor({ state: 'visible', timeout: 10000 });
            log.success("Trial Started! 1,000 Credits ditambahkan.");

            // 7. Simpan Data (Cuma Email sesuai request)
            const data = { email, date: dayjs().format('YYYY-MM-DD HH:mm') };
            let saved = fs.existsSync('moclaw_accounts.json') ? JSON.parse(fs.readFileSync('moclaw_accounts.json')) : [];
            saved.push(data);
            fs.writeFileSync('moclaw_accounts.json', JSON.stringify(saved, null, 2));
            log.success(`Akun ${i} disimpan ke moclaw_accounts.json`);

        } catch (err) {
            log.error(`Gagal pada akun ${i}: ${err.message}`);
        } finally {
            await browser.close();
            log.info("Sesi ditutup, jeda 5 detik...");
            await new Promise(r => setTimeout(r, 5000));
        }
    }
}

(async function main() {
    displayBanner();
    const menu = await select({
        message: 'MoClaw Menu:',
        choices: [
            { name: '1. Start Auto Register & Trial', value: 'run' },
            { name: '2. View Saved Emails', value: 'view' },
            { name: '0. Exit', value: 'exit' },
        ],
    });

    if (menu === 'run') {
        const jml = await input({ message: "Jumlah akun yang ingin dibuat:", default: "1" });
        await startEngine(parseInt(jml));
    }

    if (menu === 'view') {
        if (!fs.existsSync("moclaw_accounts.json")) return log.error("Data kosong.");
        const accounts = JSON.parse(fs.readFileSync("moclaw_accounts.json"));
        const rows = accounts.map(a => [a.email, a.date]);
        console.log(table([["Email", "Registered At"], ...rows]));
    }
    
    setTimeout(main, 2000);
})();