# Makefile

# Run the FastAPI server
run:
	uvicorn api:app --reload

# Format code with isort and black
format:
	isort .
	black .

# Check formatting without changing files
check-format:
	isort . --check-only
	black . --check

# Run tests (todo add some minimal testing)
# test:
# 	pytest

# Install dependencies
install:
	pip install -r requirements.txt

# Clean __pycache__ and .pyc files
clean:
	find . -type f -name "*.pyc" -delete
	find . -type d -name "__pycache__" -delete
