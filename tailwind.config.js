/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.tsx"],
    theme: {
        extend: {
            colors: {
                primary: "#2fdde0",
                "primary-dark": "#076f84",
            },
        },
    },
    plugins: [],
};
