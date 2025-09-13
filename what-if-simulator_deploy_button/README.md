# ✨ What If…? Simulator

A fun comic-style AI app that answers your "What if..." scenarios using OpenAI.

## 🚀 One-Click Deploy

### Vercel
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/your-username/what-if-simulator&env=VITE_OPENAI_API_KEY&envDescription=Enter%20your%20OpenAI%20API%20key&project-name=what-if-simulator&repo-name=what-if-simulator)

When deploying, you’ll be asked for `VITE_OPENAI_API_KEY`. Enter your OpenAI API key.

---

## 🚀 Manual Deploy

### Vercel

1. Fork or upload this repo to GitHub.
2. Go to [Vercel](https://vercel.com/new) → Import Project → Select your repo.
3. Add your **environment variable** in Vercel Dashboard → Project → Settings → Environment Variables:

```
VITE_OPENAI_API_KEY=sk-xxxxxx
```

4. Deploy → Get your live URL 🎉

### Netlify

1. Drag & drop this folder into [Netlify](https://app.netlify.com) → New site.
2. Add your environment variable in **Site settings → Environment Variables**:

```
VITE_OPENAI_API_KEY=sk-xxxxxx
```

3. Build command: `npm run build`
4. Publish directory: `dist`
5. Deploy 🎉

---

## 💻 Run Locally

```bash
npm install
npm run dev
```

Then open [http://localhost:5173](http://localhost:5173).
