# LinkedIn Bio Generator

This project is a web application that generates personalized LinkedIn bios using AI. It's built with Next.js, React, and leverages Cloudflare Workers AI with Meta's Llama 3.1 model for bio generation.

## Features

- Generate custom LinkedIn bios based on user input
- Support for multiple languages
- Different tone options (professional, casual, funny)
- Copy-to-clipboard functionality
- Responsive design

## Tech Stack

- Next.js
- React
- TypeScript
- Tailwind CSS
- Cloudflare Workers AI
- Meta Llama 3.1 (70B Instruct model)

## Getting Started

1. Clone the repository:
   ```
   git clone https://github.com/BadriPrudhvi/linkedin-bio-generator.git
   ```

2. Install dependencies:
   ```
   cd linkedin-bio-generator
   npm install
   ```

3. Set up environment variables:
   Create a `.dev.vars` file in the root directory and add the following:
   ```
   CLOUDFLARE_ACCOUNT_ID=your_cloudflare_account_id
   CLOUDFLARE_API_TOKEN=your_cloudflare_api_token
   CLOUDFLARE_GATEWAY_ID=your_cloudflare_gateway_id
   ```

4. Run the development server:
   ```
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Deployment

This project is designed to be deployed on Cloudflare Pages. Follow the Cloudflare Pages documentation for detailed deployment instructions.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Acknowledgements

- [Cloudflare Workers AI](https://developers.cloudflare.com/workers-ai/)
- [Meta Llama 3.1](https://developers.cloudflare.com/workers-ai/models/llama-3.1-70b-instruct/)
- [Next.js](https://nextjs.org/)
- [React](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)

