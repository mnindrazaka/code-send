# Code Send

> A research project on **hot code update (over-the-air update) for React Native** — a from-scratch
> exploration of how platforms like Microsoft CodePush work under the hood.

React Native apps are two things in one: a native binary (APK/IPA) and a JavaScript bundle that the
binary loads at startup. Because the JavaScript half is just a file on disk, it can be swapped at
runtime — which means a bug fix or a small feature can reach users **without shipping a new build to
the Play Store and waiting for review**.

Code Send implements that whole idea end to end: a backend that stores and serves bundles, a web
dashboard to publish them, and a React Native plugin that checks for, downloads, and loads a new
bundle inside a running app.

## How it works

```
  Developer                Code Send platform                 User's device
  ─────────                ──────────────────                 ─────────────

  1. change JS code
  2. npx react-native bundle
        │
        │  upload bundle + version + release note
        ▼
     ┌──────────────────┐  bundle file  ┌────────────┐
     │ Frontend (admin) │──────────────▶│ Cloudinary │
     └────────┬─────────┘               └─────┬──────┘
              │ REST                          │ bundleUrl
              ▼                               │
     ┌──────────────────┐                     │
     │ Backend (API)    │◀────────────────────┘
     │ + MongoDB        │
     └────────┬─────────┘
              │  ① POST /project/:id/update/check  (app sends its current updateId + GPS coords)
              │  ② returns the newer update, or nothing
              ▼
                                      ┌───────────────────────────────┐
                                      │ RN app + code-send-plugin     │
                                      │  useCodeSend(projectId)       │
                                      │   ├ check for update          │
                                      │   ├ ask user / download bundle│
                                      │   ├ save as "active bundle"   │
                                      │   └ reload JS                 │
                                      └───────────────────────────────┘
```

The trick that makes it work on Android lives in `MainApplication.java`: the app overrides
`getJSBundleFile()` and asks `CodeSendModule.launchResolveBundlePath()` where the bundle is. If a
downloaded bundle has been marked active, the app boots from that file instead of the one baked into
the APK.

Two extra things this research explores beyond a plain CodePush clone:

- **Regional rollout** — an update can be pinned to a location. The app sends its GPS coordinates on
  every check, the backend reverse-geocodes both the device and the update via Mapbox, and only
  serves the update when the region names match (`code-send-backend/src/api/update/update.service.ts`).
- **Update targeting by history** — the app reports the `updateId` it is currently running, and the
  backend compares timestamps so a device never downloads a bundle it already has.

## Where to find things

The repository is a monorepo with three deployable pieces plus a folder of design diagrams.

| Folder | What it is | Stack |
| --- | --- | --- |
| [`code-send-backend/`](code-send-backend) | REST API of the admin platform — auth, projects, updates, bundle storage, geocoding | Node.js, Express, TypeScript, MongoDB (Mongoose) |
| [`code-send-frontend/`](code-send-frontend) | Web dashboard where a developer creates projects and publishes updates | React, TypeScript, Ant Design, Formik |
| [`code-send-plugin/`](code-send-plugin) | The npm package installed into a React Native app | TypeScript hooks + native Android module (Java) |
| [`diagram/`](diagram) | UML/activity/use-case diagrams (`.puml`) and the overall flow chart (`.mmd`) | PlantUML, Mermaid |

### Read these first

If you want to understand the mechanism rather than the CRUD around it, these are the files that
matter:

**The hot update itself (plugin)**

- `code-send-plugin/src/hooks/useCodeSend.ts` — the single hook an app calls; orchestrates everything
- `code-send-plugin/src/hooks/useCheckUpdate.ts` — asks the backend whether a newer bundle exists
- `code-send-plugin/src/hooks/useApplyUpdate.ts` — confirmation dialog, download, activate, reload
- `code-send-plugin/src/utils/bundleManager.ts` — the JS↔native bridge surface
- `code-send-plugin/android/src/main/java/com/reactlibrary/CodeSendModule.java` — native module, and
  `launchResolveBundlePath()` which decides the bundle the app boots from
- `code-send-plugin/android/src/main/java/com/reactlibrary/services/BundleService.java` — stores the
  active bundle in `SharedPreferences` and reloads the JS runtime
- `code-send-plugin/android/src/main/java/com/reactlibrary/services/DownloadTask.java` — downloads the
  bundle with a progress notification
- `code-send-plugin/README.md` — full installation guide for a host app

**The platform (backend)**

- `code-send-backend/src/app.ts` — Express app and route wiring
- `code-send-backend/src/api/update/update.service.ts` — `checkUpdate()`, i.e. the versioning and
  regional-rollout logic
- `code-send-backend/src/api/update/update.util.ts` — uploads bundles to Cloudinary
- `code-send-backend/src/api/geocoding/geocoding.service.ts` — Mapbox forward/reverse geocoding
- `code-send-backend/src/middleware/verifyToken.ts` — JWT auth guard

**The dashboard (frontend)**

- `code-send-frontend/src/modules/` — one folder per screen (`login`, `register`, `dashboard`,
  `project`, `update`)
- `code-send-frontend/src/modules/update/updateForm.tsx` — the form that publishes a new bundle
- `code-send-frontend/src/hooks/api/` — API calls; `src/stores/` — reducers and actions
- `code-send-frontend/cypress/integration/workflow.spec.js` — end-to-end walkthrough of the product

### API endpoints

All routes except `/user*` and `/project/:projectId/update/check` require a `Bearer` JWT.

