# AI-Powered Learning Assistant

A learning platform where users can upload documents, interact with an AI chat assistant that has document context, and generate structured quizzes also view quiz results.

## Overview

The AI-Powered Learning Assistant provides a seamless, secure workflow for personalized study: users authenticate via Firebase (client) with server-side verification using Firebase Admin, upload documents that are stored and managed in Supabase object storage, and interact with a context-aware AI chat assistant trained to act as a learning companion for those documents. From each uploaded file the system can generate configurable, high-quality quizzes—each question delivered as a multiple-choice item with four options and an explanation of the correct answer—and present a comprehensive results page showing score, counts of correct/incorrect responses, time spent, and a per-question breakdown with explanations to reinforce learning.

## Key Features

- **User authentication:** Enable google sign in via Firebase on the client and verified server-side using Firebase Admin for secure token validation and identity mapping.

- **Document uploads:** Clients upload documents to the server; files may be deleted by users and stored persistently in Supabase (object storage) with access controls.

- **AI chat with document context**: An AI-powered learning assistant that has access to the uploaded document’s context and can answer any questions about the document.

- **Quiz generation:** generate quizzes based on an uploaded document; each quiz question follows a response schema with exactly 4 options and includes an explanation for the correct answer.

- **Quiz results:** After completing a quiz, show a results page with total score, counts of correct/incorrect answers, time spent, and a detailed breakdown of each question showing what the user answered, which option was correct, and the explanation.

- **User Dashboard:** Displays total documents and quizzes. keeps data upto date using Tanstack query validation.

---

## Technologies Used

- **TypeScript**
- **React**
- **Node**
- **Express**
- **Supabase**
- **Firebase**
- **Tanstack-Query**
- **ShadCN**
- **TailwindCSS**
- **React Router**
- **Multer**
- **Vite**

---

## Role and Responsibilities

- **Frontend Architecture & Implementation:** Designed and implemented the React component tree, routing, and state management using TypeScript, TanStack Query, and React Router.

- **Backend API & File Processing:** Built Express endpoints for file uploads (Multer), document parsing, and quiz generation with AI calls.

- **Database & Auth Integration:** Modeled database schema in Supabase, implemented user authentication flows using Firebase auth.

- **UI/UX & Dashboard:** Designed and implemented the dashboard and chat UI using ShadCN components and TailwindCSS, ensuring accessibility and responsive layouts.

---

## Challenges and Solutions

- **Integrating Firebase Auth with Supabase:** Implement a secure bridge that maps Firebase user identities to Supabase user records, syncing profile and permission data while validating tokens server-side.

- **Writing RPC functions in Supabase for storing quizzes and more:** Design and deploy Postgres stored procedures (RPCs) to atomically create, update, and query quizzes, and attempts.

- **Maintaining chat context awareness across sessions:** Persist conversational context and document references with session-scoped context objects.

- **Generating high-quality quizzes:** Extract and segment document content, then produce a configurable quiz that ensures responses follow the schema.
