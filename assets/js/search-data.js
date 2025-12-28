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
        },{id: "post-abstraction-on-basis",
        
          title: "Abstraction On Basis",
        
        description: "",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2025/abstraction-on-basis/";
          
        },
      },{id: "news-our-paper-nam-neural-adjoint-maps-for-refining-shape-correspondences-with-maks-ovsjanikov-and-simone-melzi-has-been-published-in-acm-transactions-on-graphics-currently-in-vancouver-at-siggraph-2025-presenting-our-work",
          title: '🎉 Our paper NAM: Neural Adjoint Maps for refining shape correspondences (with Maks...',
          description: "",
          section: "News",},{id: "news-excited-to-announce-the-release-of-geomfum-a-new-library-for-machine-learning-with-functional-maps-check-it-out-on-https-github-com-3diglab-geomfum",
          title: '📚 Excited to announce the release of GeomFum, a new library for machine...',
          description: "",
          section: "News",},{id: "news-thrilled-to-join-école-polytechnique-as-a-visiting-phd-student-working-with-maks-ovsjanikov",
          title: '🇫🇷 Thrilled to join École Polytechnique as a Visiting PhD Student, working with...',
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