| Method | Route | Purpose |
| --- | --- | --- |
| `POST` | `/user` | Register |
| `POST` | `/user/authenticate` | Login, returns JWT |
| `GET`/`POST` | `/project` | List / create projects |
| `PUT`/`DELETE` | `/project/:projectId` | Edit / delete a project |
| `GET` | `/project/:projectId/update` | List updates |
| `GET` | `/project/:projectId/update/latest` | Latest update |
| `POST` | `/project/:projectId/update` | Create an update (metadata) |
| `PUT` | `/project/:projectId/update/:updateId` | Edit an update |
| `PUT` | `/project/:projectId/update/:updateId/bundle` | Upload the bundle file |
| `POST` | `/project/:projectId/update/check` | **Called by the plugin** — is there a newer bundle? |
| `POST` | `/geocoding/forward`, `/geocoding/reverse` | Place name ↔ coordinates |

## Running the project

Prerequisites: **Node.js** and **Yarn**. The dependencies date from 2020, so an older Node (12–14)
is the safest choice; newer versions may need `NODE_OPTIONS=--openssl-legacy-provider`. For the
plugin you additionally need the standard [React Native Android
environment](https://reactnative.dev/docs/environment-setup) (JDK, Android SDK, an emulator or
device).

### Backend

```bash
cd code-send-backend
yarn
cp .env.example .env      # then fill in the values
yarn dev                  # http://localhost:<PORT>, hot reloading
```

`.env` values:

| Variable | Meaning |
| --- | --- |
| `PORT` | Port the API listens on |
| `USERNAME`, `PASSWORD` | MongoDB Atlas credentials — see the connection string in `src/utils/database.ts` |
| `JWT_SECRET` | Secret used to sign auth tokens |
| `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET` | Bundle file storage |
| `MAPBOX_TOKEN` | Geocoding for regional updates |

Other scripts:

```bash
yarn test        # jest — runs against an in-memory MongoDB, no Atlas needed
yarn coverage    # tests with coverage, in watch mode
yarn build       # compile TypeScript to build/
yarn start       # run the compiled build
```

There is also a `Dockerfile` (used by the Heroku container deploy in `heroku.yml`):

```bash
docker build -t code-send-backend code-send-backend
docker run --env-file code-send-backend/.env -p 3000:3000 code-send-backend
```

### Frontend

```bash
cd code-send-frontend
yarn
cp .env.example .env      # then fill in the values
yarn start                # http://localhost:3000
```

`.env` values:

| Variable | Meaning |
| --- | --- |
| `REACT_APP_CODE_SEND_SERVICE_URL` | Base URL of the backend, e.g. `http://localhost:3000` |
| `REACT_APP_MAPBOX_TOKEN` | Declared in `.env.example` and set in CI, but not read by the app code — the location search in the update form geocodes through the backend's `/geocoding` endpoints |

Other scripts:

```bash
yarn test          # unit tests (React Testing Library)
yarn coverage      # unit tests with coverage
yarn build         # production build into build/
yarn integration   # serves the build and runs the Cypress e2e suite against it
yarn test:e2e      # Cypress only, against an already-running app
```

### Plugin

Build and test the package itself:

```bash
cd code-send-plugin
yarn
yarn test          # jest, JS side
yarn build         # compile TypeScript into lib/
```

Android native tests live under `android/src/test` (unit) and `android/src/androidTest`
(instrumented) and run through Gradle from `code-send-plugin/android`.

Run the bundled sample app, which calls `useCodeSend()` with a real project id:

```bash
cd code-send-plugin/example
yarn
npx react-native run-android      # in another terminal: npx react-native start
```

To try a hot update against your own backend, publish a bundle from the dashboard and rebuild the
JS bundle in the app you are updating:

```bash
npx react-native bundle --platform android --dev false \
  --entry-file index.js \
  --bundle-output android/app/src/main/assets/index.android.bundle
```

Then upload that file as a new update. Installing the plugin into an app of your own is documented
step by step in [`code-send-plugin/README.md`](code-send-plugin/README.md).

## Diagrams

`diagram/` holds the design documents produced during the research (labels are in Indonesian):

- `diagram/flowChart.mmd` — the end-to-end release flow (Mermaid)
- `diagram/classDiagram.puml` — data model
- `diagram/usecase/` — developer and end-user use cases
- `diagram/activity/` — per-feature activity diagrams for `auth`, `project`, `update`, and `plugin`

Render `.puml` files with [PlantUML](https://plantuml.com/) and the `.mmd` file with
[Mermaid](https://mermaid.js.org/).

## Deployment

Handled by GitHub Actions in `.github/workflows/`:

- `backend.yml`, `frontend.yml`, `plugin.yml` — tests on every pull request
- `backend-deploy.yml` — builds the Docker image and releases it to Heroku on merge to `master`
- `plugin-deploy.yml` — bumps the patch version and publishes the plugin to npm on merge to `master`

The hosted dashboard lives at <https://mnindrazaka.github.io/code-send/> and the API at
`https://code-send.herokuapp.com`.

## Status and limitations

This is research code, so it is worth being explicit about the edges:

- **Android only.** The iOS native module (`code-send-plugin/ios/CodeSend.m`) is still the
  boilerplate stub — the bundle resolution, download, and reload logic exists only in the Java module.
- Updates are matched by recency, not by semantic version or by the app's native binary version, so
  a bundle that requires new native code would break an older APK.
- The MongoDB Atlas cluster host is hard-coded in `src/utils/database.ts`; only the credentials come
  from the environment.
- Bundles are served straight from Cloudinary over HTTPS with no signature or integrity check.

## License

The plugin package is published under the MIT license (see `code-send-plugin/package.json`).
