# HouseMaster Google Play PWA v0.4 — Camera Correction Merge

Camera-enabled user HTML merged with the already frozen HM-GPLAY-02/03/04 PWA baseline.

Preserved from camera build:
- capture=environment photo input
- IndexedDB photo storage
- photo compression/preview/comment/gallery/view/delete/share
- photo binding to checklist and defects
- localStorage checklist persistence

Preserved from Google Play baseline:
- responsive/adaptive device coverage (no 480px app hard limit)
- viewport-fit=cover and safe-area handling
- 48px minimum primary touch targets, including camera/viewer close controls
- Android/TWA back-history integration
- keyboard/VisualViewport handling
- manifest + service worker + offline fallback
- release identity kz.housemasters.app / 1.0.0

No backend upload was added. Photos remain in browser IndexedDB unless the user explicitly invokes Share.
