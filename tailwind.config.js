/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        fontFamily: {
            sans: ["Instrument Sans", "sans-serif"]
        },
        extend: {
            zIndex: {
                100: "100",
                999999: "999999"
            },
            keyframes: {
                zoomIn: {
                    "0%": { transform: "scale(0)" },
                    "100%": { transform: "scale(1)" }
                },
                zoomOut: {
                    "0%": { transform: "scale(1)" },
                    "100%": { transform: "scale(0)" }
                }
            },
            animation: {
                zoomIn: "zoomIn 0.25s ease-in-out",
                zoomOut: "zoomOut 0.25s ease-in-out"
            }
        }
    },
    plugins: []
};
