# HM-GPLAY-04 — App Identity & Versioning

Status: CLOSED / APP ID FIX

## Canonical product identity
- Product brand: HouseMaster / Хаузмастер
- Android launcher name: Хаузмастер
- Extended app name: Хаузмастер — Полевой справочник
- Functional descriptor: Полевой справочник ОСИ РК
- Android applicationId / package name: `kz.housemasters.app`

## Release versioning
- First Google Play production `versionCode`: `1`
- First Google Play production `versionName`: `1.0.0`
- Current PWA production-pack line: `0.x` (pre-release packaging only)
- Rule: versionCode only increases; published package ID is immutable for this product line.

## PWA identity
- manifest `id`: `./` until canonical HTTPS deployment path is frozen in HM-GPLAY-06.
- `start_url`: `./`
- `scope`: `./`
- `display`: `standalone`
- `orientation`: `any`
- `lang`: `ru-KZ`

## Boundary
HM-GPLAY-04 fixes identity only. It does not introduce authentication, backend, accounts, payments, camera, geolocation, push notifications, or new HouseMaster domain functionality.

## Later gates
- HM-GPLAY-05 uses `kz.housemasters.app` when generating the Android/TWA shell.
- HM-GPLAY-06 freezes the canonical HTTPS origin/path and Digital Asset Links.
- HM-GPLAY-09 creates the signed release AAB and applies versionCode/versionName.
