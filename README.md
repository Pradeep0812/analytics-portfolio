# Analytics Portfolio Platform

A production-grade portfolio platform for Data Analysts and Power BI Developers, built with Next.js 14, Tailwind CSS, and Decap CMS.

## 🚀 Features

- **Decap CMS** at `/admin` with Netlify Identity authentication
- **3 Project Collections**: Power BI, Tableau, Excel
- **Auto-rendering**: Projects appear automatically when added via CMS
- **Draft Workflow**: Draft/Published status filtering
- **Featured Projects**: Homepage featured section
- **Dark Mode**: System-aware with manual toggle
- **Responsive Design**: Mobile-first, recruiter-friendly UI
- **Media Support**: Videos, PDFs, images, Power BI embeds
- **SEO Optimized**: Meta tags, Open Graph, structured data

## 📁 Project Structure

```
PORTFOLIO/
├── content/                 # Markdown content (CMS managed)
│   ├── powerbi/            # Power BI projects
│   ├── tableau/            # Tableau projects
│   ├── excel/              # Excel projects
│   └── settings/           # Site settings
├── public/
│   ├── admin/              # Decap CMS
│   │   ├── index.html      # CMS entry point
│   │   └── config.yml      # CMS configuration
│   └── uploads/            # Media uploads
│       ├── powerbi/
│       ├── tableau/
│       └── excel/
├── src/
│   ├── app/                # Next.js App Router
│   │   ├── layout.tsx      # Root layout
│   │   ├── page.tsx        # Homepage
│   │   ├── powerbi/        # Power BI routes
│   │   ├── tableau/        # Tableau routes
│   │   └── excel/          # Excel routes
│   ├── components/         # Reusable components
│   └── lib/                # Utilities & types
├── netlify.toml            # Netlify config
├── next.config.js          # Next.js config
├── tailwind.config.js      # Tailwind config
└── package.json
```

## 🛠️ Local Development

### Prerequisites

- Node.js 20+
- npm or yarn

### Setup

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

### Build

```bash
# Production build
npm run build

# Start production server
npm start
```

## 🌐 Deployment to Netlify

### 1. Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit: Analytics Portfolio Platform"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

### 2. Connect to Netlify

1. Go to [Netlify](https://app.netlify.com)
2. Click "Add new site" → "Import an existing project"
3. Connect your GitHub repository
4. Build settings are auto-detected from `netlify.toml`
5. Click "Deploy site"

### 3. Enable Netlify Identity

1. Go to Site settings → Identity
2. Click "Enable Identity"
3. Under Registration, select "Invite only"
4. Go to Identity → Invite users
5. Enter your email and send invite

### 4. Enable Git Gateway

1. Go to Site settings → Identity → Services
2. Click "Enable Git Gateway"
3. Select your repository

### 5. Access CMS

1. Go to `https://your-site.netlify.app/admin`
2. Click "Login with Netlify Identity"
3. Check your email for the invite
4. Set your password and login

## 📝 Using the CMS

### Creating a Project

1. Go to `/admin`
2. Select a collection (Power BI, Tableau, or Excel)
3. Click "New [Category]"
4. Fill in the fields:
   - **Title**: Project name
   - **Description**: Brief summary
   - **Thumbnail**: Upload image
   - **Video**: Upload demo video (optional)
   - **PDF**: Upload report PDF (optional)
   - **Tools**: List of technologies used
   - **Status**: Set to "Published" to display on site
   - **Featured**: Toggle to show on homepage
5. Click "Publish"

### Media Uploads

- Drag & drop files into the media picker
- Files are stored in `/public/uploads/{category}/`
- Supported: Images (JPG, PNG, WebP), Videos (MP4), PDFs

## 🎨 Customization

### Site Settings

Edit `content/settings/general.json`:

```json
{
  "title": "Your Name",
  "description": "Your tagline",
  "author": "Your Name",
  "role": "Your Role",
  "email": "you@example.com",
  "linkedin": "https://linkedin.com/in/yourprofile",
  "github": "https://github.com/yourusername"
}
```

### Colors

Edit `tailwind.config.js` to customize the color palette.

### Components

All components are in `src/components/`. Modify as needed:
- `Hero.tsx`: Homepage hero section
- `About.tsx`: About section with skills
- `Contact.tsx`: Contact section

## 📊 Phase Roadmap

### Phase 1 ✅ (Current)
- CMS setup with 3 collections
- Auto-rendering frontend
- Enterprise-ready schema
- Dark mode
- Responsive design

### Phase 2 (Planned)
- Tag-based filtering
- Advanced search
- Enhanced metadata
- File size validation

### Phase 3 (Planned)
- Admin roles (Netlify Identity)
- Power BI live embeds
- Analytics integration
- Newsletter signup

## 🔧 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS 3.4
- **CMS**: Decap CMS (Netlify CMS)
- **Auth**: Netlify Identity
- **Hosting**: Netlify
- **Content**: Markdown + YAML frontmatter
- **Parsing**: gray-matter, react-markdown

## 📄 License

MIT License - feel free to use for your own portfolio!
