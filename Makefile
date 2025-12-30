.PHONY: build watch serve dev

build:
	gleam run -m build

watch:
	@echo "Watching assets/, src/, writing/ for changes..."
	@while true; do \
		inotifywait -r -e modify,create,delete,move assets src writing 2>/dev/null; \
		echo "Change detected, rebuilding..."; \
		$(MAKE) build; \
	done

serve:
	bunx serve dist -p 8080

dev:
	@$(MAKE) build
	@bunx serve dist -p 8080 & $(MAKE) watch
