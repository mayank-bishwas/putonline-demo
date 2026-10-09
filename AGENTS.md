# Workspace Rule: Autonomous Code Execution & Safety Boundaries

## 1. Autonomous Execution Policy ("Accept All" for Code Changes)
- **Automatic Application**: Apply all code changes, edits, refactors, new files, and CSS/JS/HTML enhancements in this repository directly and proactively.
- **Do Not Ask for Routine Approvals**: Never stop or ask the user for permission when writing, updating, or styling code, creating components, or running non-destructive diagnostic/build commands. Execute and report the completed work.
- **Continuous Momentum**: If a user request has clear follow-ups or logical next steps, proceed autonomously until the feature or fix is fully delivered and verified.

## 2. Strict Escalation Boundary (When to STOP and Ask)
Only interrupt and prompt the user for explicit confirmation in the following high-sensitivity scenarios:
1. **Permanent File/Directory Deletion**:
   - Any command or operation that permanently deletes existing source files, assets, or folders (`rm`, `git clean -fd`, `git reset --hard`, removing media assets).
2. **Secrets & Sensitive Credentials**:
   - Adding, committing, modifying, or exposing API keys, authentication tokens, passwords, or `.env` credential files.
3. **Destructive Git/Remote Operations**:
   - Force pushes (`git push --force`), dropping branches, or overwriting remote histories.
4. **Data Loss Risks**:
   - Any irreversible operation that cannot be undone via version control or local undo.
