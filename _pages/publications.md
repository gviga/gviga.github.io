---
layout: page
permalink: /publications/
title: Publications
description: My research publications organized by topic and year.
nav: true
nav_order: 2
---

<!-- _pages/publications.md -->

<div class="publications">

<!-- Introduction Section -->
<div class="intro-text">
  <p>Below you can find my research publications. 
  <a href="https://scholar.google.com/citations?user=ZN_WlJIAAAAJ&hl=it" target="_blank">
    <i class="ai ai-google-scholar"></i> Google Scholar
  </a>
  </p>
</div>
<!-- Bibsearch Feature -->
{% include bib_search.liquid %}

<!-- Year Grouping Option -->
{% bibliography --group_by year --group_order descending %}

</div>
