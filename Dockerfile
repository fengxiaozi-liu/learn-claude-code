# =============================================================================
# learn-claude-code Dockerfile
# =============================================================================
# Multi-stage build: builds both the Next.js web frontend and Python agents.
# Usage:
#   docker build -t learn-claude-code .
#   docker run -d -p 3000:3000 --env-file .env learn-claude-code
#
# For agents only:
#   docker run -d --env-file .env learn-claude-code python agents/s_full.py
# =============================================================================

# ── Stage 1: Python agents ──────────────────────────────────────────────────
FROM python:3.11-slim AS agents

WORKDIR /app

# Install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy agent and skills code
COPY agents/ ./agents/
COPY skills/  ./skills/

ENV PYTHONPATH=/app

# ── Stage 2: Node.js web ─────────────────────────────────────────────────────
FROM node:22-alpine AS web

WORKDIR /app/web

# Install Next.js dependencies
COPY web/package*.json ./
RUN npm ci

# Copy Next.js source
COPY web/ ./

# Build (pre-run extract script via tsx)
RUN npm run extract && npm run build

# ── Stage 3: Runtime ──────────────────────────────────────────────────────────
FROM python:3.11-slim AS runtime

WORKDIR /app

# Install runtime deps for web server
RUN apt-get update && apt-get install -y --no-install-recommends \
    nodejs \
    npm \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Copy Python agents from stage 1
COPY --from=agents /usr/local/lib/python3.11/site-packages /usr/local/lib/python3.11/site-packages
COPY --from=agents /app/agents    /app/agents
COPY --from=agents /app/skills   /app/skills
COPY --from=agents /app/requirements.txt /app/

# Copy built Next.js from stage 2
COPY --from=web /app/web/.next   /app/web/.next
COPY --from=web /app/web/public  /app/web/public
COPY --from=web /app/web/node_modules /app/web/node_modules
COPY --from=web /app/web/package.json  /app/web/package.json

ENV PYTHONPATH=/app
ENV WEB_DIR=/app/web

# Default command: run web server
CMD ["sh", "-c", "cd $WEB_DIR && npm start"]
