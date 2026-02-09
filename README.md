# Ritesh Jha - Portfolio Website

## View live : https://about-ritesh.vercel.app/ 

A modern, interactive portfolio website built with React, featuring smooth animations, dynamic theming, and a comprehensive showcase of my work and skills.

---

##  Tech Stack

- **Framework:** React 18.3.1
- **Build Tool:** Vite 5.3.1
- **Routing:** React Router DOM 7.13.0
- **Animations:** GSAP 3.12.5, AOS 2.3.4
- **Smooth Scrolling:** Lenis 1.3.17
- **Icons:** React Icons 5.4.0
- **GitHub Integration:** React GitHub Calendar 5.0.5
- **Styling:** CSS Modules
- **Deployment:** Vercel

---

##  Project Structure

```
ritesh-jha/
├── src/
│   ├── assets/                        # Static assets (images, icons, etc.)
│   │
│   ├── common/                        # Reusable components
│   │   ├── internshipCard.jsx
│   │   ├── loadingScreen.jsx
│   │   ├── loadingScreen.module.css
│   │   ├── projectCard.jsx
│   │   ├── projectCard.module.css
│   │   ├── projectModal.jsx
│   │   ├── projectModal.module.css
│   │   ├── skillList.jsx
│   │   └── themeContext.jsx           # Theme management context
│   │
│   ├── sections/                      # Landing page sections
│   │   ├── BentoGrid/                 # Skills & info showcase
│   │   │   ├── BentoGrid.jsx
│   │   │   └── BentoGrid.module.css
│   │   │
│   │   ├── Connect/                   # Contact & social links with terminal
│   │   │   ├── Connect.jsx
│   │   │   ├── Connect.module.css
│   │   │   ├── Terminal.jsx
│   │   │   └── Terminal.module.css
│   │   │
│   │   ├── Contact/
│   │   │   ├── contact.jsx
│   │   │   └── contactStyles.module.css
│   │   │
│   │   ├── Experience/                # Work experience section
│   │   │   ├── ExperienceSection.jsx
│   │   │   └── experienceStyles.module.css
│   │   │
│   │   ├── Footer/
│   │   │   ├── footer.jsx
│   │   │   └── footerStyles.module.css
│   │   │
│   │   ├── Github/                    # GitHub contributions calendar
│   │   │   ├── Github.jsx
│   │   │   └── Github.module.css
│   │   │
│   │   ├── Hero/                      # Main introductory section
│   │   │   ├── hero.jsx
│   │   │   └── heroStyles.module.css
│   │   │
│   │   ├── Navbar/                    # Navigation bar
│   │   │   ├── Navbar.jsx
│   │   │   └── Navbar.module.css
│   │   │
│   │   ├── Projects/                  # Projects teaser section
│   │   │   ├── ProjectsTeaser.jsx
│   │   │   └── projectsStyles.module.css
│   │   │
│   │   └── Skills/
│   │       ├── skills.jsx
│   │       └── skillsStyles.module.css
│   │
│   ├── pages/                         # Standalone pages
│   │   ├── AllProjects/               # Complete projects showcase
│   │   │   ├── AllProjects.jsx
│   │   │   └── AllProjects.module.css
│   │   │
│   │   └── Blogs/                     # Blog page
│   │       └── Blogs.jsx
│   │
│   ├── App.css
│   ├── App.jsx                        # Main app with routing & Lenis setup
│   ├── index.css
│   └── main.jsx
│
├── public/                            # Public assets
├── .env.local                         # Environment variables
├── vercel.json                        # Vercel deployment config
├── vite.config.js                     # Vite configuration
├── package.json
└── README.md                          # You are reading this!
```

---

##  Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/RiteshJha912/ritesh-jha.git
cd ritesh-jha
```

2. Install dependencies
```bash
npm install
```

3. Create a `.env.local` file (if needed for environment variables)

4. Start the development server
```bash
npm run dev
```

5. Open [http://localhost:5173](http://localhost:5173) in your browser

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

---

##  Design Philosophy

This portfolio is built with a focus on UX and performance, and does not try to go over the top to show theatrics in design just to satisfy my ego leaving the user with a jittery UX.

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for more details.

---

##  Personal Note

This is one of those only projects for me as a developer which really gave me enough of both adrenaline and fulfillment. I'll keep updating it constantly as I grow and learn.

### Much Love ❤️

---

**Built with passion by Ritesh Jha** | [Live Site](https://about-ritesh.vercel.app/) | [GitHub](https://github.com/RiteshJha912)
