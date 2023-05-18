/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        fontFamily: {
            sans: ["Instrument Sans", "sans-serif"]
        },
        extend: {
            zIndex: {
                100: "100"
            }
        }
    },
    plugins: []
};
