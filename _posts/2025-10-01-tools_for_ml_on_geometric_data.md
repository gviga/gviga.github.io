---
layout: post
title: "Useful Tools for Machine Learning on Geometric Data"
description: A curated list of open-source libraries for machine learning on 3D data, based on my experience as a geometry processing researcher.
date: 2025-10-01
tags: [open-source, geometry-processing, machine-learning]
categories: [tools]
featured: true
---

Recently, I was talking with a colleague who works in industry about open-source libraries for machine learning on 3D data. It made me realize how often it's not that easy to find good, practical resources in this niche.

For this reason, I thought about sharing my personal experience with some libraries that I've found useful. Of course, everyone faces different problems and tasks, so my observations are quite specific, and can change over the time depending on what i'm working on.

## Libraries I Actively Use

Here's a list of libraries I've used (or explored) for machine learning on 3D data:

### Core ML & Geometry Processing

- **[PyTorch Geometric](https://pytorch-geometric.readthedocs.io/)**: Mainly built for graphs, but very well structured and actively developed. Great for geometric deep learning architectures.

- **[PyTorch3D](https://pytorch3d.org/)**: Not the easiest to install, but some routines can only be found here. Essential for differentiable rendering and 3D operations.

- **[Potpourri3D](https://github.com/nmwsharp/potpourri3d)**: Excellent for geodesics and geometry processing. My go-to for distance computations on 3D meshes.

- **[LibIGL](https://libigl.github.io/)**: A reliable choice for basic geometry processing routines. The Python bindings make it very accessible.

- **[Open3D](https://www.open3d.org/)**: The first 3D library I came across; I use it less nowadays, but it remains useful and optimized for basic computations like I/O and visualization.

### Spectral Geometry

- **[GeomFuM](https://github.com/GiulioViganò/geomfum)**: My own library focused on spectral geometry on 3D shapes with some useful feature extractors implemented.

- **[PyFM](https://github.com/RobinMagnet/pyFM)**: Another great library for functional maps and spectral methods.

## Other Valuable Libraries

Other libraries I haven't used extensively but that might be valuable depending on your application:

- **[Geomstats](https://geomstats.github.io/)**: For Riemannian statistics and geometry.

- **[GeomLoss](https://www.kernel-operations.io/geomloss/)**: For optimal transport computations.

- **[Scikit-shape](https://scikit-shape.org/)**: For shape registration tasks.

- **[Cinolib](https://github.com/mlivesu/cinolib)**: For working with tetrahedral meshes.

## Final Thoughts

This list reflects only my own experience from the projects I've worked on in recent years. The landscape of tools for geometric machine learning is constantly evolving, and I'd love to hear about the tools or frameworks that others find most effective.
---

*This is a living document in my digital garden—I'll update it as I discover new tools or gain more experience with existing ones.*