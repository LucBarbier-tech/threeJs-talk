import React from "react";

export const WebglExample = () => {
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);

  React.useEffect(() => {
    if (!canvasRef.current) {
      return;
    }
    const canvas = canvasRef.current;
    const gl = canvas.getContext("webgl");

    if (!gl) {
      alert("Unable to initialize WebGL. Your browser may not support it.");
      return;
    }

    const vertexShaderSource = `
        attribute vec4 aVertexPosition;
        uniform mat4 uModelViewMatrix;
        uniform mat4 uProjectionMatrix;
        void main(void) {
            gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;
        }
    `;

    const fragmentShaderSource = `
        void main(void) {
            gl_FragColor = vec4(0.5, 0.5, 0.5, 1.0); // Grey color
        }
    `;

    const loadShader = (
      gl: WebGLRenderingContext,
      type: number,
      source: string
    ) => {
      const shader = gl.createShader(type);
      if (!shader) {
        return;
      }
      gl.shaderSource(shader, source);
      gl.compileShader(shader);

      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error(
          "An error occurred compiling the shaders: ",
          gl.getShaderInfoLog(shader)
        );
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vertexShader = loadShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
    const fragmentShader = loadShader(
      gl,
      gl.FRAGMENT_SHADER,
      fragmentShaderSource
    );

    const shaderProgram = gl.createProgram();

    if (!vertexShader || !fragmentShader || !shaderProgram) {
      return;
    }

    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);
    gl.linkProgram(shaderProgram);

    if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
      console.error(
        "Unable to initialize the shader program:",
        gl.getProgramInfoLog(shaderProgram)
      );
      return;
    }

    gl.useProgram(shaderProgram);

    const vertexPosition = gl.getAttribLocation(
      shaderProgram,
      "aVertexPosition"
    );
    gl.enableVertexAttribArray(vertexPosition);

    const vertices = new Float32Array([
      -1.0, -1.0, 1.0, 1.0, -1.0, 1.0, 1.0, 1.0, 1.0, -1.0, 1.0, 1.0, -1.0,
      -1.0, -1.0, 1.0, -1.0, -1.0, 1.0, 1.0, -1.0, -1.0, 1.0, -1.0,
    ]);

    const indices = new Uint16Array([
      0, 1, 2, 0, 2, 3, 4, 5, 6, 4, 6, 7, 0, 1, 5, 0, 5, 4, 1, 2, 6, 1, 6, 5, 2,
      3, 7, 2, 7, 6, 3, 0, 4, 3, 4, 7,
    ]);

    const vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    const indexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW);

    const projectionMatrix = [
      2.414213562373095, 0, 0, 0, 0, 2.414213562373095, 0, 0, 0, 0,
      -1.002002002002002, -1, 0, 0, -0.20020020020020018, 0,
    ];

    const modelViewMatrix = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, -6, 1];

    const uProjectionMatrix = gl.getUniformLocation(
      shaderProgram,
      "uProjectionMatrix"
    );
    const uModelViewMatrix = gl.getUniformLocation(
      shaderProgram,
      "uModelViewMatrix"
    );

    if (!uProjectionMatrix || !uModelViewMatrix) {
      return;
    }

    gl.uniformMatrix4fv(
      uProjectionMatrix,
      false,
      new Float32Array(projectionMatrix)
    );
    gl.uniformMatrix4fv(
      uModelViewMatrix,
      false,
      new Float32Array(modelViewMatrix)
    );

    const rotateY = (m: number[], angle: number) => {
      const c = Math.cos(angle);
      const s = Math.sin(angle);
      const mv0 = m[0],
        mv4 = m[4],
        mv8 = m[8];

      m[0] = c * m[0] - s * m[2];
      m[4] = c * m[4] - s * m[6];
      m[8] = c * m[8] - s * m[10];

      m[2] = c * m[2] + s * mv0;
      m[6] = c * m[6] + s * mv4;
      m[10] = c * m[10] + s * mv8;
    };

    const drawScene = () => {
      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

      rotateY(modelViewMatrix, 0.01);

      gl.uniformMatrix4fv(
        uModelViewMatrix,
        false,
        new Float32Array(modelViewMatrix)
      );

      gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
      gl.vertexAttribPointer(vertexPosition, 3, gl.FLOAT, false, 0, 0);

      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
      gl.drawElements(gl.TRIANGLES, 36, gl.UNSIGNED_SHORT, 0);

      requestAnimationFrame(drawScene);
    };

    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.enable(gl.DEPTH_TEST);

    drawScene();
  }, []);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        aspectRatio: 1,
      }}
    >
      <p>{"Webgl"}</p>
      <canvas ref={canvasRef} style={{ width: "100%", height: "100%" }} />
    </div>
  );
};
