---
layout: default
permalink: /blog/
title: digital garden
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
    <h1>Blog</h1>
    <h2 style="font-weight: normal;">
      Random thoughts of a researcher in machine learning with an interest in abstractions.
    </h2>
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

