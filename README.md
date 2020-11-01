# cartostory-frontend

## Requirements
* Docker
* make
* npm (used solely to run lefthook based git hooks)

## Setup
Copy `.env.example` to `.env` and change values if needed.

## Development

### Build
Run this whenever you update your dependencies (see NPM section below)
```
make build-dev
```

### Run with hot reload
```
make run-dev
```

### NPM
Any npm related tasks should be run with the following command:
```
make run-npm ARGS="YOUR_NPM_ARGS"
```
`YOUR_NPM_ARGS` can be anything listed in `npm --help`.

### Troubleshooting
* lefthook says it's not found in the PATH: run `npm run install:lefthook` on the host
