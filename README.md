# Medium Talk

A nice little app to give you questions to start conversations, bypassing small talk.

I created this group after moving to Baltimore, to help hold platonic picnics where we get help with getting past the small talk and actually into connecting as friends. Over my years of working as a full-time Uber driver, Trader Joe's cashier, and in desktop tech support, along with a lifelong passion for striking up conversation with strangers, I have gained a sense of what kinds of questions can connect us quickly. 

Small talk has its purpose, to sense out if our conversational partner is friendly, but it's the _medium talk_ that connects us.

This app will be used at my picnics to help attendees ask questions there and beyond.

## Features

- Frontend: Vue.js 3 with Vite, Composition API, Vue Router, and Pinia.
- Hosting: GitHub Pages.
- Domain name: mediumtalk.org
- Route per instance (e.g. /philadelphia/, /baltimore/, /chicago/) with custom color scheme. 
- Home page route lists the instances, describes the purpose of the app, and shows a random question as a sample. The vertical content order of the home page is title (Medium Talk) > random question > description > list of instances > attribution (my name, email address)
- Each instance will have a color scheme for: background color, text color, text chip background color, and text chip text color. For example, for the /baltimore/ instance, the color scheme will be: background color: #FCBC45, text color: #000000, text chip background color: #C51E30, text chip text color: #FFFFFF.
- Questions are categorized by level: Surface, Sub-Surface, and Core. They are also may be flagged to be good 1:1 or group questions.
- Mobile-first, responsive design.
- Minimalist, clean interface. The question is centered in a very readable font.
- Swipe interface. Swipe up or down to go to a random question in the previous or next level, respectively. If the current level is "Core", swipe down goes to a random question in "Surface". If the current level is "Surface", swipe up goes to a random question in "Core". Swipe left or right to go to a random question in the current level.
- There is a small text chip indicator at the top left of the screen indicating if it's good as a group question or 1:1 question. There is a small text chip indicator at the top right of the screen indicating the question level.
- Open source questions in Markdown on Github.

## Installation

Fork this repository and clone it to your local machine.

If you change the name of the repository and are hosting on GitHub Pages, you will need to update the `vite.config.js` file in the `base` property.

Then set up the repo locally with:

```bash
npm install
```

And run the development server with:

```bash
npm run dev
```

This will start the development server at `http://localhost:5190`.