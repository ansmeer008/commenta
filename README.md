# Commenta

**Write your own commentaries for web contents without spolier and share it!**  
웹 콘텐츠를 보며 나만의 감상이나 코멘트를 작성하고, 이를 공유할 수 있는 플랫폼입니다.
회차별 스포일러 방지 기능이 있어, 같은 회차를 공유하고 있는 사람들의 코멘트만 필터링 되어 보여집니다.

---

## 🔥 Work Plan

- 1차 진행 : ~2025년 8월
- 2차 진행 (개선작업) : ~2026년 7월

---

## 🌐 Live Demo

Check out the live project here: [https://commenta-hazel.vercel.app](https://commenta-hazel.vercel.app/)

---

## 🙋 Author

Jade (@ansmeer008)

Email: ansmeer008@gmail.com

---

## 🛠️ Tech Stack

| Category             | Tech                                                                                                                                            |
| -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| **Framework**        | [Next.js 15](https://nextjs.org/)                                                                                                               |
| **Language**         | [TypeScript](https://www.typescriptlang.org/)                                                                                                   |
| **UI Components**    | [shadcn/ui](https://ui.shadcn.com/), [Radix UI](https://www.radix-ui.com/), [Lucide Icons](https://lucide.dev/)                                 |
| **Styling**          | [Tailwind CSS 4](https://tailwindcss.com/), [clsx](https://github.com/lukeed/clsx), [tailwind-merge](https://github.com/dcastil/tailwind-merge) |
| **State Management** | [Zustand](https://zustand-demo.pmnd.rs/)                                                                                                        |
| **Backend / DB**     | [Firebase](https://firebase.google.com/)                                                                                                        |
| **Lint/Format**      | ESLint, Prettier                                                                                                                                |
| **Animation**        | [tw-animate-css](https://github.com/archtkt/tw-animate-css)                                                                                     |

---

## ✨ Features

- Write and share commentaries on web content
- Categorize and filter commentaries
- Subscription-based episode filtering to prevent spoilers
- User profiles with nickname and avatar

---

## 📁 Project Structure

```text
├─ /app           # Next.js App Router pages
├─ /components    # UI components +@
├─ /hooks         # Custom hooks
├─ /store         # Zustand global state
├─ /lib           # Utility functions
├─ /apis          # API handlers
├─ /public        # Static assets
└─ /styles        # Tailwind / global styles
```
