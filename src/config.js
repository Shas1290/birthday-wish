/**
 * ╔══════════════════════════════════════════════════════════════╗
 * ║  🎂 BIRTHDAY WEBSITE CONFIGURATION                          ║
 * ║  Edit the values below to personalize the entire website!   ║
 * ╚══════════════════════════════════════════════════════════════╝
 *
 * All personalization content is stored here in one place.
 * Change names, messages, colors, photos — everything from this file.
 */

const config = {
  // ── Names & Relationship ──────────────────────────────────────
  birthdayPerson: "Birthday Girl", // The birthday person's name / nickname
  senderName: "Shashank",          // Your name / how you want to sign off
  relationship: "Girlfriend",       // Best Friend | Girlfriend | Boyfriend | Sister | Brother | Friend | Someone Special

  // ── Language & Theme ──────────────────────────────────────────
  language: "hinglish",            // english | hindi | hinglish
  theme: "cute",                   // romantic | cute | emotional | elegant | funny | magical | cinematic

  // ── Color Palette ─────────────────────────────────────────────
  colors: {
    primary: "#FF6B9D",            // Main pink
    primaryLight: "#FF8FB5",       // Lighter pink
    secondary: "#C9A96E",          // Rose gold
    secondaryLight: "#E0C68F",     // Light rose gold
    accent: "#FFD1DC",             // Soft pink accent
    background: "#FFF5F7",         // Warm off-white background
    backgroundDark: "#2D1B2E",     // Dark background for contrast sections
    text: "#4A2040",               // Dark plum text
    textLight: "#8B6080",          // Lighter text
    white: "#FFFFFF",
    glow: "rgba(255, 107, 157, 0.4)",
    gradientStart: "#FF6B9D",
    gradientEnd: "#C9A96E",
    confetti: ["#FF6B9D", "#FFD1DC", "#C9A96E", "#FF8FB5", "#E0C68F", "#FFF0F3", "#FFB6C1"],
  },

  // ── Landing / Hero Section ────────────────────────────────────
  landing: {
    headline: "Aaj Ka Din Sirf Tumhare Naam Hai! ✨",
    subtitle: "Kuch khaas tayyar hai tumhare liye... 💕",
    buttonText: "Apna Birthday Surprise Kholo 🎁",
  },

  // ── Main Celebration Section ──────────────────────────────────
  celebration: {
    title: "HAPPY BIRTHDAY",       // Shown above the name
    subtitle: "🎂 Birthday Bahut Bahut Mubarak Ho! 🎂",
    message:
      "Aaj ka din itna khaas hai kyunki tum is duniya mein aayi thi. " +
      "Tumhari smile se saari duniya roshan ho jaati hai, aur tumhare saath har pal ek celebration hai. " +
      "Yeh din tumhare liye utna hi special ho jitni tum mere liye ho! 💖",
  },

  // ── Personal Birthday Message ─────────────────────────────────
  personalMessage: {
    title: "Tumhare Liye, Dil Se... 💌",
    paragraphs: [
      "Mujhe nahi pata ki yeh words tumhare liye kaafi hain ya nahi, lekin yeh sach hai — tum meri zindagi ki sabse pyaari cheez ho. Tumhare bina har din incomplete lagta hai, aur tumhare saath har pal ek beautiful memory ban jaata hai.",
      "Tumhari hansi sunke lagta hai ki duniya mein sab kuch theek hai. Tumhari caring nature, tumhara pyaar, tumhari chhoti chhoti baatein — sab kuch mujhe tumse aur zyada pyaar karne par majboor karti hai.",
      "Is birthday par meri bas yahi wish hai ki tum hamesha khush raho, hamesha muskurati raho, aur hamesha yaad rakho ki koi hai jo tumse behad pyaar karta hai. 🌸",
      "Yeh saal tumhare liye sabse amazing ho — naye sapne, nayi khushiyan, aur dher saara pyaar. Happy Birthday, my love! 🎂💕",
    ],
  },

  // ── Gift / Surprise Section ───────────────────────────────────
  surprise: {
    title: "Ek Aur Cheez Tumhara Intezaar Kar Rahi Hai... 🎁",
    buttonText: "Apna Surprise Unwrap Karo 🎁",
    revealMessage:
      "Tum meri duniya ho. Har subah tumhari wajah se khoobsurat hoti hai, " +
      "aur har raat tumhare khayal mein guzarti hai. " +
      "I promise to make every day as special as you make mine. " +
      "Happy Birthday, my love! 💕🌹",
    revealTitle: "Sirf Tumhare Liye... 💝",
  },

  // ── Cake Section ──────────────────────────────────────────────
  cake: {
    title: "Apni Birthday Cake Par Wish Karo! 🎂",
    buttonText: "Make a Wish ✨",
    afterWishMessage: "Tumhari har wish poori ho... ✨💫",
    subtitle: "Aankhein band karo, dil se wish karo, aur button dabao!",
  },

  // ── Finale / Closing Section ──────────────────────────────────
  finale: {
    title: "Phir Se, Happy Birthday",
    message:
      "Yeh saal tumhare liye sabse khoobsurat ho. Khushiyan, kamyaabi, " +
      "pyaar — sab kuch tumhare paas aaye. Aur haan, mujhe hamesha apna samajhna. 💕",
    replayButton: "Phir Se Celebrate Karo 🎉",
    signature: "Made with ❤️ by",
  },

  // ── Music ─────────────────────────────────────────────────────
  music: {
    /**
     * Place your audio file in /public/music/ folder
     * and set the path here. Example: "/music/birthday-song.mp3"
     * Leave empty string "" if no music.
     */
    src: "",
    label: "🎵 Music",
  },
};

export default config;
