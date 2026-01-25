// get the ninja-keys element
const ninja = document.querySelector('ninja-keys');

// add the home and posts menu items
ninja.data = [{
    id: "nav-about",
    title: "About",
    section: "Navigation",
    handler: () => {
      window.location.href = "/";
    },
  },{id: "nav-publications",
          title: "Publications",
          description: "My research publications organized by topic and year.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/publications/";
          },
        },{id: "nav-digitalgarden",
          title: "DigitalGarden",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/blog/";
          },
        },{id: "post-the-day-you-lose-power-is-the-day-you-need-rights",
        
          title: "The Day You Lose Power Is the Day You Need Rights",
        
        description: "",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2026/ai_hallucinations/";
          
        },
      },{id: "post-the-day-you-lose-power-is-the-day-you-need-rights",
        
          title: "The Day You Lose Power Is the Day You Need Rights",
        
        description: "",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2026/understanding_the_role-of_rights/";
          
        },
      },{id: "post-humanity-s-next-bitter-lesson",
        
          title: "Humanity’s Next Bitter Lesson",
        
        description: "How the Bitter Lesson of AI scaling extends from algorithms to human trust, work, and social roles.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2026/humanity_bitter_lesson/";
          
        },
      },{id: "post-useful-tools-for-machine-learning-on-geometric-data",
        
          title: "Useful Tools for Machine Learning on Geometric Data",
        
        description: "A curated list of open-source libraries for machine learning on 3D data, based on my experience as a geometry processing researcher.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2025/tools_for_ml_on_geometric_data/";
          
        },
      },{id: "news-our-paper-nam-neural-adjoint-maps-for-refining-shape-correspondences-with-maks-ovsjanikov-and-simone-melzi-has-been-published-in-acm-transactions-on-graphics-currently-in-vancouver-at-siggraph-2025-presenting-our-work",
          title: '🎉 Our paper NAM: Neural Adjoint Maps for refining shape correspondences (with Maks...',
          description: "",
          section: "News",},{id: "news-we-have-released-geomfum-a-new-library-for-machine-learning-with-functional-maps-check-it-out-on-https-github-com-3diglab-geomfum",
          title: '📚 We have released GeomFum, a new library for machine learning with Functional...',
          description: "",
          section: "News",},{id: "news-i-joined-école-polytechnique-as-a-visiting-phd-student-working-with-maks-ovsjanikov",
          title: '🇫🇷 I joined École Polytechnique as a Visiting PhD Student, working with Maks...',
          description: "",
          section: "News",},{
        id: 'social-email',
        title: 'email',
        section: 'Socials',
        handler: () => {
          window.open("mailto:%67%69%75%6C%69%6F.%76%69%67%61%6E@%67%6D%61%69%6C.%63%6F%6D", "_blank");
        },
      },{
        id: 'social-github',
        title: 'GitHub',
        section: 'Socials',
        handler: () => {
          window.open("https://github.com/gviga", "_blank");
        },
      },{
        id: 'social-linkedin',
        title: 'LinkedIn',
        section: 'Socials',
        handler: () => {
          window.open("https://www.linkedin.com/in/giulio-viganò", "_blank");
        },
      },{
        id: 'social-orcid',
        title: 'ORCID',
        section: 'Socials',
        handler: () => {
          window.open("https://orcid.org/0009-0002-0255-3240", "_blank");
        },
      },{
        id: 'social-scholar',
        title: 'Google Scholar',
        section: 'Socials',
        handler: () => {
          window.open("https://scholar.google.com/citations?user=ZN_WlJIAAAAJ", "_blank");
        },
      },{
      id: 'light-theme',
      title: 'Change theme to light',
      description: 'Change the theme of the site to Light',
      section: 'Theme',
      handler: () => {
        setThemeSetting("light");
      },
    },
    {
      id: 'dark-theme',
      title: 'Change theme to dark',
      description: 'Change the theme of the site to Dark',
      section: 'Theme',
      handler: () => {
        setThemeSetting("dark");
      },
    },
    {
      id: 'system-theme',
      title: 'Use system default theme',
      description: 'Change the theme of the site to System Default',
      section: 'Theme',
      handler: () => {
        setThemeSetting("system");
      },
    },];
