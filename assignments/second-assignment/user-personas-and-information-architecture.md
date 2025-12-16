# Scholia

## User Personas  

|                                                           **Mia Novak (21)**                                                           |                                                         **Luka Marin (34)**                                                        |                                                            **Ana Kovač (28)**                                                            |
| :------------------------------------------------------------------------------------------------------------------------------------: | :--------------------------------------------------------------------------------------------------------------------------------: | :--------------------------------------------------------------------------------------------------------------------------------------: |
|                                                 ![Mia Novak](mia-novak.png)                                                |                                              ![Luka Marin](luka-marin.png)                                             |                                                  ![Ana Kovač](ana-kovac.png)                                                 |
|                                                  **Role**<br>Undergraduate CS Student                                                  |                                   **Role**<br>Career Switcher (Hospitality → Frontend Developer)                                   |                                           **Role**<br>Working Professional (Product Marketing)                                           |
|                       **Primary Goals**<br>• Build portfolio fast<br>• Learn by doing<br>• Find clear next steps                       |        **Primary Goals**<br>• Land junior frontend role in 3–6 months<br>• Track milestones<br>• Earn certificates to share        |        **Primary Goals**<br>• Apply new skills directly to work<br>• Use ready-made templates<br>• Learn in short focused sessions       |
|                         **Pain Points**<br>• Bloated, long courses<br>• Hidden costs<br>• Confusing navigation                         |               **Pain Points**<br>• Inconsistent quality<br>• No clear learning roadmap<br>• Lack of visible progress               |                 **Pain Points**<br>• Overlong videos<br>• Missing transcripts/resources<br>• Poor mobile playback/resume                 |
| **Tech & Accessibility**<br>• Android + 13" laptop<br>• VS Code; Git basics<br>• Needs transcripts/captions; studies in short sessions | **Tech & Accessibility**<br>• iPhone + 15" Windows laptop<br>• Git novice<br>• Prefers large fonts and high contrast (night study) | **Tech & Accessibility**<br>• MacBook Air + iPad<br>• Uses transcripts at 1.25–1.5× speed<br>• Values responsive playback across devices |

---

## Information Architecture

**Initial Entry**
- Users can explore the platform without mandatory registration.
- Course previews are available before signup.
- Clear calls to action encourage account creation for progress tracking and certification.

**Authentication**
- Login:
  - Returning users log in using email and password.
  - Upon successful login, users are redirected to their personal dashboard.
- Registration:
  - New users register by providing:
    - First name
    - Last name
    - Email
    - Password
  - After successful registration, users are automatically logged in and redirected to the dashboard.

---

## USER

### Home / Dashboard

**Primary landing area after login**

- Displays:
  - Personalized learning progress.
  - Recommended courses based on user interests and activity.
  - Recently accessed lessons.
- Quick actions:
  - Resume last lesson.
  - Browse all courses.
  - View certificates and achievements.

---

### Courses

**Central learning hub**

- Displays all available courses.
- Filtering and sorting options:
  - By skill level (Beginner / Intermediate / Advanced)
  - By topic or technology
  - By estimated completion time
- Each course displays:
  - Course description and learning objectives.
  - Number of lessons and total duration.
  - Visual progress indicator.
- User actions:
  - Enroll in a course.
  - Continue or restart enrolled courses.

---

### Course View

**Detailed learning environment**

- Structured lesson list within the course.
- Lessons may include:
  - Main lesson content.
  - Transcripts and downloadable resources.
  - Code examples and practical exercises.
- User controls:
  - Explore lessons.
  - Mark lessons as completed.

---

### Learning Progress

**Progress tracking and motivation**

- Visual progress indicators per course.
- Clearly defined milestones.
- Earned certificates available for download or sharing.
- Suggested next steps upon course completion.

---

### Profile & Settings

- Profile information:
  - Name and email address.
- Learning preferences:
  - Theme selection (light / dark).
- Account management:
  - Change password.
  - Logout.

---

## ADMIN

### Content Management

- Admin capabilities:
  - Create, edit, and delete courses.
  - Manage lessons within courses.
  - Upload and maintain video content and resources.
- Visibility controls:
  - Draft vs published courses.
  - Lesson ordering.

---

### User Management

- Admin can:
  - View registered users.
  - Monitor course enrollments.
  - Remove users when necessary.

---

## Sitemap

![Sitemap](sitemap.png)

---

## LLM Prompts

Based on already provided data about our new platform we are building, I need you to generate me 3 user personas. Act as an expert in UX field.

Based on already generated user personas, I need you to generate me an optimised prompt to generate the persona image, one per each. I am using Sora platform to generate images.

Generate a single 1:1 still image (not video): a photorealistic editorial portrait of a Croatian woman in a modern office holding a tablet. Bright neutral lighting, eye-level, shallow depth of field; background suggests charts/dashboards softly blurred. Friendly, confident expression. Authentic skin texture, minimal retouching. No text, no watermarks, no logos. Camera look: 50mm f/2.2, ISO 250.

Generate a single 1:1 still image (not video): a photorealistic editorial portrait of a Croatian man learning front-end development at a home desk. Smart-casual shirt, sticky notes and a laptop visible in the softly blurred background. Evening warm indoor light, eye-level, shallow depth of field. Calm, confident expression. Authentic look, minimal retouching. No text, no watermarks, no logos. Camera look: 50mm f/2.0, ISO 400. Background hints of a learning roadmap on the wall, softly out of focus.

Generate a single 1:1 still image (not video): a photorealistic editorial portrait of a young Croatian woman studying in a dorm. Casual hoodie, seated at a small desk with a laptop and notebook slightly out of focus. Soft natural window light, eye-level framing, shallow depth of field, neutral warm tones. Authentic, minimal retouching. No text, no watermarks, no logos. Camera look: 50mm f/1.8, ISO 200. Background: minimalist dorm details subtly blurred. Expression: neutral with a slight smile.

Guide me through the sitemap architecture Udemy uses.
