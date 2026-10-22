# Requested invitation updates
- [x] Replace the existing video with the upload and remove video-section overlays.
- [x] Verify mouse/touch scratching and show the existing countdown directly after revealed dates.
- [x] Verify the invitation while preserving all other content.

# Published Vercel video repair
- [x] Identify missing production video paths and verify the actual uploaded video is available.
- [x] Add the missing Vercel asset-serving rewrite without changing invitation sections.
- [x] Verify playback through the corrected media connection on desktop and mobile (simulated rewrite on published page; actual media returned 200/206 and played).
- [x] Verify the live Vercel video endpoint after redeployment (200 video/webm).

# Phone layout refinements
- [x] Display the existing landscape video without phone cropping; preserve desktop framing.
- [x] Reduce phone decoration, text, gallery, and music-button overlap without redesigning sections.
- [ ] Check cover, playback, scratch dates, gallery, and overflow at 360, 390, 430, and desktop widths.
- [ ] Verify live Vercel playback and report whether phone layout updates are deployed.
- [ ] Replace the video only when the user supplies the new high-quality file (not attached yet).