---
layout: default
permalink: /blog/
title: DigitalGarden
nav: true
nav_order: 2
pagination:
  enabled: true
  collection: posts
  permalink: /page/:num/
  per_page: 5
  sort_field: date
  sort_reverse: true
---

<div class="post">

  <div class="header-bar">
    <h1>Digital Garden</h1>
    <h2 style="font-weight: normal;">
      Random thoughts of a mathematician working in machine learning.
    </h2>
    <p class="garden-description">
      Welcome to my digital garden—a space for cultivating ideas in progress. Unlike a traditional blog, this is where I plant seeds of thought that may grow, evolve, or remain incomplete. Expect rough drafts, half-formed concepts, and works-in-progress as I explore connections between geometry, machine learning, and beyond.
    </p>
  </div>

  <ul class="post-list">
    {% if page.pagination.enabled %}
      {% assign postlist = paginator.posts %}
    {% else %}
      {% assign postlist = site.posts %}
    {% endif %}

    {% for post in postlist %}
    {% assign read_time = post.content | number_of_words | divided_by: 180 | plus: 1 %}
    <li>
      <h3>
        <a class="post-title" href="{{ post.url | relative_url }}">{{ post.title }}</a>
      </h3>
      <p>{{ post.description }}</p>
      <p class="post-meta">
        {{ read_time }} min read &middot; {{ post.date | date: '%B %d, %Y' }}
      </p>
    </li>
    {% endfor %}
  </ul>

  {% if page.pagination.enabled %}
    {% include pagination.liquid %}
  {% endif %}
</div>