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
      Random thoughts on things.
    </h2>
    <p class="garden-description">
      Recently, I felt the urge to share thoughts and ideas on a variety of subjects and started exploring different ways to do so. Creating a blog seemed like the obvious first step; however, the pressure to publish well-curated and definitive posts felt like too much—especially for someone who already does that professionally through academic papers. Then I remembered the concept of a Digital Garden (https://joelhooks.com/digital-garden
      ), and it immediately resonated with me. What I find most compelling is the idea that each post is created with the explicit intention of being revisited: changed, expanded, corrected, and improved over time. Rather than presenting finished conclusions, this space is meant to reflect ongoing ideas rather than polished endpoints.

    This garden is a place to grow thoughts slowly, imperfectly, and in public.
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
        {{ read_time }} min read &middot;
      </p>
    </li>
    {% endfor %}
  </ul>

  {% if page.pagination.enabled %}
    {% include pagination.liquid %}
  {% endif %}
</div>