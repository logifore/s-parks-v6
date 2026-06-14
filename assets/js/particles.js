"use strict";

window.SparksParticles = (() => {
  function init(canvas) {
    if (!canvas) return;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      initFallback(canvas, { reducedMotion: true });
      return;
    }

    const gl = canvas.getContext("webgl", { alpha: true, antialias: true });
    if (!gl) {
      initFallback(canvas);
      return;
    }

    const vertexSource = `
      attribute vec2 position;
      varying vec2 vTexCoord;
      void main() {
        vTexCoord = position * 0.5 + 0.5;
        vTexCoord.y = 1.0 - vTexCoord.y;
        gl_Position = vec4(position, 0.0, 1.0);
      }
    `;

    const fragmentSource = `
      precision highp float;
      varying vec2 vTexCoord;
      uniform float uTime;
      uniform vec2 uResolution;
      uniform vec2 uMouse;

      float hash(vec2 p) {
        return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
      }

      void main() {
        vec2 uv = vTexCoord;
        vec3 color = vec3(0.0);
        vec2 grid = uv * vec2(20.0, 15.0);
        vec2 id = floor(grid);
        vec2 f = fract(grid);
        vec2 mouse = uMouse / max(uResolution, vec2(1.0));

        for (float y = -1.0; y <= 1.0; y++) {
          for (float x = -1.0; x <= 1.0; x++) {
            vec2 offset = vec2(x, y);
            vec2 curId = id + offset;
            float h = hash(curId);
            vec2 pos = offset + 0.5 + 0.3 * sin(uTime * 0.5 + h * 6.2831 + vec2(0.0, 1.9));
            float pull = exp(-length(uv - mouse) * 5.0);
            pos += (uv - mouse) * pull * 0.5;
            float d = length(f - pos);
            float size = 0.01 + 0.018 * h;
            float particle = smoothstep(size, 0.0, d);
            particle *= 0.35 + 0.65 * sin(uTime * 1.5 + h * 10.0);
            color += particle * vec3(0.8, 0.9, 1.0);
          }
        }

        float glow = exp(-length(uv - mouse) * 7.0) * 0.14;
        color += vec3(0.55, 0.72, 1.0) * glow;
        gl_FragColor = vec4(color, clamp(color.r * 0.62, 0.0, 0.72));
      }
    `;

    function compile(type, source) {
      const shader = gl.createShader(type);
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) return null;
      return shader;
    }

    const vertex = compile(gl.VERTEX_SHADER, vertexSource);
    const fragment = compile(gl.FRAGMENT_SHADER, fragmentSource);
    if (!vertex || !fragment) {
      initFallback(canvas);
      return;
    }

    const program = gl.createProgram();
    gl.attachShader(program, vertex);
    gl.attachShader(program, fragment);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      initFallback(canvas);
      return;
    }

    gl.useProgram(program);
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);

    const position = gl.getAttribLocation(program, "position");
    gl.enableVertexAttribArray(position);
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);

    const uniforms = {
      time: gl.getUniformLocation(program, "uTime"),
      resolution: gl.getUniformLocation(program, "uResolution"),
      mouse: gl.getUniformLocation(program, "uMouse")
    };
    const mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

    window.addEventListener("pointermove", (event) => {
      mouse.x = event.clientX;
      mouse.y = event.clientY;
    }, { passive: true });

    function resize() {
      const scale = Math.min(window.devicePixelRatio || 1, 2);
      const isCompactViewport = window.innerWidth <= 680;
      const densityScale = isCompactViewport ? Math.min(scale, 1.25) : scale;
      const width = Math.floor(window.innerWidth * densityScale);
      const height = Math.floor(window.innerHeight * densityScale);
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
        gl.viewport(0, 0, width, height);
      }
      return densityScale;
    }

    function frame(time) {
      const scale = resize();
      gl.uniform1f(uniforms.time, time * 0.001);
      gl.uniform2f(uniforms.resolution, canvas.width, canvas.height);
      gl.uniform2f(uniforms.mouse, mouse.x * scale, (window.innerHeight - mouse.y) * scale);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      requestAnimationFrame(frame);
    }

    requestAnimationFrame(frame);
  }

  function initFallback(canvas, options = {}) {
    const ctx = canvas.getContext("2d");
    const particles = [];
    const reducedMotion = Boolean(options.reducedMotion);

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      particles.length = 0;
      const maxCount = reducedMotion ? 32 : 90;
      const density = reducedMotion ? 32000 : 18000;
      const count = Math.min(maxCount, Math.floor((canvas.width * canvas.height) / density));
      for (let index = 0; index < count; index += 1) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: reducedMotion ? 0 : Math.random() * 0.5 - 0.25,
          vy: reducedMotion ? 0 : Math.random() * 0.5 - 0.25,
          r: Math.random() * 1.5 + 0.45,
          alpha: Math.random() * (reducedMotion ? 0.2 : 0.42) + 0.12
        });
      }
    }

    function frame() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x = (p.x + p.vx + canvas.width) % canvas.width;
        p.y = (p.y + p.vy + canvas.height) % canvas.height;
        ctx.fillStyle = `rgba(210, 226, 255, ${p.alpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      });
      requestAnimationFrame(frame);
    }

    window.addEventListener("resize", resize, { passive: true });
    resize();
    frame();
  }

  return { init };
})();
