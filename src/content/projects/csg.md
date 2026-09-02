---
title: "Mesh Boolean Operations — CSG & SDF"
category: "Graphics / Self-Development"
summary: "A solo, from-scratch exploration of runtime mesh boolean operations in C++/OpenGL — comparing Constructive Solid Geometry (face intersection + triangulation) and Signed Distance Fields as different approaches."
thumbnail: "/projects/CSG/CSG/CSG.png"
team: "Solo"
featured: false
order: 7
---

A self-development project built alongside team production work: exploring runtime boolean mesh operations (union, subtraction, intersection) in C++ with OpenGL, GLFW, GLM, and ImGui — trying out both Constructive Solid Geometry (CSG) and Signed Distance Fields (SDF) as different approaches to the same problem, rather than committing to one from the start. Tracked separately on GitHub, distinct from the Dreadtome team project and run in parallel.

**Repos:** [CSG implementation](https://github.com/Ligaan/CSGBooleanGeometry) · [SDF implementation](https://github.com/Ligaan/SDFBooleanGeometry)

<div class="content-with-video">
  <div class="content-text">

## What I did

- Researched **CSG vs. SDF** as two fundamentally different approaches to boolean mesh operations, weighing their trade-offs before deciding where to invest implementation time
- Built mesh-generation functions for primitives (spheres, cylinders, boxes)
- Implemented **Separating Axis Theorem (SAT)**-based collision detection between meshes as an early-out before doing full intersection work
- Implemented **face-to-face intersection** between two meshes to compute the actual boolean result via CSG, including tracking which vertices lie inside both meshes
- Built **triangulation** for the resulting intersection faces — arbitrary-sided polygons, not just triangles — to turn intersection geometry into a renderable mesh
- Got working CSG results for box-box intersection and a close-but-imperfect result for box-sphere, debugging along the way (indexing bugs, incorrect triangulation on non-trivial face shapes)
- Implemented an **SDF-based approach** to the same boolean operations (union, difference, intersection) across multiple primitive pairs — box-box, box-sphere, cylinder-box — evaluated on a discrete grid

## Contributions

Most of the real difficulty on the CSG side wasn't collision detection — SAT is well documented — it was correctly generating and triangulating the arbitrary polygon faces produced by mesh intersection. A misread of the reference GDC talk led to an initial wrong approach for face-to-face intersection, which cost real time to unwind once caught. The project was deliberately scoped to convex geometry only, to keep the core boolean-operation logic tractable before considering concave cases.

Each approach — CSG and SDF — was given its own ~2-month block at roughly 5–8 hours a week, and within that fixed time constraint each surfaced a distinct, real limitation rather than just a theoretical trade-off. CSG's face-intersection-and-triangulation approach didn't hold up well once meshes got more complex than flat-faced primitives — with a sphere, a large number of its faces ended up intersecting just one or two faces of the box, and while each individual resulting face triangulated fine on its own, connecting all of them correctly into a single vertex buffer for rendering broke down. Box-sphere intersection got close but still produced visibly wrong vertices on the curved geometry that I didn't manage to fully resolve in the time available. SDF avoided that specific problem by treating the boolean operation as a field evaluation rather than a geometric one, but traded it for a different limitation: the resulting mesh resolution is tied directly to the evaluation grid's cell density, so results look visibly blocky. Improving that would mean scrapping or substantially reworking the current fixed-grid approach in favor of one that supports a higher-resolution grid without a proportional cost increase — something like an adaptive or sparse grid, rather than simply increasing cell count uniformly.

## Result
Working boolean mesh operations (union, subtraction, intersection) demonstrated on primitive shape pairs via both approaches — CSG (box-box fully working, box-sphere close-but-imperfect) and SDF (box-box, box-sphere, cylinder-box) — along with a clear, evidence-based picture of where each approach's complexity and limitations actually lie: CSG in robust geometry processing on curved/complex shapes due to it reusing the given meshes but costly at runtime, SDF in resolution versus performance due its approximations but allows you to more easily stylize and control the resolution of the meshes given in order to show consistent results.

### CSG results

CSG builds the result by directly intersecting mesh faces and triangulating the resulting geometry. It handled flat-faced primitives cleanly, but curved shapes like spheres exposed the limits of that triangulation approach when it comes to identifying how to properly connect multiple faces that were generated.

### SDF results

SDF represents each shape as a distance field and evaluates the boolean operation on a grid instead of intersecting geometry directly. That sidesteps CSG's triangulation problem entirely, at the cost of resolution — every result on the right shows the same underlying blockiness.

  </div>
  <div class="video-column">
    <figure class="video-figure">
      <div class="video-wrapper">
        <video controls playsinline preload="metadata">
          <source src="/projects/CSG/CSG/BoxBoxIntersection.mp4" type="video/mp4" />
          Your browser does not support embedded video.
        </video>
      </div>
      <figcaption>
        CSG box-box intersection, computed via face-to-face intersection and triangulation.
      </figcaption>
    </figure>
    <figure class="video-figure">
      <div class="video-wrapper">
        <img src="/projects/CSG/CSG/SphereBoxIntersection.png" alt="CSG sphere-box intersection result showing vertex defects" />
      </div>
      <figcaption>
        End result of the sphere-box case — close, but some vertices still came out wrong and I didn't manage to fully fix them in time.
      </figcaption>
    </figure>
    <figure class="video-figure">
      <div class="video-wrapper">
        <img src="/projects/CSG/SDF/UnionCubeCube.png" alt="SDF box-box union result" />
      </div>
      <figcaption>SDF box-box union.</figcaption>
    </figure>
    <figure class="video-figure">
      <div class="video-wrapper">
        <img src="/projects/CSG/SDF/DifferenceCubeCube.png" alt="SDF box-box difference result" />
      </div>
      <figcaption>SDF box-box difference.</figcaption>
    </figure>
    <figure class="video-figure">
      <div class="video-wrapper">
        <img src="/projects/CSG/SDF/IntersectionCubeSphere.png" alt="SDF box-sphere intersection result" />
      </div>
      <figcaption>SDF box-sphere intersection — same grid-resolution limitation on a curved surface.</figcaption>
    </figure>
    <figure class="video-figure">
      <div class="video-wrapper">
        <img src="/projects/CSG/SDF/IntersectionCylinderCube.png" alt="SDF cylinder-box intersection result" />
      </div>
      <figcaption>SDF cylinder-box intersection.</figcaption>
    </figure>
    <figure class="video-figure">
      <div class="video-wrapper">
        <img src="/projects/CSG/SDF/SDFSphereCubeIntersectionComplex.png" alt="SDF sphere-box intersection comparison" />
      </div>
      <figcaption>SDF sphere-box intersection comparison.</figcaption>
    </figure>
  </div>
</div>