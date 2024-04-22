export default function generateGradient(colors) {
    let gradientString = "linear-gradient(90deg";

    colors.forEach((color, index) => {
        if (color.length !== 3) {
            console.error(`Invalid RGB array at index ${index}. It must have exactly 3 values.`);
            return;
        }

        const [red, green, blue] = color;
        if (red < 0 || red > 255 || green < 0 || green > 255 || blue < 0 || blue > 255) {
            console.error(`Invalid RGB values at index ${index}. Values must be between 0 and 255.`);
            return;
        }

        const percentage = (index / (colors.length - 1)) * 100;
        gradientString += `, rgba(${red}, ${green}, ${blue}, 1) ${percentage}%`;
    });

    gradientString += ")";
    return gradientString;
}



