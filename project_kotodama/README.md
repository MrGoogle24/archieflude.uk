# 🌸 Kotodama | Japanese Learning App

Welcome to your new Japanese learning companion! I've upgraded the project into a professional Spaced Repetition System (SRS).

## 🚀 Features
- **3D Flip Animations:** Cards rotate in 3D space for a physical feel.
- **Leitner System:** Cards are automatically sorted into 5 boxes based on your performance.
- **Persistence:** Your progress is saved in your browser's `localStorage`.
- **Multi-Dataset Loading:** Loads Hiragana, Katakana, and Vocabulary from separate JSON files.
- **Video Integration:** Ready for short clips to be played on every answer.

## 🛠️ How it Works
1. **The Loop:** You see the front $\rightarrow$ Flip $\rightarrow$ Mark Correct/Wrong $\rightarrow$ Next card.
2. **The Boxes:**
   - **Correct?** $\rightarrow$ Move to the next box (Box 1 $\rightarrow$ 2 ... $\rightarrow$ 5).
   - **Wrong?** $\rightarrow$ Reset to Box 1 immediately.
3. **Priority:** The app always prioritizes cards in the lowest box to ensure you master difficult characters first.

## 📂 Project Structure
- `index.html`: The main entry point.
- `style.css`: The "Zen" theme and 3D animations.
- `index.js`: The SRS brain.
- `data/`: Folder containing your character and word lists.

## 📝 Tips for you
- **Videos:** To add videos, just drop `.mp4` files into a `/videos` folder and match the filename in the JSON files.
- **New Words:** Simply add a new object to any of the `.json` files in the `/data` folder.

Enjoy your studies! がんばってください (Good luck)!
