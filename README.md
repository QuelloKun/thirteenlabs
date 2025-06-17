# ThirteenLabs

## 🌐 About This Project

A full-stack AI voice synthesis platform built with Next.js. This repository contains the complete frontend application, which consumes a private set of backend AI services.

### 🚀 **[View the Live Demo Here](https://thirteenlabs.vercel.app/)** 🚀

![ThirteenLabs Application Screenshot](https://imgur.com/X95ONST.png)


## ✨ Features

* **Secure User Authentication**: Full sign-up and sign-in functionality using NextAuth.js.
* **Text-to-Speech (TTS)**: Convert written text into lifelike speech using AI models.
* **Voice Changing (Speech-to-Speech)**: Upload an audio file and convert the voice to a different one.
* **Sound Effect Generation**: Describe a sound and have an AI model generate it for you.
* **Audio History & Playback**: User-specific history for all generated audio clips with a persistent audio player.
* **Light & Dark Mode**: Seamless theme switching with a clean, modern UI.

## 🏛️ Architecture

This project demonstrates a modern, decoupled web application architecture.

* **Frontend**: A responsive Next.js application hosted on **Vercel**. This repository contains all the code for the user interface and user experience.
* **Backend AI Services**: The core AI models for voice synthesis and sound generation are deployed as a private set of microservices on **AWS**.
* **Database & Jobs**: User data, authentication, and background job processing are handled by dedicated cloud services (**Supabase** and **Inngest**) to ensure scalability and reliability.

## 🛠️ Frontend Tech Stack

* **Framework**: [Next.js](https://nextjs.org/) (App Router)
* **Language**: [TypeScript](https://www.typescriptlang.org/)
* **Styling**: [Tailwind CSS](https://tailwindcss.com/)
* **Authentication**: [NextAuth.js](https://next-auth.js.org/)
* **Database ORM**: [Prisma](https://www.prisma.io/)
* **State Management**: [Zustand](https://zustand-demo.pmnd.rs/)
* **Form Handling**: [React Hook Form](https://react-hook-form.com/) & [Zod](https://zod.dev/)

## ☁️ Deployment

The frontend is continuously deployed via the Git integration on [Vercel](https://vercel.com/), ensuring fast, global delivery.