# Calculator App

A simple, elegant calculator application built with HTML, CSS, and JavaScript. Features a modern design with smooth animations and full keyboard support.

## Features

- ✨ **Modern UI Design**: Beautiful gradient background with glassmorphism effects
- 🔢 **Basic Operations**: Addition, subtraction, multiplication, and division
- 💯 **Percentage Calculation**: Convert numbers to percentages
- ⌨️ **Keyboard Support**: Full keyboard input support for faster calculations
- 📱 **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- 🎨 **Visual Feedback**: Animated button presses and operator highlighting
- ❌ **Error Handling**: Prevents division by zero and displays error messages
- 🔄 **Clear & Delete**: AC button to clear all, DEL button to delete last digit

## Operations

### Basic Arithmetic
- **Addition** (+): Add two numbers
- **Subtraction** (−): Subtract two numbers
- **Multiplication** (×): Multiply two numbers
- **Division** (÷): Divide two numbers

### Special Functions
- **AC (All Clear)**: Reset calculator to initial state
- **DEL (Delete)**: Remove last digit from current number
- **% (Percent)**: Convert current number to percentage (divide by 100)

## Keyboard Shortcuts

| Key | Action |
|-----|--------|
| 0-9 | Enter numbers |
| . | Decimal point |
| +, -, *, / | Mathematical operators |
| Enter or = | Calculate result |
| Backspace | Delete last digit |
| Escape | Clear all |
| % | Convert to percentage |

## Technical Details

### Built With
- **HTML5**: Semantic markup structure
- **CSS3**: Modern styling with CSS Grid, Flexbox, and animations
- **JavaScript (ES6+)**: Object-oriented programming with Calculator class

### Browser Support
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## File Structure

```
calculator-app/
│
├── index.html          # Main HTML structure
├── styles.css          # Complete styling and animations
├── script.js           # Calculator logic and event handlers
├── Dockerfile          # Docker configuration for containerization
├── .dockerignore       # Docker build exclusions
├── .gitignore          # Git exclusions
└── README.md          # Documentation
```

## Usage

### Method 1: Direct Browser Access

1. **Clone the repository**
   ```bash
   git clone https://github.com/entonomy-dev/build-a-calculator-app-with-html-css-and.git
   cd build-a-calculator-app-with-html-css-and
   ```

2. **Open in browser**
   - Simply open `index.html` in your web browser
   - No build process or dependencies required

3. **Start calculating**
   - Click buttons or use keyboard to perform calculations
   - Results are displayed in real-time

### Method 2: Docker Deployment

This calculator app is containerized and ready for deployment using Docker.

1. **Build the Docker image**
   ```bash
   docker build -t calculator-app .
   ```

2. **Run the container**
   ```bash
   docker run -d -p 8080:80 --name calculator calculator-app
   ```

3. **Access the application**
   - Open your browser and navigate to `http://localhost:8080`
   - The calculator will be served via nginx

4. **Stop the container**
   ```bash
   docker stop calculator
   ```

5. **Remove the container**
   ```bash
   docker rm calculator
   ```

**Docker Hub Deployment** (optional)
   ```bash
   # Tag the image
   docker tag calculator-app yourusername/calculator-app:latest

   # Push to Docker Hub
   docker push yourusername/calculator-app:latest
   ```

## How It Works

### Calculator Class
The app uses an object-oriented approach with a `Calculator` class that manages:
- Current and previous operands
- Selected operation
- Display updates
- Calculation logic

### Key Methods
- `clear()`: Reset calculator state
- `delete()`: Remove last digit
- `appendNumber()`: Add digit to current operand
- `chooseOperation()`: Set mathematical operation
- `calculate()`: Perform calculation
- `percentage()`: Convert to percentage
- `updateDisplay()`: Refresh display with current values

### Features Implementation

#### Number Formatting
Numbers are formatted with thousand separators for better readability.

#### Floating Point Precision
Results are rounded to 8 decimal places to prevent floating-point arithmetic errors.

#### Division by Zero
Attempting to divide by zero displays an error message and resets after 1.5 seconds.

#### Operation Chaining
Pressing an operator after a calculation uses the result for the next operation.

## Customization

### Colors
Edit CSS variables in `styles.css`:
```css
:root {
    --primary-color: #667eea;
    --secondary-color: #764ba2;
    --btn-equals: #4ecdc4;
    /* Add more custom colors */
}
```

### Button Layout
Modify the grid in `styles.css`:
```css
.buttons {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 12px;
}
```

## Future Enhancements

Possible improvements for future versions:
- Scientific calculator mode (sin, cos, tan, log, etc.)
- Calculation history
- Memory functions (M+, M-, MR, MC)
- Theme switcher (light/dark mode)
- Expression evaluation
- Copy to clipboard functionality

## License

This project is open source and available under the [MIT License](LICENSE).

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Author

Built with ❤️ using HTML, CSS, and JavaScript

---

**Live Demo**: Open `index.html` in your browser to see it in action!
