/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        '950px': '950px', // Custom breakpoint
      },
      backgroundImage: {
        'grandmarts-image': "url('assets/auth/login.jpg')",
        
      },
      colors: {
        'primary': '#C3BEFE',


        // btn
        'primary-dark':'#B583F4',


      },
      backgroundColor:{
        "icon-primary":"#E0E7FF",
      },
      // button height
      height: {
        // Example heights for all buttons
        'button-global': '56px',    
        'button-md': '2.5rem',  
        'button-lg': '3rem',    
      },
      // button width
     width:{
       'button-global':'216px'
     }
    },
  },
  plugins: [],
}
// import grandmarts 'assets'