#!/usr/bin/env bash
set -euo pipefail

# This script helps you troubleshoot Git push auth issues like:
#   ERROR: Permission to <owner>/<repo>.git denied to <other-user>.
# It will print diagnostics and exact commands you can run to fix common causes.

REPO_SSH="git@github.com:yerkinalagozov/rickandmorti.git"
REPO_HTTPS="https://github.com/yerkinalagozov/rickandmorti.git"
DEFAULT_BRANCH="main"

has_cmd() { command -v "$1" >/dev/null 2>&1; }

echo "== Git Remote URLs =="
if has_cmd git; then
  git remote -v || true
else
  echo "git not installed" >&2
fi

echo
echo "== Current Git user/email =="
if has_cmd git; then
  git config user.name || echo "(not set)"
  git config user.email || echo "(not set)"
fi

echo
echo "== SSH test to GitHub (if SSH is configured) =="
if has_cmd ssh; then
  echo "Running: ssh -T git@github.com (may show a greeting or an error)"
  set +e
  ssh -T git@github.com 2>&1 | sed 's/^/  /'
  SSH_STATUS=$?
  set -e
  echo "ssh exit code: $SSH_STATUS (1 is OK for greeting message)"
else
  echo "ssh not installed or not available"
fi

echo
cat <<'EOS'
== Common fixes ==

1) You are authenticated as a different GitHub account (e.g., alagozov-indrive) and lack access to yerkinalagozov/rickandmorti:
   - Ask the repo owner to add your account as a collaborator, OR use the owner account's credentials.
   - If using SSH with multiple GitHub accounts, force the correct SSH key via SSH config:

     ~/.ssh/config
     ---------------------------------
     Host github.com-yerkinalagozov
       HostName github.com
       User git
       IdentityFile ~/.ssh/id_rsa_yerkinalagozov  # path to the right key
       IdentitiesOnly yes

     Then set the remote to use the alias host:
       git remote set-url origin git@github.com-yerkinalagozov:yerkinalagozov/rickandmorti.git

   - Ensure the SSH agent has the right key loaded:
       ssh-add -l            # list
       ssh-add ~/.ssh/id_rsa_yerkinalagozov

2) Switch to HTTPS + Personal Access Token (simple and explicit):
   - Set remote to HTTPS:
       git remote set-url origin https://github.com/yerkinalagozov/rickandmorti.git
   - Push and enter your GitHub username; when asked for password, paste a PAT (with repo scope):
       git push -u origin main

3) Using GitHub CLI (gh):
   - Authenticate:
       gh auth login
     Choose GitHub.com, HTTPS, and let gh store the token.
   - Then push:
       git push -u origin main

4) Quick reset remote & push commands:
   - SSH:
       git remote set-url origin git@github.com:yerkinalagozov/rickandmorti.git
       git push -u origin main
   - HTTPS:
       git remote set-url origin https://github.com/yerkinalagozov/rickandmorti.git
       git push -u origin main

Notes:
- The specific error "denied to alagozov-indrive" means GitHub recognized you as user 'alagozov-indrive'. Use an account that has access to the repository or change the remote/auth method as above.
- Verify current remote after changes:
    git remote -v
EOS

echo
echo "== Optional: try pushing now (will prompt for auth if needed) =="
echo "Run: git push -u origin ${DEFAULT_BRANCH}"
