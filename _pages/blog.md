---
layout: default
permalink: /blog/
title: Blog
nav: true
nav_order: 2
---

{% assign sections = "research|thoughts" | split: "|" %}

<div class="post">

  <div class="header-bar">
    <h1>Blog</h1>
    <p class="blog-description">
      Notes on my research and thoughts on other things. Posts here are not meant to be finished: I come back to them to change, expand, and correct them as my ideas evolve.
    </p>
    <nav class="blog-section-nav">
      <a href="#research">Research &amp; Technical</a>
      &middot;
      <a href="#thoughts">Thoughts &amp; Essays</a>
    </nav>
  </div>

  {% for section in sections %}
    {% if section == "research" %}
      {% assign section_title = "Research &amp; Technical" %}
      {% assign section_subtitle = "Geometry, machine learning, and the tools I use." %}
    {% else %}
      {% assign section_title = "Thoughts &amp; Essays" %}
      {% assign section_subtitle = "AI and society, politics, and everything else." %}
    {% endif %}

    {% assign postlist = site.posts | where: "section", section %}

    <section class="blog-section" id="{{ section }}">
      <h2 class="blog-section-title">{{ section_title }}</h2>
      <p class="blog-section-subtitle">{{ section_subtitle }}</p>

      <ul class="post-list">
        {% for post in postlist %}
        {% assign read_time = post.content | number_of_words | divided_by: 180 | plus: 1 %}
        <li>
          <h3>
            <a class="post-title" href="{{ post.url | relative_url }}">{{ post.title }}</a>
          </h3>
          <p>{{ post.description }}</p>
          <p class="post-meta">
            {{ post.date | date: "%B %-d, %Y" }} &middot; {{ read_time }} min read
          </p>
        </li>
        {% endfor %}
      </ul>
    </section>
  {% endfor %}
</div>
