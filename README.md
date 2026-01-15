# Playwright Docker Setup

A ready-to-use Playwright testing environment containerized with Docker. This repository includes Node.js, Playwright, and all required browsers pre-installed, making it easy to run tests on any system without local setup.

> 📊 **[View Latest Test Report](https://YOUR_USERNAME.github.io/plawright-docker/)** - HTML test reports are automatically hosted on GitHub Pages after each test run.

## Features

- ✅ **Node.js 20 LTS** pre-installed
- ✅ **Playwright** with all dependencies
- ✅ **Browsers** (Chromium, Firefox) pre-installed
- ✅ **Docker Compose** for easy orchestration
- ✅ **Volume mounts** for tests and results
- ✅ **Zero configuration** required - ready to use out of the box

## Prerequisites

- [Docker](https://www.docker.com/get-started) (version 20.10 or higher)
- [Docker Compose](https://docs.docker.com/compose/install/) (version 2.0 or higher)

## Quick Start

> **Note:** This guide uses `docker compose` (space) which is Docker Compose V2 format. If you have the older standalone `docker-compose` (hyphen) installed, you can use that instead. Both work locally, but GitHub Actions requires `docker compose` (space).

### 1. Clone or download this repository

```bash
git clone <your-repo-url>
cd plawright-docker
```

### 2. Build the Docker image

```bash
docker compose build
```

This will:
- Install Node.js 20
- Install Playwright and all dependencies
- Download and install Chromium and Firefox browsers
- Set up the testing environment

**Note:** The first build may take several minutes as it downloads browsers (~1-2 GB).

### 3. Run tests

```bash
docker compose run --rm playwright npm test
```

Or simply:

```bash
docker compose up
```

**View the test report:**
After tests complete, open `playwright-report/index.html` in your browser, or run:
```bash
docker compose run --rm playwright npm run test:report
```

## Usage

### Running Tests

**Run all tests:**
```bash
docker compose run --rm playwright npm test
```

**Run tests in headed mode (with browser UI):**
```bash
docker compose run --rm playwright npm run test:headed
```

**Run tests with UI mode:**
```bash
docker compose run --rm playwright npm run test:ui
```

**Run tests in debug mode:**
```bash
docker compose run --rm playwright npm run test:debug
```

**View test report:**
```bash
docker compose run --rm playwright npm run test:report
```

### Project Structure

```
.
├── Dockerfile              # Docker image definition
├── docker-compose.yml      # Docker Compose configuration
├── package.json            # Node.js dependencies
├── playwright.config.ts    # Playwright configuration
├── tests/                  # Your test files (create this)
├── test-results/           # Test results (auto-generated)
├── screenshots/            # Screenshots (auto-generated)
└── videos/                 # Test videos (auto-generated)
```

### Adding Your Tests

1. Create a `tests` directory:
```bash
mkdir tests
```

2. Add your test files in the `tests` directory. See `tests/example.spec.ts` for a sample test.

3. Run tests:
```bash
docker compose run --rm playwright npm test
```

### Viewing Test Results

Test results are automatically saved to your host machine. After running tests:

**View HTML Report:**

1. **Hosted Report (GitHub Pages):** After tests run on the main branch, the report is automatically deployed to GitHub Pages. [View Latest Report](https://YOUR_USERNAME.github.io/plawright-docker/)

2. **Local Reports:**
   ```bash
   # Option 1: Open the HTML report directly in your browser
   # Navigate to: playwright-report/index.html
   
   # Option 2: Use Playwright's built-in server (recommended)
   docker compose run --rm playwright npm run test:report
   # This will start a local server - open the URL shown in the terminal
   ```

**Other Results:**
- Test artifacts: `test-results/` directory
- Screenshots: `screenshots/` directory (on test failures)
- Videos: `videos/` directory (on test failures)
- HTML Report: `playwright-report/` directory

## Configuration

### Playwright Configuration

Edit `playwright.config.ts` to customize:
- Test directories
- Browsers and devices
- Timeouts and retries
- Screenshots and videos
- Base URLs
- And more...

### Docker Configuration

Edit `docker-compose.yml` to:
- Change environment variables
- Add volume mounts
- Modify network settings
- Override default commands

### Package Scripts

Edit `package.json` to add custom scripts:
- `npm test` - Run all tests
- `npm run test:headed` - Run with visible browser
- `npm run test:ui` - Run with Playwright UI
- `npm run test:debug` - Run in debug mode

## Troubleshooting

### Browser Installation Issues

If browsers fail to install, rebuild the image:
```bash
docker compose build --no-cache
```

### Permission Issues

If you encounter permission issues with generated files:
```bash
sudo chown -R $USER:$USER test-results screenshots videos
```

### Out of Memory

If tests fail due to memory issues, increase Docker's memory limit in Docker Desktop settings.

### Viewing Logs

View container logs:
```bash
docker compose logs playwright
```

## CI/CD Integration

This setup works great in CI/CD pipelines. A complete GitHub Actions workflow is included at `.github/workflows/playwright.yml`.

### How It Works Out of the Box

**GitHub Actions automatically:**
1. ✅ Has Docker pre-installed on `ubuntu-latest` runners
2. ✅ Has Docker Compose V2 available (no installation needed)
3. ✅ Can run `docker compose` commands directly (note: space, not hyphen)
4. ✅ No additional setup or configuration needed
5. ✅ Works immediately when you push the workflow file

**Why it's "out of the box":**
- GitHub's `ubuntu-latest` runner comes with Docker and Docker Compose pre-installed
- Your Dockerfile contains all dependencies (Node.js, Playwright, browsers)
- No need to run `actions/setup-node` or install browsers separately
- The container is self-contained - everything needed is inside
- Just build the image and run tests - that's it!

### Quick Start for GitHub Actions

1. **The workflow file is already created** at `.github/workflows/playwright.yml`
2. **Push to your repository** - GitHub Actions will automatically run tests
3. **View results** in the Actions tab of your GitHub repository

### What the Workflow Does

The included workflow:
- ✅ Runs tests on push/PR to main/master/develop branches
- ✅ Tests against all browsers (Chromium, Firefox) in parallel
- ✅ Uploads test reports, screenshots, and videos as artifacts
- ✅ Generates HTML reports for easy viewing
- ✅ **Automatically deploys HTML reports to GitHub Pages** (main/master branch only)
- ✅ Can be manually triggered via `workflow_dispatch`

### Enabling GitHub Pages

To enable the hosted test reports:

1. Go to your repository **Settings** → **Pages**
2. Under **Source**, select **GitHub Actions**
3. The workflow will automatically deploy reports after each test run on the main/master branch
4. Update the report link in the README with your actual repository URL:
   - Replace `YOUR_USERNAME` with your GitHub username
   - Replace `plawright-docker` with your repository name if different
   - The URL format is: `https://YOUR_USERNAME.github.io/REPO_NAME/`

### Minimal Example

If you want a simpler version, here's the bare minimum:

```yaml
name: Playwright Tests
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Run Playwright tests
        run: |
          docker compose build
          docker compose run --rm playwright npm test
```

**That's it!** No Node.js setup, no browser installation, no system dependencies. Just Docker (which is pre-installed on GitHub runners).

## Advanced Usage

### Running Specific Tests

```bash
docker compose run --rm playwright npx playwright test tests/specific-test.spec.ts
```

### Running Tests in Specific Browser

```bash
docker compose run --rm playwright npx playwright test --project=chromium
```

### Interactive Shell

Access the container shell:
```bash
docker compose run --rm playwright /bin/bash
```

### Custom Commands

Override the default command:
```bash
docker compose run --rm playwright npx playwright test --grep "login"
```

## Hosting and Distribution

### Publishing to Docker Hub

1. **Create a Docker Hub account** at [hub.docker.com](https://hub.docker.com)

2. **Build and tag your image:**
   ```bash
   docker build -t yourusername/playwright-docker:latest .
   ```

3. **Login to Docker Hub:**
   ```bash
   docker login
   ```

4. **Push the image:**
   ```bash
   docker push yourusername/playwright-docker:latest
   ```

5. **Others can now use it:**
   ```bash
   docker pull yourusername/playwright-docker:latest
   docker run --rm -v $(pwd)/tests:/app/tests yourusername/playwright-docker npm test
   ```

### Publishing to GitHub Container Registry (GHCR)

1. **Build and tag for GHCR:**
   ```bash
   docker build -t ghcr.io/yourusername/playwright-docker:latest .
   ```

2. **Login to GHCR:**
   ```bash
   echo $GITHUB_TOKEN | docker login ghcr.io -u yourusername --password-stdin
   ```

3. **Push the image:**
   ```bash
   docker push ghcr.io/yourusername/playwright-docker:latest
   ```

### Using a Pre-built Image

Update `docker-compose.yml` to use your hosted image:

```yaml
services:
  playwright:
    image: yourusername/playwright-docker:latest
    # Remove or comment out the 'build' section
    # build:
    #   context: .
    #   dockerfile: Dockerfile
```

## Benefits of Docker vs. Simple Repo

### ✅ **Consistency Across Environments**
- **Same environment everywhere**: Works identically on Windows, macOS, Linux, and CI/CD
- **No "works on my machine" issues**: Everyone gets the exact same Node.js version, Playwright version, and browser versions
- **Reproducible builds**: Same results every time, regardless of host OS

### ✅ **Zero Local Setup Required**
- **No Node.js installation needed**: Users don't need to install Node.js on their machine
- **No browser downloads**: Browsers are pre-installed in the image (~1-2GB download once, then cached)
- **No system dependencies**: All required libraries are bundled in the container
- **One command to run**: Just `docker compose up` and you're ready

### ✅ **Isolation and Cleanliness**
- **No pollution of host system**: Everything runs in a container, nothing installed on your machine
- **Easy cleanup**: Remove the container/image when done, no leftover files
- **Multiple versions**: Run different Playwright versions side-by-side without conflicts
- **No permission issues**: Runs in isolated environment, no sudo/admin rights needed

### ✅ **CI/CD Integration**
- **Works out of the box**: Most CI systems (GitHub Actions, GitLab CI, Jenkins) support Docker natively
- **Faster CI runs**: Pre-built images can be cached, reducing build times
- **Parallel execution**: Run multiple test suites in parallel containers
- **Consistent test environment**: Tests run the same way locally and in CI

### ✅ **Team Collaboration**
- **Easy onboarding**: New team members can start testing in minutes
- **Shared image**: One person builds, everyone uses the same image
- **Version control**: Tag images with versions for different projects/requirements
- **Documentation**: Dockerfile serves as documentation of the exact setup

### ✅ **Resource Management**
- **Resource limits**: Set CPU/memory limits per container
- **Easy scaling**: Spin up multiple containers for parallel test execution
- **Resource cleanup**: Containers are ephemeral, easy to start/stop/remove

### ✅ **Security**
- **Isolated execution**: Tests run in isolated environment, can't affect host system
- **Network isolation**: Control network access per container
- **Read-only filesystems**: Can mount volumes as read-only for extra security

### ⚠️ **When NOT to Use Docker**

Consider a simple repo if:
- You only work on one OS and don't need cross-platform compatibility
- You prefer native performance (Docker has slight overhead)
- Your team is already comfortable with Node.js setup
- You need to test browser extensions or native integrations
- You're doing mobile device testing that requires physical devices

### 📊 **Comparison Table**

| Feature | Docker Setup | Simple Repo |
|---------|-------------|-------------|
| Setup Time | ~5 minutes (first time) | ~15-30 minutes |
| Cross-platform | ✅ Works everywhere | ❌ OS-specific issues |
| Consistency | ✅ Identical everywhere | ⚠️ Varies by machine |
| Local Installation | ❌ None needed | ✅ Node.js + browsers |
| CI/CD Ready | ✅ Out of the box | ⚠️ Requires setup |
| Isolation | ✅ Complete | ❌ Shared system |
| Resource Usage | ~2GB disk (cached) | ~2GB disk (per machine) |
| Learning Curve | Medium | Low (if familiar with Node) |

## License

MIT

## Contributing

Feel free to submit issues and enhancement requests!
