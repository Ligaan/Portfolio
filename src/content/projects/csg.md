---
title: "Constructive Solid Geometry (CSG)"
category: "Graphics / Self-Development"
summary: "A solo, from-scratch runtime CSG implementation in C++/OpenGL — mesh boolean operations via face intersection and triangulation."
thumbnail: "/projects/csg.jpg"
team: "Solo"
featured: false
order: 7
---

A self-development project built alongside team production work: a from-scratch implementation of Constructive Solid Geometry (runtime boolean mesh operations — union, subtraction, intersection) in C++ with OpenGL, GLFW, GLM, and ImGui.

## What I did

- Researched CSG vs. SDF (Signed Distance Fields) as alternative approaches before committing to CSG
- Built mesh-generation functions for primitives (spheres, cylinders, boxes)
- Implemented **Separating Axis Theorem (SAT)**-based collision detection between meshes as an early-out before doing full intersection work
- Implemented **face-to-face intersection** between two meshes to compute the actual boolean result, including tracking which vertices lie inside both meshes
- Built **triangulation** for the resulting intersection faces — arbitrary-sided polygons, not just triangles — to turn intersection geometry into a renderable mesh
- Got working results for box-box and box-sphere intersection, debugging along the way (indexing bugs, incorrect triangulation on non-trivial face shapes)

## Contributions

Most of the real difficulty here wasn't collision detection — SAT is well documented — it was correctly generating and triangulating the arbitrary polygon faces produced by mesh intersection. A misread of the reference GDC talk led to an initial wrong approach for face-to-face intersection, which cost real time to unwind once caught. The project was deliberately scoped to convex geometry only, to keep the core boolean-operation logic tractable before considering concave cases.

## Result
Working boolean mesh operations (union, subtraction, intersection) demonstrated on primitive shape pairs (box-box, box-sphere, and others), plus a clear picture of where CSG's complexity actually lives — in the geometry processing, not the collision test.