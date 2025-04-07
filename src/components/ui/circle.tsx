import React, { useEffect, useRef } from "react";


const IridescentSphere = () => {
	const canvasRef = useRef(null);

	useEffect(() => {
		const canvas = canvasRef.current;
		const ctx = canvas.getContext("2d");
		let animationFrameId;

		// Set canvas dimensions
		canvas.width = 400;
		canvas.height = 400;

		// Animation variables
		let time = 0;

		const render = () => {
			time += 0.005;

			// Clear canvas
			ctx.clearRect(0, 0, canvas.width, canvas.height);

			const centerX = canvas.width / 2;
			const centerY = canvas.height / 2;
			const radius = 150;

			// Create main gradient for the sphere
			const gradient = ctx.createRadialGradient(
				centerX - radius * 0.3,
				centerY - radius * 0.3,
				0,
				centerX,
				centerY,
				radius
			);

			// Deep purple center
			gradient.addColorStop(0, "rgba(30, 0, 60, 1)");
			gradient.addColorStop(0.5, "rgba(60, 20, 120, 0.8)");

			// Outer glow with blue tones
			gradient.addColorStop(0.8, "rgba(0, 180, 230, 0.6)");
			gradient.addColorStop(1, "rgba(120, 200, 255, 0.4)");

			// Draw main sphere
			ctx.beginPath();
			ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
			ctx.fillStyle = gradient;
			ctx.fill();

			// Draw iridescent reflections
			const drawReflection = (x, y, size, color, alpha) => {
				const reflGradient = ctx.createRadialGradient(x, y, 0, x, y, size);
				reflGradient.addColorStop(0, `rgba(${color}, ${alpha})`);
				reflGradient.addColorStop(1, "rgba(255, 255, 255, 0)");

				ctx.beginPath();
				ctx.arc(x, y, size, 0, Math.PI * 2);
				ctx.fillStyle = reflGradient;
				ctx.fill();
			};

			// Top-right cyan reflection
			drawReflection(
				centerX + radius * 0.5 * Math.cos(time),
				centerY - radius * 0.5 * Math.sin(time * 0.7),
				radius * 0.6,
				"100, 200, 255",
				0.5
			);

			// Bottom-left magenta reflection
			drawReflection(
				centerX - radius * 0.3 * Math.cos(time * 0.5),
				centerY + radius * 0.4 * Math.sin(time * 0.6),
				radius * 0.7,
				"255, 100, 200",
				0.4
			);

			// Edge rainbow effect
			const edgeGradient = ctx.createLinearGradient(
				centerX - radius * Math.cos(time),
				centerY - radius * Math.sin(time),
				centerX + radius * Math.cos(time + Math.PI),
				centerY + radius * Math.sin(time + Math.PI)
			);

			edgeGradient.addColorStop(0, "rgba(255, 200, 100, 0.7)"); // Golden
			edgeGradient.addColorStop(0.33, "rgba(255, 100, 100, 0.7)"); // Red
			edgeGradient.addColorStop(0.66, "rgba(100, 200, 255, 0.7)"); // Blue
			edgeGradient.addColorStop(1, "rgba(200, 255, 100, 0.7)"); // Green

			ctx.beginPath();
			ctx.arc(centerX, centerY, radius * 0.95, 0, Math.PI * 2);
			ctx.lineWidth = radius * 0.15;
			ctx.strokeStyle = edgeGradient;
			ctx.stroke();

			// Request next frame
			animationFrameId = window.requestAnimationFrame(render);
		};

		render();

		// Cleanup
		return () => {
			window.cancelAnimationFrame(animationFrameId);
		};
	}, []);
const css=`.iridescent-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  background-color: transparent;
  overflow: hidden;
}

.iridescent-sphere {
  display: block;
  max-width: 100%;
  box-shadow: 0 0 60px rgba(100, 200, 255, 0.3);
  border-radius: 50%;
}`
	return (
		<div className="iridescent-container">
            <style>{css}</style>
			<canvas ref={canvasRef} className="iridescent-sphere"></canvas>
		</div>
	);
};

export default IridescentSphere;
