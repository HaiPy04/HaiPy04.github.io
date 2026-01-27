# Portfolio Design Specification
**Reference Style:** Similar functionality to ericwadkins.com (Grid + Modal), but with a "Dark Industrial" theme.

## 1. Visual Theme
- **Palette:** Background #0B0C10, Card #1F2833, Text #C5C6C7, Accent #66FCF1.
- **Font:** 'Space Grotesk' for headers, 'Inter' for body.
- **Vibe:** Clean, technical, blueprints, minimal.

## 2. Layout Structure
- **Hero Section:** Full height. Text: "Bridging Perception & Control". Background: A subtle HTML5 Canvas particle network animation.
- **Experience Section:** A clean vertical timeline showing professional roles.
- **Projects Grid:** A responsive CSS Grid. Each item is a card showing Title, Summary, and Tech Stack badges.

## 3. The "Eric Wadkins" Interaction (Crucial)
- **Modal Logic:** When a user clicks a Project Card, do NOT navigate away.
- **Action:** Open a centered Modal Overlay (Lightbox) on top of the current page.
- **Modal Content:** Display the full Description, larger Image, Tech Stack, and a "View on GitHub" button.
- **Close:** Modal must have a "Close Project" button and close on background click.

## 4. Tech Constraints
- Use Vanilla JavaScript (ES6 Modules).
- No external CSS frameworks (Bootstrap/Tailwind).
- Import data from `data.js` to populate the grid dynamically.

## 5. Feature: The "Differential Equation" Experience Section
**Concept:** Display my career path as the General Solution to a Differential Equation: $y(t) = y_h(t) + y_p(t)$.

**Layout Logic:**
1. **Header:** Create a section title that looks like a math equation:
   `Development(t) = Education_h(t) + Experience_p(t)`
   (Render this using a monospace font so it looks like LaTeX/Code).

2. **Split View (Two Columns or Sections):**
   - **Left/Top Column (Homogeneous - $y_h$):**
     - Title: "Homogeneous Solution (Education)"
     - Style: Clean, Minimal, White/Light Gray text on dark background. Low contrast. Represents the "standard" path.
     - Data: Filter items from `data.js` where `type === 'homogeneous'`.

   - **Right/Bottom Column (Particular - $y_p$):**
     - Title: "Particular Solution (Experience)"
     - Style: **High Contrast**, Neon Borders (#66FCF1), Glowing effects. Represents "my unique input".
     - Data: Filter items from `data.js` where `type === 'particular'`.

3. **Visual Connector:**
   - Draw a visual "+" sign between the two sections to reinforce the summation concept.


### Project Cards Behavior
- **Default State:** Show a high-quality static image cover.
- **Hover State:** Replace the static image with a muted, looping video clip (`videoPreview`).
- **Implementation:** Use HTML5 `<video autoplay loop muted playsinline>` tag that is hidden by default and revealed on CSS `:hover`. This is performance-friendly.

### Experience Modal Behavior
- **Trigger:** Clicking an "Experience Card" (both Homogeneous and Particular types).
- **Layout:** A two-part vertical layout within the modal.
  - **Top Part: Slideshow Component.**
    - Must display the images from `slideshowImages`.
    - Include simple navigation (left/right arrows and bottom dots).
    - Must be built with **Vanilla JS** (no external carousel libraries).
  - **Bottom Part: Full Description.**
    - Display the HTML content from `fullDescription`.
    - Style it with clear typography (Inter font, good line height for reading).