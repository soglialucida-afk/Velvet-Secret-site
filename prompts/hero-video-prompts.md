# Zlata nit — Hero Video Prompt

## Seamless Loop Prompt

Cinematic full-screen hero video loop for a premium modern fortune-telling website. A glowing crystal ball floats between the open hands of a warm, trustworthy fortune teller. She is a calm, inviting woman with long black hair flowing from beneath a richly patterned dark headscarf, large round hoop earrings in muted antique gold, softly kohl-lined eyes, and a gentle face. She looks down toward the crystal ball, never directly at the camera. Her hands hover around the sphere without touching it, fingers moving only a few millimeters in a slow, symmetrical motion, as if shaping the light.

Inside the crystal ball: drifting nebula mist, faint star particles, a slow galaxy swirl, soft luminous depth. The environment is a dark cozy bohemian high-society salon, almost dissolved into charcoal shadow: matte dark walls, layered textiles, a hint of carved molding, blurred hanging lantern shapes, soft plants and fabric textures in the background, no obvious modern office elements. The palette is charcoal grey, deep violet, dusty pastel blue, muted lavender and a very restrained warm amber glow only where the sphere illuminates her hands, face and scarf.

Mood: intimate, safe, mysterious, premium, comforting, not theatrical, not horror, not carnival-like. The image should feel like a private evening reading in a quiet salon, with a sense of revelation and emotional safety.

Camera: locked-off tripod shot, perfectly static camera, no pan, no zoom, no handheld drift. Medium close-up, 50mm full-frame equivalent, shallow depth of field at T2.0. Focus locked on the crystal ball, her face softly in focus, background dissolved into elegant bokeh. Subject composed center-low in frame: hands and crystal ball in the lower half, generous dark negative space in the upper third for website headline overlay. Eye-level, very slightly below, looking gently upward toward her and the sphere.

Lighting: the crystal ball is the only warm key light, soft amber 2700K with gentle falloff. Cool violet-blue ambient fill at 6500K, three stops darker than the sphere. Deep cinematic contrast with lifted charcoal blacks, never pure black. Highlights rolled off gently, subtle filmic halation around the sphere, fine 35mm grain. No teal-orange blockbuster grading.

Motion: 8 to 10 seconds, seamless loop. First and last frame must match as closely as possible. All motion is slow and cyclical: the nebula inside the crystal ball completes one gentle rotation, the glow pulses once like a quiet breath, her fingers drift slightly and return, dust particles loop softly. No blinking, no sudden gestures, no abrupt start or stop, no camera movement, no cuts.

Technical specs: 4K UHD, 3840x2160, 16:9, 24 fps, cinematic flat profile if available. No text, no logo, no watermark, no subtitles. Keep the upper third clean and dark for headline readability. Avoid bright lens flares crossing the headline safe area.

Negative prompt: text, watermark, logo, subtitles, camera movement, zoom, cut, transition, flicker, strobe, horror, scary face, direct eye contact, exaggerated smile, carnival fortune teller, cheap costume, oversaturated neon, harsh gold-on-black art deco, pure black background, bright daylight, visible light fixtures, extra fingers, deformed hands, hands touching the ball, jewelry sparkle bursts, second person, modern office, generic SaaS background, corporate look.

## Optional Intro Prompt

Cinematic 4-second intro shot that ends exactly on the first frame of the seamless loop. A single tiny point of soft light floats in deep charcoal darkness. It slowly grows, swirls and gathers nebula mist until it becomes a glowing crystal ball suspended between the open hands of the same warm, trustworthy fortune teller in the dark cozy bohemian salon. Her face remains calm and softly lit by the sphere, eyes looking down at the ball, never at camera. The final frame must match the loop shot composition: static camera, medium close-up, hands and sphere lower half, dark negative space upper third, charcoal violet-blue ambience, warm amber glow from the ball only. No text, no logo, no cuts, no camera movement.

## Implementation Note

Use the intro only once on first page load, then switch to the seamless loop. If the video generator cannot create a mathematically perfect loop, use a ping-pong edit: duplicate the loop clip, reverse the second copy, and crossfade very lightly if needed.
