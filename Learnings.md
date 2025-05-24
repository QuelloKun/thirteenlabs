# Learnings from ElevenLabs-Clone Project

## Models Used

- StyleTTS2 (Text-to-Speech)
- Make-an-Audio
- SeedVC (Voice Conversion)

## Project Setup

- Created project directory: `Elevenlabs-Clone`
- Cloned: `StyleTTS2`, `SeedVC`, `Make-an-Audio`
- Created Python virtual environment using VSCode (Ctrl + Shift + P → Python: Create Environment)
- Installed dependencies from `requirements.txt`

## AWS Infrastructure

- Setup **IAM** role with `EC2ContainerRegistryFullAccess` & `S3FullAccess`
- Created **S3** bucket (`thirteenlabs`) for storing model outputs
- Created private **ECR** repo for Docker images
- Requested EC2 quota for G and VT instances
- Deployed final containerized APIs on EC2 using **Docker Compose**

## API Deployment

- Wrote `api.py` scripts for local testing
- Dockerized each API
- Deployed containers to EC2 on ports `8000`, `8001`, `8002` and tested them successfully

## Challenges Faced

- **Docker**: Image sizes were large; learned to prune unused images
- **WSL Storage**: Disk space not reflected in Windows; needs better syncing or auto-clearing
- **Dependency Management**: Exact versions matter for stability
- **Git Workflows**: Submodules, filter-repo, merging histories are non-trivial; more practice needed

## To-Do (Next Steps)

- Add `Makefile` for formatting, linting, and running
- Refactor code (modularize constants, clean up structure)
- Use `.env` and avoid hardcoding secrets (API key)
- Lock versions in `requirements.txt`
- Add Git pre-push hooks for format checks

---
