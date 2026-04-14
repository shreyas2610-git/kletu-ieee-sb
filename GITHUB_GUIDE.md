# GitHub Collaboration Guide — IEEE KLETU SB Website

A practical guide for the team using **GitHub's web interface only**. No terminal or Git installation needed.

---

## 1. One-Time Setup

### Create a GitHub account
1. Go to https://github.com
2. Sign up with your email
3. Share your GitHub username with the team lead so they can add you to the repository

### Accept the repository invitation
1. You'll receive an email invitation from the team lead
2. Click **"Accept invitation"**
3. You now have access to the project repository

---

## 2. Core Concepts

| Term | What it means |
|------|--------------|
| **Repository (repo)** | The project folder tracked by GitHub |
| **Branch** | A separate copy of the code where you make changes without affecting others |
| **Commit** | A saved snapshot of your changes with a message describing what you did |
| **Pull Request (PR)** | A request to merge your branch into the main branch, reviewed by the team |
| **Merge** | Combining changes from one branch into another |
| **Conflict** | When two people edit the same lines — GitHub asks you to choose which version to keep |
| **main branch** | The primary, stable version of the code — never edit this directly |

---

## 3. The Golden Rule

> **Never edit files directly on the `main` branch.**

`main` is the live, stable version of the site. All work happens on separate branches. Changes reach `main` only through reviewed pull requests.

---

## 4. Daily Workflow (Step by Step)

### Step 1: Create a new branch

1. Go to the repository page on GitHub
2. Click the **branch dropdown** (it says `main` by default, near the top-left of the file list)
3. Type a name for your new branch in the text box (e.g., `fix-navbar-spacing`)
4. Click **"Create branch: fix-navbar-spacing from main"**

You're now on your new branch. Any edits you make here won't affect `main`.

**Good branch names:**
- `add-events-section`
- `fix-mobile-menu`
- `update-footer-links`
- `style-contact-form`

**Bad branch names:**
- `my-changes`, `update`, `test123`, `branch1`

---

### Step 2: Edit a file

1. Make sure you're on **your branch** (check the branch dropdown — it should show your branch name, not `main`)
2. Navigate to the file you want to edit (e.g., click `css` folder, then `style.css`)
3. Click the **pencil icon** (top-right of the file view) to open the editor
4. Make your changes in the editor
5. When done, click the **"Commit changes..."** button (green, top-right)
6. In the popup:
   - Write a short **commit message** describing what you changed (e.g., "Fix navbar spacing on mobile screens")
   - Make sure **"Commit directly to the `your-branch-name` branch"** is selected
   - Click **"Commit changes"**

**Commit message tips — explain what and why:**
- "Fix hero overlay gradient for better text readability"
- "Add events section with card layout"
- "Update footer social media links"

Avoid vague messages like "fixed stuff", "updates", "changes".

---

### Step 3: Add a new file (if needed)

1. Make sure you're on **your branch**
2. Click **"Add file"** > **"Create new file"**
3. Type the file path in the name field (e.g., `assets/images/event-photo.jpg` — GitHub will create folders automatically)
4. Add the content
5. Commit the file with a clear message

To **upload files** (images, etc.):
1. Navigate to the folder where you want to add the file
2. Click **"Add file"** > **"Upload files"**
3. Drag and drop your files
4. Write a commit message and commit to your branch

---

### Step 4: Create a Pull Request

Once you've made all the changes you need on your branch:

1. Go to the repository's main page
2. You'll see a yellow banner: **"your-branch-name had recent pushes"** with a **"Compare & pull request"** button — click it
3. If you don't see the banner, click the **"Pull requests"** tab, then **"New pull request"**
   - Set **base** to `main` and **compare** to your branch
4. Fill in the PR form:
   - **Title:** Short description (e.g., "Fix navbar spacing on mobile")
   - **Description:** Explain what you changed and why. Mention specific files or sections you touched
5. On the right sidebar, click **"Reviewers"** and select a teammate to review your work
6. Click **"Create pull request"**

---

### Step 5: Review a teammate's Pull Request

When someone asks you to review their PR:

1. Go to the **"Pull requests"** tab
2. Click on the PR you need to review
3. Click the **"Files changed"** tab to see all the changes
   - Green lines = added code
   - Red lines = removed code
4. Read through the changes carefully
5. To leave a comment on a specific line, hover over it and click the **blue "+" icon** that appears
6. When done reviewing, click **"Review changes"** (green button, top-right)
   - **Comment** — general feedback, no approval
   - **Approve** — the changes look good
   - **Request changes** — something needs to be fixed before merging
7. Click **"Submit review"**

---

### Step 6: Make changes after review feedback

If changes were requested on your PR:

1. Go back to the repository's file list
2. Switch to **your branch** using the branch dropdown
3. Edit the files as needed (same as Step 2)
4. Commit the changes to your branch
5. The PR updates automatically — go back to the PR page and let the reviewer know you've made the changes

