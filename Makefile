# ═══════════════════════════════════════════════════════════════════════════════
# Cognispace Platform — Development Commands
# ═══════════════════════════════════════════════════════════════════════════════

.PHONY: dev build start clean install lint format typecheck check test db-up db-down db-reset db-studio help

# ── Development ────────────────────────────
dev: ## Start dev server with Turbopack
	pnpm dev

build: ## Build for production
	pnpm build

start: ## Start production server
	pnpm start

install: ## Install dependencies
	pnpm install

clean: ## Clean build artifacts and caches
	rm -rf .next out node_modules/.cache
	@echo "✓ Cleaned build artifacts"

# ── Code Quality ───────────────────────────
lint: ## Run ESLint
	pnpm lint

lint-fix: ## Run ESLint with auto-fix
	pnpm lint:fix

format: ## Format all files with Prettier
	pnpm format

typecheck: ## Run TypeScript type checking
	pnpm typecheck

check: ## Run all quality checks (typecheck + lint + format)
	pnpm check-all

# ── Database & Services ────────────────────
db-up: ## Start local PostgreSQL, Redis, MailHog
	docker compose up -d
	@echo ""
	@echo "✓ Services started:"
	@echo "  PostgreSQL → localhost:5432"
	@echo "  Redis      → localhost:6379"
	@echo "  MailHog UI → http://localhost:8025"

db-down: ## Stop local services
	docker compose down

db-reset: ## Reset local services (destroys all data!)
	docker compose down -v
	docker compose up -d
	@echo "✓ Services reset with clean volumes"

# ── Help ───────────────────────────────────
help: ## Show this help message
	@echo "Cognispace Platform — Available Commands:"
	@echo ""
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "  \033[36m%-15s\033[0m %s\n", $$1, $$2}'

# Default target
.DEFAULT_GOAL := help