---

### Step 7: Merge the Pull Request

Once your PR has been approved:

1. Go to the PR page
2. Scroll to the bottom — you'll see a green **"Merge pull request"** button
3. Click **"Merge pull request"**
4. Click **"Confirm merge"**
5. Click **"Delete branch"** to clean up (the branch is no longer needed)

Done. Your changes are now part of `main`.

---

## 5. Handling Merge Conflicts

Conflicts happen when two people edit the same part of a file. GitHub will warn you on the PR page.

**To resolve on the web:**

1. On the PR page, click **"Resolve conflicts"**
2. GitHub opens an editor showing the conflicting file with markers:
   ```
   <<<<<<< your-branch
   color: #D4AF37;
   =======
   color: #C5A028;
   >>>>>>> main
   ```
   - Top section = your changes
   - Bottom section = what's on `main`
3. Edit the file to keep the version you want (or combine both). Remove the `<<<<<<<`, `=======`, and `>>>>>>>` markers entirely
4. Click **"Mark as resolved"**
5. Click **"Commit merge"**

If the conflict is too complex for the web editor, ask the team lead for help.

---

## 6. Project Structure

```
kletu-ieee-sb/
  index.html          -- Main HTML page (all sections)
  css/style.css       -- All styles
  js/main.js          -- Animations and interactions
  assets/images/      -- Images (logo, hero background, etc.)
  assets/icons/       -- Icon files
  CLAUDE.md           -- Design and build guidelines
```

When making changes, try to keep your work isolated:
- Working on styles? You'll mostly touch `css/style.css`
- Adding a new section? You'll touch `index.html` and possibly `css/style.css`
- Adding interactivity? You'll touch `js/main.js`

---

## 7. Team Rules

1. **One feature per branch.** Don't mix unrelated changes in one branch.

2. **Always branch from `main`.** Before creating a new branch, make sure you're on `main` and it's up to date.

3. **Small, frequent commits.** Commit after completing a logical unit of work, not after an entire day of coding.

4. **Never edit `main` directly.** Always create a branch and go through a pull request.

5. **Review each other's PRs.** Read the changes, leave comments. Even a quick "Looks good" is valuable.

6. **Communicate.** If two people are working on the same file (e.g., `style.css`), coordinate to avoid conflicts. Let the team know what you're working on.

7. **Delete merged branches.** After a PR is merged, click "Delete branch" to keep the repo clean.

8. **Write clear commit messages.** Future you will thank present you.

---

## 8. Quick Reference — Where to Find Things

| Action | Where on GitHub |
|--------|----------------|
| Switch branches | Branch dropdown (top-left of file list) |
| Edit a file | Navigate to it, click the pencil icon |
| Create a file | "Add file" > "Create new file" |
| Upload images/files | "Add file" > "Upload files" |
| Create a Pull Request | "Pull requests" tab > "New pull request" |
| Review a PR | "Pull requests" tab > click the PR > "Files changed" |
| See project activity | "Insights" tab or check the commit history |
| View a file's history | Navigate to the file > click "History" (top-right) |
| See who changed what | Navigate to the file > click "Blame" (top-right) |

---

## 9. Common Mistakes and Fixes

### "I accidentally edited `main` directly"
- If you haven't committed yet, just switch to a new branch — your unsaved changes won't be affected
- If you already committed to `main`, tell the team lead immediately so they can fix it

### "I made a mistake in my commit"
- Simply edit the file again on the same branch and make a new commit with the fix
- There's no need to undo — just fix forward

### "I want to see what my branch looks like compared to `main`"
1. Go to your branch
2. Click **"Contribute"** > **"Compare"** (or create a PR — you can always close it later without merging)

### "Someone else's changes aren't showing on my branch"
- Your branch was created from `main` at a specific point in time. It doesn't automatically get new changes from `main`
- To get the latest `main` changes: on your PR page, click **"Update branch"** if that button appears

---

## 10. Setting Up the Repository (Team Lead Only)

### Create the repository
1. Go to https://github.com/new
2. Repository name: `kletu-ieee-sb`
3. Set visibility (Public or Private)
4. Check **"Add a README file"**
5. Click **"Create repository"**
6. Upload all project files using **"Add file" > "Upload files"**

### Add team members
1. Go to the repo page > **Settings** > **Collaborators**
2. Click **"Add people"**
3. Enter each teammate's GitHub username or email
4. They'll receive an email invitation to accept

### Protect the main branch (recommended)
1. Go to **Settings** > **Branches**
2. Click **"Add branch protection rule"**
3. Branch name pattern: `main`
4. Enable: **"Require a pull request before merging"**
5. Enable: **"Require approvals"** (set to 1)
6. Click **"Save changes"**

This prevents anyone (including you) from editing `main` directly. All changes must go through a reviewed pull request.

---

That's everything you need. The workflow becomes second nature after a few pull requests.
